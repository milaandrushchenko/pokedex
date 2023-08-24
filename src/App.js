import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import PokemonList from "./components/Pokemon/PokemonList";
import FilterBar from "./components/FilterBar";
import { Container, Grid } from "@mui/material";
import { getAllTypes } from "./api/typeApi";

export default function App() {
  const [allTypes, setAllTypes] = useState([]);

  const [allPokemons, setAllPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  // const [allGLobalPokemons, setAllGlobalPokemons] = useState([]);

  const [showFilters, setShowFilters] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const fetchType = async () => {
    const types = await getAllTypes();
    setAllTypes(types);
  };

  useEffect(() => {
    fetchType();
  }, []);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <>
      <Header />
      <Container maxWidth="xl" sx={{ marginTop: 5, marginBottom: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={showFilters ? 12 : 0} md={showFilters ? 2 : 0}>
            <FilterBar
              types={allTypes}
              showFilters={showFilters}
              toggleFilters={toggleFilters}
              setFilteredPokemons={setFilteredPokemons}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </Grid>
          <Grid item xs={12} md={showFilters ? 10 : 12}>
            <PokemonList
              pokemons={allPokemons}
              filteredPokemons={filteredPokemons}
              setAllPokemons={setAllPokemons}
              toggleFilters={toggleFilters}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </Grid>
        </Grid>
        {/* )} */}
      </Container>
      <Outlet />
    </>
  );
}
