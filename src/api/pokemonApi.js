import { BASE_URL } from "../utils/constants";
import { httpClient } from "./httpClient";

export const getAllPokemons = async (limit = 50, offset = 0) => {
  let url = `${BASE_URL}?limit=${limit}&offset=${offset}`;

  try {
    const res = await httpClient.get(url);
    const data = await res.data;
    console.log(data);

    const promises = data.results.map(async (pokemon) => {
      const res = await httpClient.get(pokemon.url);
      return res.data;
    });

    const results = await Promise.all(promises);
    console.log(results);
    return results;
  } catch (error) {
    console.error("Error fetching data:", error);
    return error;
  }
};
