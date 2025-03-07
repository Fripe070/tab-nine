import { API } from "../../types";
import { VocaDBSong } from "./types";


export async function getHighlightedSongs(
  loader: API["loader"],
  apiEndpoint: string
): Promise<VocaDBSong[] | undefined> {
  loader.push();

  const url = apiEndpoint.replace(/\/$/, "");
  const res = await fetch(`${url}/songs/highlighted?fields=AdditionalNames,Albums,Artists,Lyrics,MainPicture,Names,PVs,ReleaseEvent,Tags,ThumbUrl,WebLinks,Bpm,CultureCodes`);
  if (!res.ok) {
    loader.pop();
    return undefined;
  }
  const data = res.json();

  loader.pop();
  return data;
}
