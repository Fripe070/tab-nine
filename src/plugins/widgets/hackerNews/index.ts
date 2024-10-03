import { Config } from "../../types";
import HackerNewsWidget from "./hackerNews";
import HackerNewsSettings from "./hackerNewsSettings";

const config: Config = {
  key: "widget/hackernews",
  name: "Hacker News",
  description: "Get the latest news from Hacker News.",
  dashboardComponent: HackerNewsWidget,
  settingsComponent: HackerNewsSettings,
};

export default config;
