import { API } from "../../types";

export type InfoItem = {
  title: string;
  description: string;
  author?: string;
  link?: string;
};


type Data = {
  items: InfoItem[];
};

export type Props = API<Data>;

export const defaultData: Data = {
  items: [],
};
