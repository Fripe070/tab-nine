import { Config } from "../../types";
import VocaDBWidget from "./VocaDB";

const config: Config = {
  key: "widget/vocadb",
  name: "VocaDB",
  description: "Display a highlighted song from VocaDB",
  dashboardComponent: VocaDBWidget,
};

export default config;
