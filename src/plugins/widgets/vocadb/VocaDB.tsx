import React, { FC } from "react";
import { Props, defaultData, VocaDBSong } from "./types";
import { useCachedEffect } from "../../../hooks";
import { getHighlightedSongs } from "./api";
import { HOURS } from "../../../utils";
import "./VocaDB.scss";


function NthMinute(interval: number, time: Date): number {
  return Math.floor(time.getTime() / (1000 * 60 * interval));
}

const EXPIRE_IN = HOURS * 12;

const HackerNewsWidget: FC<Props> = ({
  cache,
  data = defaultData,
  setCache,
  loader,
}) => {
  useCachedEffect(
    () => {
      console.log("Fetching VocaDB songs")
      getHighlightedSongs(loader).then(songs => setCache({
        songs: songs,
        cachedAt: Date.now(),
      }));
    },
    cache ? cache.cachedAt + EXPIRE_IN : 0,
    [],
  );
  if (!cache) return null;

  return (
    <div className="VocaDB">
      {cache.songs[0] && <Song song={cache.songs[0]} />}
    </div>
  );
};

export default HackerNewsWidget;


function Song({ song }: { song: VocaDBSong }) {
  var thumbUrl = song.mainPicture?.urlOriginal ?? song.thumbUrl;

  return (
    <div className="VocaDB-song">
      <img
        className="thumb"
        src={thumbUrl}
        alt="Cover art"
      />
      <div className="titleCardText">
        <a href={`https://vocadb.net/S/${song.id}`}>
          <h3 className="title">{song.name}</h3>
        </a>
        <div className="artists">
          {song.artists.map(artist => <a
            key={artist.id}
            href={`https://vocadb.net/Ar/${artist.id}`}
          >
            {artist.name}
          </a>
          )}
        </div>
      </div>
    </div>
  );
}
