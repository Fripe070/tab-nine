import React, { FC } from "react";
import { Props, defaultData, ModItem } from "./types";
import { useCachedEffect } from "../../../hooks";
import { getCombinedFeed } from "./api";
import { MINUTES } from "../../../utils";
import "./Modrinth.scss";

const EXPIRE_IN = MINUTES * 30;

const ModrinthWidget: FC<Props> = ({
  cache,
  data = defaultData,
  setCache,
  loader,
}) => {
  useCachedEffect(
    () => {
      getCombinedFeed(
        loader,
        data.count,
        data.minDownloads,
        data.maxDownloads,
        data.curseforgeApiKey,
      ).then((items) =>
        setCache({
          items,
          cachedAt: Date.now(),
        }),
      );
    },
    cache ? cache.cachedAt + EXPIRE_IN : 0,
    [data.count, data.minDownloads, data.maxDownloads, data.curseforgeApiKey],
  );

  if (!cache) return null;

  const items = cache.items || [];

  return (
    <div className="Modrinth">
      {items.length === 0 ? (
        <div className="modrinth-empty">-</div>
      ) : (
        <ul className="modrinth-list">
          {items.map((item) => (
            <ModItem key={item.id} item={item} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ModrinthWidget;

function ModItem({ item }: { item: ModItem }) {
  const updatedDate = new Date(item.date_modified);
  const now = new Date();
  const timeDiff = now.getTime() - updatedDate.getTime();
  const compactDownloads = new Intl.NumberFormat(undefined, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(item.downloads);

  const minutes = Math.floor(timeDiff / (60 * 1000));
  const hours = Math.floor(timeDiff / (60 * 60 * 1000));
  const days = Math.floor(timeDiff / (24 * 60 * 60 * 1000));

  let timeAgoString: string;
  if (days >= 1) {
    timeAgoString = days === 1 ? "1 day ago" : `${days} days ago`;
  } else if (hours >= 1) {
    timeAgoString = hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else {
    timeAgoString = minutes <= 1 ? "1 min ago" : `${minutes} mins ago`;
  }

  return (
    <li className="modrinth-item">
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="modrinth-link"
        title={`${
          item.description
        } • ${item.downloads.toLocaleString()} downloads`}
      >
        {item.icon_url && (
          <img src={item.icon_url} alt={item.title} className="modrinth-icon" />
        )}
        <div className="modrinth-info">
          <div className="modrinth-title">
            <span className={`modrinth-title-text platform-${item.platform}`}>
              {item.title}
            </span>
          </div>
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
