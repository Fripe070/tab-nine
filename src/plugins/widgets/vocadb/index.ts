import { Config } from "../../types";
import VocaDBWidget from "./VocaDB";
import VocaDBSettings from "./VocaDBSettings";

const config: Config = {
  key: "widget/vocadb",
  name: "VocaDB",
  description: "Display a highlighted song from VocaDB",
  dashboardComponent: VocaDBWidget,
  settingsComponent: VocaDBSettings,
};

export default config;
