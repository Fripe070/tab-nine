import { API } from "../../types";

export type VocaDBSong = {
  additionalNames:     string;
  albums:              Album[];
  artists:             ArtistElement[];
  artistString:        string;
  createDate:          Date;
  defaultName:         string;
  defaultNameLanguage: string;
  favoritedTimes:      number;
  id:                  number;
  lengthSeconds:       number;
  lyrics:              Lyric[];
  mainPicture:         MainPicture;
  name:                string;
  names:               Name[];
  originalVersionId?:  number;
  publishDate:         Date;
  pvs:                 PV[];
  pvServices:          string;
  ratingScore:         number;
  releaseEvents:       ReleaseEvent[];
  songType:            string;
  status:              string;
  tags:                TagElement[];
  thumbUrl:            string;
  version:             number;
  webLinks:            WebLink[];
  cultureCodes:        string[];
  maxMilliBpm?:        number;
  minMilliBpm?:        number;
}

export type Album = {
  additionalNames:  string;
  artistString:     string;
  coverPictureMime: string;
  createDate:       Date;
  deleted:          boolean;
  discType:         string;
  id:               number;
  name:             string;
  ratingAverage:    number;
  ratingCount:      number;
  releaseDate:      ReleaseDate;
  status:           string;
  version:          number;
}

export type ReleaseDate = {
  day:     number;
  isEmpty: boolean;
  month:   number;
  year:    number;
}

export type ArtistElement = {
  artist?:        ArtistArtist;
  categories:     string;
  effectiveRoles: string;
  id:             number;
  isCustomName:   boolean;
  isSupport:      boolean;
  name:           string;
  roles:          string;
}

export type ArtistArtist = {
  additionalNames: string;
  artistType:      string;
  deleted:         boolean;
  id:              number;
  name:            string;
  pictureMime?:    string;
  status:          string;
  version:         number;
  releaseDate?:    Date;
}

export type Lyric = {
  cultureCodes:    string[];
  id:              number;
  source:          string;
  translationType: string;
  url:             string;
  value:           string;
}

export type MainPicture = {
  urlOriginal: string;
  urlThumb:    string;
}

export type Name = {
  language: string;
  value:    string;
}

export type PV = {
  author:            string;
  disabled:          boolean;
  id:                number;
  length:            number;
  name:              string;
  publishDate:       Date;
  pvId:              string;
  service:           string;
  pvType:            string;
  thumbUrl:          string;
  url:               string;
}

export type ReleaseEvent = {
  category:     string;
  date:         Date;
  id:           number;
  name:         string;
  seriesId:     number;
  seriesNumber: number;
  seriesSuffix: string;
  status:       string;
  urlSlug:      string;
  venueName:    string;
  version:      number;
}

export type TagElement = {
  count: number;
  tag:   TagTag;
}

export type TagTag = {
  additionalNames: string;
  categoryName:    string;
  id:              number;
  name:            string;
  urlSlug:         string;
}

export type WebLink = {
  category:    string;
  description: string;
  disabled:    boolean;
  id:          number;
  url:         string;
}


export type Cache = {
  songs: VocaDBSong[];
  cachedAt: number;
};

export type Data = {
};

export type Props = API<Data, Cache>;

export const defaultData: Data = {
};
