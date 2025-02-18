import React, { FC } from "react";
import { Props, defaultData, Story } from "./types";
import { useCachedEffect } from "../../../hooks";
import { getStories } from "./api";
import { MINUTES } from "../../../utils";
import "./HackerNews.scss";


function NthMinute(interval: number, time: Date): number {
  return Math.floor(time.getTime() / (1000 * 60 * interval));
}

const EXPIRE_IN = MINUTES * 15;

const HackerNewsWidget: FC<Props> = ({
  cache,
  data = defaultData,
  setCache,
  loader,
}) => {
  useCachedEffect(
    () => {
      getStories(loader, data.count).then(stories => setCache({
        stories: stories,
        cachedAt: Date.now(),
      }));
    },
    cache ? cache.cachedAt + EXPIRE_IN : 0,
    [data.count],
  );
  if (!cache) return null;

  return (
    <div className="HackerNews">
      <div className="stories">
        {cache.stories.map(story => (
          <Story key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
};

export default HackerNewsWidget;


function Story({ story }: { story: Story }) {
  return (
    <div className="story">
      <a
        className="title"
        href={story.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {story.title}
      </a>
      <p className="info">
        Posted by {SimpleURL(
          `https://news.ycombinator.com/user?id=${story.id}`,
          story.by
        )}
        {" "}
        |
        {" "}
        {SimpleURL(
          `https://news.ycombinator.com/item?id=${story.id}`,
          `${story.descendants} comments`
        )}
      </p>
    </div>
  );
}

function SimpleURL(url: string, content: string) {
  return <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
  >
    {content}
  </a>
}
