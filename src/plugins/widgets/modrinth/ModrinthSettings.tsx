import React from "react";
import { defaultData, Props } from "./types";

const ModrinthSettings: React.FC<Props> = ({ data = defaultData, setData }) => (
  <div className="ModrinthSettings">
    <label>
      Number of mods to display
      <input
        type="number"
        value={data.count}
        min="1"
        max="50"
        onChange={(event) =>
          setData({ ...data, count: parseInt(event.target.value) })
        }
      />
    </label>

    <label>
      Minimum downloads
      <input
        type="number"
        value={data.minDownloads}
        min="0"
        onChange={(event) =>
          setData({ ...data, minDownloads: parseInt(event.target.value) || 0 })
        }
      />
    </label>

    <label>
      Maximum downloads (leave empty for no limit)
      <input
        type="number"
        value={data.maxDownloads || ""}
        min="0"
        onChange={(event) =>
          setData({
            ...data,
            maxDownloads: event.target.value
              ? parseInt(event.target.value)
              : null,
          })
        }
      />
    </label>

    <p>
      <a href="https://modrinth.com" rel="noopener noreferrer" target="_blank">
        Visit Modrinth
      </a>
    </p>
  </div>
);

export default ModrinthSettings;
