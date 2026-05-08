import { API } from "../../types";

export type Platform = "modrinth" | "curseforge";

export type ModItem = {
  id: string;
  platform: Platform;
  title: string;
  description: string;
  icon_url: string | null;
  date_modified: string;
  downloads: number;
  slug: string;
  url: string;
};

export type Cache = {
  items: ModItem[];
  cachedAt: number;
};

export type Data = {
  count: number;
  minDownloads: number;
  maxDownloads: number | null;
  curseforgeApiKey: string;
};

export type Props = API<Data, Cache>;

export const defaultData: Data = {
  count: 3,
  minDownloads: 1,
  maxDownloads: null,
  curseforgeApiKey: "",
};
