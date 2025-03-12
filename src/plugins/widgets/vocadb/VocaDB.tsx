import React, { FC } from "react";
import { Props, defaultData, VocaDBSong, databaseUrls } from "./types";
import { useCachedEffect } from "../../../hooks";
import { getHighlightedSongs } from "./api";
import { Data } from "./types";
import { HOURS } from "../../../utils";
import "./VocaDB.scss";


function NthMinute(interval: number, time: Date): number {
  return Math.floor(time.getTime() / (1000 * 60 * interval));
}

const EXPIRE_IN = HOURS * 1;


const VocaDBWidget: FC<Props> = ({
  cache,
  data = defaultData,
  setCache,
  loader,
}) => {
  useCachedEffect(
    () => {
      const dbUrl = databaseUrls[data.database] ?? data.customDbUrl;
      if (!dbUrl) return;
      console.log("Fetching VocaDB songs")
      getHighlightedSongs(loader, dbUrl).then(songs => {
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
      {cache.songs[0] && <Song song={cache.songs[0]} data={data} />}
    </div>
  );
};

export default VocaDBWidget;


function Song({ song, data }: { song: VocaDBSong, data: Data }) {
  var thumbUrl = song.mainPicture?.urlOriginal ?? song.thumbUrl;

  const urlBase = (databaseUrls[data.database] ?? data.customDbUrl).replace(/\/$/, "");

  return (
    <div className="VocaDB-song">
      <a className="thumb" href={`${urlBase}/S/${song.id}`}>
        <img
          src={thumbUrl}
          alt="Cover art"
        />
      </a>
      <div className="info">
        <h4 className="title">
          <a href={`${urlBase}/S/${song.id}`}>{song.name}</a>
        </h4>
        <span className="artists">
          {song.artists.map(artist => <a
            key={artist.id}
            href={artist?.artist && `${urlBase}/Ar/${artist.artist.id}`}
            className={artist.artist?.releaseDate ? "synth" : undefined}
          >
            {artist.name}
          </a>
          )}
        </span>
        <div className="pvs">
          {song.pvs.map(pv => <a
            key={pv.id}
            href={pv.url}
            className={pv.service}
          >
            {pvServiceIcons[pv.service] || pv.service}
          </a>
          )}
        </div>
      </div>
    </div>
  );
}

export const pvServiceIcons: Record<string, JSX.Element> = {
  "File":           <img className="service-icon" alt="File" src="https://vocadb.net/Content/Icons/music.png" />,
  "LocalFile":      <img className="service-icon" alt="LocalFile" src="https://vocadb.net/Content/Icons/music.png" />,
  "NicoNicoDouga":  <img className="service-icon" alt="NicoNicoDouga" src="https://vocadb.net/Content/nico.png" />,
  "Youtube":        <img className="service-icon" alt="Youtube" src="https://vocadb.net/Content/youtube.png" />,
  "SoundCloud":     <img className="service-icon" alt="SoundCloud" src="https://vocadb.net/Content/Icons/soundcloud.png" />,
  "Vimeo":          <img className="service-icon" alt="Vimeo" src="https://vocadb.net/Content/ExtIcons/vimeo.png" />,
  "Piapro":         <img className="service-icon" alt="Piapro" src="https://vocadb.net/Content/ExtIcons/piapro.png" />,
  "Bandcamp":       <img className="service-icon" alt="Bandcamp" src="https://vocadb.net/Content/ExtIcons/bandcamp.png" />,
  "Bilibili":       <img className="service-icon" alt="Bilibili" src="https://vocadb.net/Content/ExtIcons/bilibili.png" />,
  "Creofuga":       <img className="service-icon" alt="Creofuga" src="https://vocadb.net/Content/ExtIcons/creofuga.png" />,
};

