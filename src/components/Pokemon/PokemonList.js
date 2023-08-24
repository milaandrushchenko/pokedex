import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import React, { useEffect } from "react";
import { getAllPokemons } from "../../api/pokemonApi";
import PokemonCard from "./PokemonCard";
import TuneIcon from "@mui/icons-material/Tune";

export default function PokemonList({
  pokemons,
  setAllPokemons,
  toggleFilters,
  filteredPokemons,
  isLoading,
  setIsLoading,
}) {
  const [displayedPokemons, setDisplayedPokemons] = React.useState([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const pokemons = await getAllPokemons(rowsPerPage, rowsPerPage * page);
      setDisplayedPokemons(pokemons);
      setAllPokemons(pokemons);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (filteredPokemons.length > 0) {
      setDisplayedPokemons(
        filteredPokemons.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        )
      );
    } else {
      fetchData();
    }
  }, [page, rowsPerPage]);

  useEffect(() => {
    setPage(0);
    if (filteredPokemons.length > 0) {
      setDisplayedPokemons(
        filteredPokemons.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        )
      );
    } else {
      setDisplayedPokemons(pokemons);
    }
  }, [filteredPokemons]);

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={3}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={toggleFilters}>
              <TuneIcon />
            </IconButton>
            <Typography sx={{ marginLeft: "8px" }}>Filter</Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={9}>
          <TablePagination
            component="div"
            count={filteredPokemons.length > 0 ? filteredPokemons.length : 1281}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Pokemons per page"
            rowsPerPageOptions={[10, 20, 50]}
          />
        </Grid>
      </Grid>
      {isLoading ? (
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container justifyContent="center" spacing={{ xs: 2, md: 3 }}>
          {displayedPokemons?.map((pokemon, index) => (
            <Grid item xs={12} sm={4} md={2.4} key={pokemon.id}>
              <PokemonCard
                name={pokemon.name}
                image={
                  pokemon.sprites.other.dream_world.front_default
                    ? pokemon.sprites.other.dream_world.front_default
                    : pokemon.sprites.other["official-artwork"].front_default
                }
                types={pokemon.types}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}
