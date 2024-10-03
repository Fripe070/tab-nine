import { API } from "../../types";

type Data = {
  username: string;
  showSummary: boolean;
  linkToUser: boolean;

  useCustomColors: boolean;
  backgroundColor: string;
  foregroundColor: string;
};

export type Props = API<Data>;

export const defaultData: Data = {
  username: "",
  showSummary: false,
  linkToUser: false,

  useCustomColors: false,
  backgroundColor: "#0c0c0c",
  foregroundColor: "#fff",
};
