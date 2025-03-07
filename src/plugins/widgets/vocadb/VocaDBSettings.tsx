import React, { FC } from "react";

import { Props, VocaDBDatabase, databaseUrls, defaultData } from "./types";
import { DebounceInput } from "../../shared";

const VocaDBSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="VocaDBSettings">
    <label>
      Database API URL
      <select
        value={data.database}
        onChange={(event) =>
          setData({ ...data, database: event.target.value as VocaDBDatabase })
        }
      >
        {Object.values(VocaDBDatabase).map((db) => (
          <option key={db} value={db}>
            {db}
          </option>
        ))}
      </select>
    </label>

    {data.database === VocaDBDatabase.Custom && (
      <DebounceInput
        type="url"
        placeholder={databaseUrls[VocaDBDatabase.VocaDB]}
        value={data.customDbUrl}
        className="url"
        onChange={(value) => setData({ ...data,
          customDbUrl: value.trim().replace(/\/$/, ""),
        })}
        wait={500}
      />
    )}
  </div>
);

export default VocaDBSettings;
