import { Container, Grid } from "@mui/material";
import React from "react";
import PokemonCard from "./PokemonCard";

export default function PokemonList({ pokemons }) {
  return (
    <Container maxWidth="xl" sx={{ marginTop: 5, marginBottom: 5 }}>
      <Grid container justifyContent="center" spacing={{ xs: 2, md: 3 }}>
        {pokemons?.map((pokemon, index) => (
          <Grid item xs={12} sm={4} md={3} key={pokemon.id}>
            <PokemonCard
              name={pokemon.name}
              image={pokemon.sprites.other.dream_world.front_default}
              types={pokemon.types}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
