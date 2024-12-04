// API tĩnh
export interface Track {
  id: string;
  name: string;
  artists: string[];
  image: string;
  audio_file: string;
  musician: string[];
  category: string[];
  like: number;
  show: string;
};

// API trên firebase
// export interface Track {
//   id: string;
//   name: string;
//   artists: string;
//   image: string;
//   audio_file: string;
//   musician: string;
//   category: string;
//   like: number;
//   show: string;
// };
