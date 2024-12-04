import axios from "axios";
import { Track } from "../types"; // assuming you have a `types` file for interfaces

const API_URL = "http://localhost:3000/spotify";

/**
 * Fetch all tracks from the server
 */

// Call API trên firebase
// export const fetchAllTracks = async (): Promise<Track[]> => {
//   try {
//     const response = await axios.get(`${API_URL}/all`);
//     return response.data.sort(
//       (a: Track, b: Track) => Number(b.id) - Number(a.id)
//     );
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw new Error("Unable to fetch data");
//   }
// };

// Call API tĩnh
export const fetchAllTracks = async (): Promise<Track[]> => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data.sort(
      (a: Track, b: Track) => Number(b.id) - Number(a.id)
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Unable to fetch data");
  }
};