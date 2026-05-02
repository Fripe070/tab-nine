import { API } from "../../types";
import { ModrinthMod } from "./types";

const apiEndpoint = "https://api.modrinth.com/v2";
const userAgent = "tab-nine/modrinth-widget (fripe070@gmail.com)";

export async function getRecentlyUpdatedMods(
  loader: API["loader"],
  count: number,
  minDownloads: number = 0,
  maxDownloads: number | null = null,
): Promise<ModrinthMod[]> {
  loader.push();

  try {
    // Build facets array
    const facets: string[][] = [["project_type:mod"]];

    // Fetch extra mods to account for filtering
    const fetchLimit = Math.min(Math.max(count * 3, 50), 100);
    
    const params = new URLSearchParams({
      limit: fetchLimit.toString(),
      index: "updated",
      facets: JSON.stringify(facets),
    });

    const res = await fetch(
      `${apiEndpoint}/search?${params.toString()}`,
      {
        headers: {
          "User-Agent": userAgent,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Modrinth API error: ${res.status}`);
    }

    const data = await res.json();
    let mods: ModrinthMod[] = data.hits || [];

    // Filter by download count client-side
    mods = mods.filter((mod) => {
      const downloads = mod.downloads || 0;
      if (minDownloads > 0 && downloads < minDownloads) return false;
      if (maxDownloads !== null && downloads > maxDownloads) return false;
      return true;
    });

    // Return only the requested count
    return mods.slice(0, count);
  } catch (error) {
    console.error("Failed to fetch Modrinth mods:", error);
    return [];
  } finally {
    loader.pop();
  }
}
