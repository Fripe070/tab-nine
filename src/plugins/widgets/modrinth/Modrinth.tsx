import React, { FC } from "react";
import { Props, defaultData, ModrinthMod } from "./types";
import { useCachedEffect } from "../../../hooks";
import { getRecentlyUpdatedMods } from "./api";
import { MINUTES } from "../../../utils";
import "./Modrinth.scss";

const EXPIRE_IN = MINUTES * 30; // Cache for 30 minutes

const ModrinthWidget: FC<Props> = ({
  cache,
  data = defaultData,
  setCache,
  loader,
}) => {
  useCachedEffect(
    () => {
      getRecentlyUpdatedMods(
        loader,
        data.count,
        data.minDownloads,
        data.maxDownloads
      ).then((mods) =>
        setCache({
          mods: mods,
          cachedAt: Date.now(),
        })
      );
    },
    cache ? cache.cachedAt + EXPIRE_IN : 0,
    [data.count, data.minDownloads, data.maxDownloads]
  );

  if (!cache) return null;

  return (
    <div className="Modrinth">
      {cache.mods.length === 0 ? (
        <div className="modrinth-empty">-</div>
      ) : (
        <ul className="modrinth-list">
          {cache.mods.map((mod) => (
            <ModItem key={mod.project_id} mod={mod} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ModrinthWidget;

function ModItem({ mod }: { mod: ModrinthMod }) {
  const updatedDate = new Date(mod.date_modified);
  const now = new Date();
  const timeDiff = now.getTime() - updatedDate.getTime();
  const compactDownloads = new Intl.NumberFormat(undefined, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(mod.downloads);

  let timeAgoString = "just now";
  const hours = Math.floor(timeDiff / (60 * 60 * 1000));
  const days = Math.floor(timeDiff / (24 * 60 * 60 * 1000));

  if (days >= 1) {
    timeAgoString = days === 1 ? "1 day ago" : `${days} days ago`;
  } else if (hours >= 1) {
    timeAgoString = hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  }

  const modrinthUrl = `https://modrinth.com/mod/${mod.slug}`;

  return (
    <li className="modrinth-item">
      <a
        href={modrinthUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="modrinth-link"
        title={`${mod.description} • ${mod.downloads.toLocaleString()} downloads`}
      >
        {mod.icon_url && (
          <img src={mod.icon_url} alt={mod.title} className="modrinth-icon" />
        )}
        <div className="modrinth-info">
          <div className="modrinth-title">{mod.title}</div>
          <div className="modrinth-meta">
            <span className="modrinth-updated">updated {timeAgoString}</span>
            <span className="modrinth-downloads">
              {compactDownloads} downloads
            </span>
          </div>
        </div>
      </a>
    </li>
  );
}
