import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import PokemonList from "./components/Pokemon/PokemonList";
import FilterBar from "./components/FilterBar";
import { Container, Grid } from "@mui/material";
import { getAllTypes } from "./api/typeApi";
import SearchBar from "./components/SearchBar";
import {
  getAllPokemons,
  getPokemonByName,
  getPokemonByTypes,
} from "./api/pokemonApi";

export default function App() {
  const [allTypes, setAllTypes] = useState([]);

  const [displayedPokemons, setDisplayedPokemons] = React.useState([]);

  const [filteredPokemons, setFilteredPokemons] = useState([]);

  const [pokemonNotFound, setPokemonNotFound] = useState(false);

  const [selectedTypes, setSelectedTypes] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  // const [allGLobalPokemons, setAllGlobalPokemons] = useState([]);

  const [showFilters, setShowFilters] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const fetchType = async () => {
    const types = await getAllTypes();
    setAllTypes(types);
  };

  const fetchPokemons = async (limit = 10, offset = 0) => {
    setIsLoading(true);
    setPokemonNotFound(false);
    // setFilteredPokemons([]);
    try {
      const pokemons = await getAllPokemons(limit, offset);
      setDisplayedPokemons(pokemons);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPokemonByTypes = async () => {
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

  const fetchPokemonByName = async (searchTerm) => {
    setIsLoading(true);
    setSelectedTypes([]);
    try {
      const pokemon = await getPokemonByName(searchTerm);
      if (pokemon === undefined) {
        setPokemonNotFound(true);
        setFilteredPokemons([]);
      } else {
        setPokemonNotFound(false);
        setFilteredPokemons([pokemon]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setFilteredPokemons([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchType();
  }, []);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  useEffect(() => {
    if (selectedTypes.length === 0 && searchTerm.length === 0) {
      console.log(filteredPokemons);
      fetchPokemons();
    } else {
      fetchPokemonByTypes();
    }
  }, [selectedTypes]);

  return (
    <>
      <Header />

      <Container maxWidth="xl" sx={{ marginTop: 5, marginBottom: 5 }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={4}>
            <SearchBar
              fetchPokemonByName={fetchPokemonByName}
              setShowFilters={setShowFilters}
              fetchPokemons={fetchPokemons}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={showFilters ? 12 : 0} md={showFilters ? 2 : 0}>
            <FilterBar
              types={allTypes}
              showFilters={showFilters}
              toggleFilters={toggleFilters}
              selectedTypes={selectedTypes}
              setSelectedTypes={setSelectedTypes}
            />
          </Grid>
          <Grid item xs={12} md={showFilters ? 10 : 12}>
            <PokemonList
              fetchPokemons={fetchPokemons}
              filteredPokemons={filteredPokemons}
              toggleFilters={toggleFilters}
              isLoading={isLoading}
              pokemonNotFound={pokemonNotFound}
              displayedPokemons={displayedPokemons}
              setDisplayedPokemons={setDisplayedPokemons}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
