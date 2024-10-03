import React, { FC, useEffect } from "react";
import { Props, defaultData, Story } from "./types";
import { useCachedEffect, useTime } from "../../../hooks";
import { AutoTextSize } from 'auto-text-size'
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
        <a
            className="story"
            href={story.url}
            target="_blank"
            rel="noopener noreferrer"
        >
            <p className="title">
                <AutoTextSize maxFontSizePx={20}>
                    {story.title}
                </AutoTextSize>
            </p>
            <p className="by">
                Posted by {story.by}
            </p>
        </a>
    );
}
