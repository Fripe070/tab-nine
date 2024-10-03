import { API } from "../../types";
import { Story, StoryID } from "./types";

const apiEndpoint = "https://hacker-news.firebaseio.com/v0";

async function getTopStoryIDs(): Promise<StoryID[]> {
  const res = await fetch(`${apiEndpoint}/topstories.json`);
  return res.json();
}

async function getStory(id: StoryID): Promise<Story> {
  const res = await fetch(`${apiEndpoint}/item/${id}.json`);
  return res.json();
}

export async function getStories(
  loader: API["loader"],
  count: number,
): Promise<Story[]> {
  loader.push();

  const storyIDs = await getTopStoryIDs();
  const stories = await Promise.all(storyIDs.slice(0, count).map(getStory));

  loader.pop();
  return stories;
}

export async function getSiteImage(url: string): Promise<string> {
  const res = await fetch(`https://api.microlink.io/?url=${url}`);
  const data = await res.json();
  return data.data.image.url;
}
