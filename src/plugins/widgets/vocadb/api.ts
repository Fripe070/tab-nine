import { API } from "../../types";
import { VocaDBSong } from "./types";

const apiEndpoint = "https://vocadb.net/api";

export async function getHighlightedSongs(
  loader: API["loader"],
): Promise<VocaDBSong[]> {
  loader.push();

  const res = await fetch(`${apiEndpoint}/songs/highlighted?fields=AdditionalNames,Albums,Artists,Lyrics,MainPicture,Names,PVs,ReleaseEvent,Tags,ThumbUrl,WebLinks,Bpm,CultureCodes`);
  const e = res.json();
  console.log(e);

  loader.pop();
  return e;
}
