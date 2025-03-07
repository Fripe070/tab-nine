import React from "react";
import { defaultData, Props } from "./types";

const HackerNewsSettings: React.FC<Props> = ({ data = defaultData, setData }) => (
  <div className="HackerNewsSettings">

    <label>
      Number of stories
      <input
        type="number"
        value={data.count}
        onChange={(event) => setData({ ...data, count: parseInt(event.target.value) })}
      />
    </label>
  </div>
);

export default HackerNewsSettings;
