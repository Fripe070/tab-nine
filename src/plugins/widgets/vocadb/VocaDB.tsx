import React, { FC } from "react";
import { Props, defaultData, VocaDBSong, databaseUrls } from "./types";
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
      const apiUrl = databaseUrls[data.database] ?? data.customDbUrl;
      if (!apiUrl) return;
      console.log("Fetching VocaDB songs")
      getHighlightedSongs(loader, apiUrl).then(songs => {
        if (!songs) return;
        setCache({
          songs: songs,
          cachedAt: Date.now(),
        })
      });
    },
    cache ? cache.cachedAt + EXPIRE_IN : 0,
    [data.database, data.customDbUrl],
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
        <h4 className="title">
          <a href={`https://vocadb.net/S/${song.id}`}>{song.name}</a>
        </h4>
        <span className="artists">
          {song.artists.map(artist => <a
            key={artist.id}
            href={artist?.artist && `https://vocadb.net/Ar/${artist.artist.id}`}
            className={artist.artist?.releaseDate ? "synth" : undefined}
          >
            {console.log(artist) ?? null}
            {artist.name}
          </a>
          )}
        </span>
      </div>
    </div>
  );
}
