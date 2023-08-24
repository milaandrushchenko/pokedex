import { BASE_URL } from "../utils/constants";
import { httpClient } from "./httpClient";

export const getAllTypes = async () => {
  let url = `${BASE_URL}type`;

  try {
    const res = await httpClient.get(url);
    const data = await res.data;
    const results = data.results;
    return results;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
