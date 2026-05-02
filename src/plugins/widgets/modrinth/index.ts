import { Config } from "../../types";
import Modrinth from "./Modrinth";
import ModrinthSettings from "./ModrinthSettings";

const config: Config = {
  key: "widget/modrinth",
  name: "Modrinth Mods",
  description: "Recently updated mods from Modrinth.",
  dashboardComponent: Modrinth,
  settingsComponent: ModrinthSettings,
};

export default config;
