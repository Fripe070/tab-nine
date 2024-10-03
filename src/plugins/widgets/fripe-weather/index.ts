import { Config } from "../../types";
import Weather from "./Weather";
import WeatherSettings from "./WeatherSettings";

const config: Config = {
  key: "widget/fripeweather",
  name: "Fripe's Weather",
  description: "Add a window to see outside.",
  dashboardComponent: Weather,
  settingsComponent: WeatherSettings,
};

export default config;
