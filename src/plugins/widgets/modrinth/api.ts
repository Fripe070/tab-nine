import { API } from "../../types";
import { ModItem } from "./types";

const MODRINTH_API = "https://api.modrinth.com/v2";
const CURSEFORGE_API = "https://api.curseforge.com/v1";
const userAgent = "tab-nine/modrinth-widget";

interface RawModrinthHit {
  project_id: string;
  slug: string;
  title: string;
  description: string;
  icon_url: string | null;
  date_modified: string;
  downloads: number;
}

type ModrinthFeed = {
  items: ModItem[];
  excludedKeys: Set<string>;
};

interface RawCurseForgeMod {
  id: number;
  name: string;
  slug: string;
  links: { websiteUrl: string };
  summary: string;
  logo: { url: string } | null;
  downloadCount: number;
  dateModified: string;
}

const normalizedSlug = (slug: string) => slug.toLowerCase().trim();
const normalizedTitle = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "");

const deduplicationKeys = (mod: Pick<ModItem, "slug" | "title">) => [
  `slug:${normalizedSlug(mod.slug)}`,
  `title:${normalizedTitle(mod.title)}`,
];

async function searchModrinthMods(
  facets: string[][],
  limit: number,
): Promise<RawModrinthHit[]> {
  const fetchLimit = Math.min(Math.max(limit * 3, 50), 100);

  const params = new URLSearchParams({
    limit: fetchLimit.toString(),
    index: "updated",
    facets: JSON.stringify(facets),
  });

  const res = await fetch(`${MODRINTH_API}/search?${params}`, {
    headers: { "User-Agent": userAgent },
  });

  if (!res.ok) {
    console.error(`Modrinth API error: ${res.status}`);
    return [];
  }

  const data = await res.json();
  return data.hits || [];
}

async function fetchModrinthMods(
  count: number,
  minDownloads: number,
  maxDownloads: number | null,
): Promise<ModrinthFeed> {
  // Match Modrinth's Discover exclusion for projects disclosed as AI-generated.
  const safeFacets = [["project_type:mod"], ["disclosure_types!=ai_content"]];
  const aiFacets = [["project_type:mod"], ["disclosure_types:ai_content"]];
  const [safeMods, aiMods] = await Promise.all([
    searchModrinthMods(safeFacets, count),
    searchModrinthMods(aiFacets, count),
  ]);

  const items = safeMods.filter((mod) => {
    const downloads = mod.downloads || 0;
    if (minDownloads > 0 && downloads < minDownloads) return false;
    if (maxDownloads !== null && downloads > maxDownloads) return false;
    return true;
  }).slice(0, count).map((mod) => ({
    id: `mr-${mod.project_id}`,
    platform: "modrinth" as const,
    title: mod.title,
    description: mod.description,
    icon_url: mod.icon_url || null,
    date_modified: mod.date_modified,
    downloads: mod.downloads || 0,
    slug: mod.slug,
    url: `https://modrinth.com/mod/${mod.slug}`,
  }));

  return {
    items,
    // Keep AI-disclosed Modrinth projects and their CurseForge equivalents out.
    excludedKeys: new Set(aiMods.flatMap(deduplicationKeys)),
  };
}

async function fetchCurseForgeMods(
  apiKey: string,
  count: number,
  minDownloads: number,
  maxDownloads: number | null,
): Promise<ModItem[]> {
  if (!apiKey) return [];

  const params = new URLSearchParams({
    gameId: "432",
    sortField: "3",
    sortOrder: "desc",
    pageSize: Math.min(count * 2, 50).toString(),
  });

  const res = await fetch(`${CURSEFORGE_API}/mods/search?${params}`, {
    headers: { "x-api-key": apiKey },
  });

  if (!res.ok) {
    console.error(`CurseForge API error: ${res.status}`);
    return [];
  }

  const data = await res.json();
  let mods: RawCurseForgeMod[] = data.data || [];

  mods = mods.filter((mod) => {
    const downloads = mod.downloadCount || 0;
    if (minDownloads > 0 && downloads < minDownloads) return false;
    if (maxDownloads !== null && downloads > maxDownloads) return false;
    return true;
  });

  return mods.slice(0, count).map((mod) => ({
    id: `cf-${mod.id}`,
    platform: "curseforge" as const,
    title: mod.name,
    description: mod.summary,
    icon_url: mod.logo?.url || null,
    date_modified: mod.dateModified,
    downloads: mod.downloadCount,
    slug: mod.slug,
    url: `https://www.curseforge.com/minecraft/mc-mods/${mod.slug}`,
  }));
}

export async function getCombinedFeed(
  loader: API["loader"],
  count: number,
  minDownloads: number,
  maxDownloads: number | null,
  curseforgeApiKey: string,
): Promise<ModItem[]> {
  loader.push();

  try {
    const [modrinthFeed, curseforge] = await Promise.all([
      fetchModrinthMods(count, minDownloads, maxDownloads),
      fetchCurseForgeMods(curseforgeApiKey, count, minDownloads, maxDownloads),
    ]);

    const modrinthKeys = new Set([
      ...modrinthFeed.items.flatMap(deduplicationKeys),
      ...modrinthFeed.excludedKeys,
    ]);
    const merged = [
      ...modrinthFeed.items,
      ...curseforge.filter(
        (mod) => !deduplicationKeys(mod).some((key) => modrinthKeys.has(key)),
      ),
    ];
    merged.sort(
      (a, b) =>
        new Date(b.date_modified).getTime() -
        new Date(a.date_modified).getTime(),
    );

    return merged.slice(0, count);
  } catch (error) {
    console.error("Failed to fetch combined feed:", error);
    return [];
  } finally {
    loader.pop();
  }
}
