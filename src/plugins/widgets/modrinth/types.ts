import { API } from "../../types";

export type ModrinthMod = {
  project_id: string;
  slug: string;
  title: string;
  description: string;
  icon_url: string | null;
  date_modified: string; // ISO date string
  downloads: number;
  follows: number;
  status: string;
  project_type: string;
};

export type Cache = {
  mods: ModrinthMod[];
  cachedAt: number;
};

export type Data = {
  count: number;
  minDownloads: number;
  maxDownloads: number | null;
};

export type Props = API<Data, Cache>;

export const defaultData: Data = {
  count: 3,
  minDownloads: 0,
  maxDownloads: null,
};
