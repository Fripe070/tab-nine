import React, { FC, useEffect } from "react";
import "./InfoDB.scss";
import { defaultData, Props } from "./types";

const InfoDBWidget: FC<Props> = ({
    data = defaultData,
}) => {
    const { items } = data;
    if (items.length === 0) {
        return <div className="InfoDB"></div>;
    }

    const randomItem = items[Math.floor(Math.random() * items.length)];
    console.log(randomItem);

    return (
        <div className="InfoDB">
            <div className="quote">
                <h3 className="title">
                    {randomItem.link ? (
                        <a href={randomItem.link} target="_blank" rel="noopener noreferrer">
                            {randomItem.title}
                        </a>
                    ) : (
                        randomItem.title
                    )}
                </h3>
                <div className="description">{randomItem.description}</div>
                {randomItem.author && <div className="author">&ndash; {randomItem.author}</div>}
            </div>
        </div>
    )
};

export default InfoDBWidget;
