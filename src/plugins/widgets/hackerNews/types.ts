import { API } from "../../types";

export type StoryID = number;
export type Story = {
  by: string;
  descendants: number;
  id: StoryID;
  kids: StoryID[];
  score: number;
  time: number;
  title: string;
  type: "story";
  url: string;
};

export type Cache = {
  stories: Story[];
  cachedAt: number;
};

export type Data = {
  count: number;
};

export type Props = API<Data, Cache>;

export const defaultData: Data = {
  count: 5,
};
