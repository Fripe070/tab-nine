import { Config } from "../../types";
import Modrinth from "./Modrinth";
import ModrinthSettings from "./ModrinthSettings";

const config: Config = {
  key: "widget/modrinth",
  name: "Mod Updates",
  description: "Recently updated mods from Modrinth and CurseForge.",
  dashboardComponent: Modrinth,
  settingsComponent: ModrinthSettings,
};

export default config;
