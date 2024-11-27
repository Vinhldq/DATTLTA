export interface Track {
    album: any;
    title: any;
    id: string;
    name: string;
    artists: string;
    image: string;
    audio_file: string;
  };
  export type Album = {
    id: string;
    name: string;
    images: Image[];
  };
  export type Artist = {
    id: string;
    name: string;
    images?: Image[];
  };
  
  export type Image = {
    url: string;
    height?: number;
    width?: number;
  };