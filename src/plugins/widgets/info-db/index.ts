import { Config } from "../../types";
import InfoDBWidget from "./InfoDB";
import InfoDBSettings from "./InfoDBSettings";

const config: Config = {
  key: "widget/info-db",
  name: "InfoDB",
  description: "Display quotes from a personal database.",
  dashboardComponent: InfoDBWidget,
  settingsComponent: InfoDBSettings,
};

export default config;
