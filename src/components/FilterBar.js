import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getPokemonByTypes } from "../api/pokemonApi";

export default function FilterBar({
  showFilters,
  types,
  setFilteredPokemons,
  isLoading,
  setIsLoading,
}) {
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleTypeToggle = (event) => {
    const type = event.target.name;
    setSelectedTypes((prevSelectedTypes) => {
      if (prevSelectedTypes.includes(type)) {
        return prevSelectedTypes.filter((prevType) => prevType !== type);
      } else {
        return [...prevSelectedTypes, type];
      }
    });
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const pokemons = await getPokemonByTypes(selectedTypes);
      setFilteredPokemons(pokemons);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedTypes]);

  return (
    <>
      {showFilters && (
        <FormGroup>
          <div>
            <h3>Types:</h3>
          </div>
          {types.map((type) => (
            <FormControlLabel
              key={type.name}
              control={<Checkbox />}
              label={type.name}
              name={type.name}
              checked={selectedTypes.includes(type.name)}
              onChange={handleTypeToggle}
              sx={{
                textTransform: "capitalize",
              }}
            />
          ))}
        </FormGroup>
      )}
    </>
  );
}
