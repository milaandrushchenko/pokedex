import { BASE_URL } from "../utils/constants";
import { httpClient } from "./httpClient";

export const getAllPokemons = async (limit = 50, offset = 0) => {
  let url = `${BASE_URL}pokemon?limit=${limit}&offset=${offset}`;

  try {
    const res = await httpClient.get(url);
    const data = await res.data;

    const promises = data.results.map(async (pokemon) => {
      const res = await httpClient.get(pokemon.url);
      return res.data;
    });

    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getGlobalPokemons = async () => {
  let url = `${BASE_URL}pokemon?limit=1300&offset=0`;

  try {
    const res = await httpClient.get(url);
    const data = await res.data;

    const promises = data.results.map(async (pokemon) => {
      const res = await httpClient.get(pokemon.url);
      return res.data;
    });
    const results = await Promise.all(promises);

    return results;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getPokemonByTypes = async (selectedTypes) => {
  try {
    if (selectedTypes.length === 0) {
      return [];
    }

    const promises = selectedTypes.map(async (type) => {
      const response = await httpClient.get(
        `https://pokeapi.co/api/v2/type/${type}`
      );
      const data = response.data;
      const pokemonPromises = data.pokemon.map(async (pokemon) => {
        const res = await httpClient.get(pokemon.pokemon.url);
        return res.data;
      });
      return Promise.all(pokemonPromises);
    });

    const results = await Promise.all(promises);
    const flattenedResults = results.flat();
    const uniquePokemonArray = Array.from(new Set(flattenedResults));

    return uniquePokemonArray;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
