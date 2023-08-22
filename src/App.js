import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { getAllPokemons } from "./api/pokemonApi";
import PokemonList from "./components/Pokemon/PokemonList";

export default function App() {
  const [allPokemons, setAllPokemons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const pokemons = await getAllPokemons();
      setAllPokemons(pokemons);
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <PokemonList pokemons={allPokemons} />
      <Outlet />
    </>
  );
}
