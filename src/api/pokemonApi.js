import { BASE_URL } from "../utils/constants";
import { httpClient } from "./httpClient";

export const getAllPokemons = async (limit = 10, offset = 0) => {
  let url = `${BASE_URL}pokemon?limit=${limit}&offset=${offset}`;

  try {
    const res = await httpClient.get(url);
    const data = await res.data;

    const promises = data.results.map(async (pokemon) => {
      const res = await httpClient.get(pokemon.url);
      const data = getPokemonData(res.data);
      return data;
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
        const data = getPokemonData(res.data);
        return data;
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

export const getPokemonByName = async (name) => {
  let cleanName = name.toLowerCase().replace(/\s+/g, "");
  let url = `${BASE_URL}pokemon/${cleanName}`;
  try {
    const res = await httpClient.get(url);
    const data = getPokemonData(res.data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// export const fetchPokemonDescription = async (pokemon_name) => {
//   // debugger;

//   let genera = "",
//     description = "";

//   const response = await httpClient
//     .get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon_name}`)
//     .catch((err) => console.log("Error:", err));

//   try {
//     for (let i = 0; i < response.data.flavor_text_entries.length - 1; i++) {
//       if (response.data.flavor_text_entries[i].language.name === "en") {
//         description = response.data.flavor_text_entries[i].flavor_text;
//         break;
//       }
//     }

//     for (let j = 0; j < response.data.genera.length; j++) {
//       if (response.data.genera[j].language.name === "en") {
//         genera = response.data.genera[j].genus;
//         break;
//       }
//     }

//     return {
//       description: description,
//       genera: genera,
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };

export const fetchPokemonDescription = async (url) => {
  try {
    const response = await httpClient.get(url);

    const englishFlavorText = response.data.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    );
    const description = englishFlavorText ? englishFlavorText.flavor_text : "";

    const englishGenus = response.data.genera.find(
      (genus) => genus.language.name === "en"
    );
    const genera = englishGenus ? englishGenus.genus : "";

    return {
      description: description,
      genera: genera,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error to allow the caller to handle it
  }
};

export const getPokemonData = async (data) => {
  const statistics = [];
  const abs = [];
  const types = [];
  const id = data.id;

  for (let i = 0; i < data.abilities.length; i++) {
    abs.push(data.abilities[i].ability.name);
  }
  for (let i = 0; i < data.types.length; i++) {
    types.push(data.types[i].type.name);
  }

  for (let j = 0; j < data.stats.length; j++) {
    const Obj = {};
    Obj["stat__name"] = data.stats[j].stat.name;
    Obj["stat__val"] = data.stats[j].base_stat;
    statistics.push(Obj);
  }

  const descriptionData = await fetchPokemonDescription(data.species.url);

  return {
    weight: data.weight,
    height: data.height,
    types: types,
    id: id,
    image: data.sprites.other.dream_world.front_default
      ? data.sprites.other.dream_world.front_default
      : data.sprites.other["official-artwork"].front_default,
    name: data.name,
    stats: statistics,
    abilities: abs,
    description: descriptionData.description,
    genera: descriptionData.genera,
  };
};
