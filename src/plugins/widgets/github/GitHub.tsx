import React, { FC, useEffect } from "react";
import GitHubCalendar, { ThemeInput } from "react-github-calendar";
import { Props, defaultData } from "./types";
import { useKey } from "../../../lib/db/react";
import { db } from "../../../db/state";

// TODO: Inherit size and colour

const GitHubCalendarWidget: FC<Props> = ({ data = defaultData, loader }) => {
  const [accentColor, setAccentColor] = useKey(db, "accent");

  if (!data.username) return null;

  const customTheme = {
    dark: [data.backgroundColor, data.foregroundColor],
    light: [data.foregroundColor, data.backgroundColor],
  } as ThemeInput;

  return (
    <div className="GitHub">
      <GitHubCalendar
        hideColorLegend
        hideMonthLabels
        hideTotalCount
        username={data.username}
        {...(data.useCustomColors ? { theme: customTheme } : {})}
      />
    </div>
  );
};

export default GitHubCalendarWidget;
