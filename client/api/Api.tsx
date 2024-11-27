import axios from "axios";
import { Track } from "../types"; // assuming you have a `types` file for interfaces

const API_URL = "http://10.106.18.123:3000";

export const fetchAllTracks = async (): Promise<Track[]> => {
  const response = await axios.get(`${API_URL}/all`);
  return response.data.sort((a: Track, b: Track) => Number(b.id) - Number(a.id));
};