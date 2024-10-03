import React from "react";
import { defineMessages } from "react-intl";
import { useCachedEffect, useFormatMessages, useTime } from "../../../hooks";
import { HOURS } from "../../../utils";
import { Icon } from "../../../views/shared";
import { getForecast } from "./api";
import { findCurrent, weatherCodes } from "./conditions";
import { defaultData, Props } from "./types";
import "./Weather.scss";

const Weather: React.FC<Props> = ({
    cache,
    data = defaultData,
    loader,
    setCache,
    setData,
}) => {
    const time = useTime("absolute");
    const translated = useFormatMessages(messages);

    // Cache weather data for 6 hours
    useCachedEffect(
        () => {
            getForecast(data, loader).then(setCache);
        },
        cache ? cache.timestamp + 6 * HOURS : 0,
        [data.latitude, data.latitude, data.units],
    );

    const conditions =
        cache && cache.conditions
            ? findCurrent(cache.conditions, time.getTime())
            : null;

    // Blank or loading state
    if (!conditions) return <div className="FripeWeather">-</div>;

    return (
        <div className="FripeWeather">
            <div className="summary">
                {data.name ? <span>{data.name}</span> : null}

                <Icon name={weatherCodes[conditions.weatherCode]} />
                <span className="temperature">
                    {Math.round(conditions.temperature)}˚
                    <span className="feelsLike">
                        {Math.round(conditions.apparentTemperature)}˚
                    </span>
                </span>
            </div>
            <div className="humidity">
                <Icon name="droplet" />
                <span>
                    {conditions.humidity}%
                </span>
            </div>
        </div>
    );
};

// Translation messages
const messages = defineMessages({
    high: {
        id: "plugins.weather.high",
        description: "High for temperature high",
        defaultMessage: "High",
    },
    low: {
        id: "plugins.weather.low",
        description: "Low for temperature low",
        defaultMessage: "Low",
    },
    apparent: {
        id: "plugins.weather.apparent",
        description: "Apparent/Feels like tempurature",
        defaultMessage: "Feels like",
    },
    humidity: {
        id: "plugins.weather.humidity",
        description: "Humidity",
        defaultMessage: "Humidity",
    },
});

export default Weather;
