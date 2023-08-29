import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import React, { useEffect } from "react";
import PokemonCard from "./PokemonCard";
import TuneIcon from "@mui/icons-material/Tune";

export default function PokemonList({
  toggleFilters,
  filteredPokemons,
  isLoading,
  pokemonNotFound,
  displayedPokemons,
  setDisplayedPokemons,
  fetchPokemons,
  handleOpenDetails,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    console.log("111");
    if (filteredPokemons.length > 0) {
      setDisplayedPokemons(
        filteredPokemons.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        )
      );
    } else {
      fetchPokemons(rowsPerPage, rowsPerPage * page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage]);

  useEffect(() => {
    setPage(0);
    setDisplayedPokemons(
      filteredPokemons.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredPokemons]);
  return (
    <>
      <Grid container alignItems="center">
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
          {pokemonNotFound ? (
            <Typography
              variant="h6"
              color="textSecondary"
              sx={{ marginTop: 2 }}
            >
              Pokemon not found
            </Typography>
          ) : (
            displayedPokemons?.map((pokemon, index) => (
              <Grid item xs={12} sm={4} md={2.4} key={pokemon.name}>
                <PokemonCard
                  pokemon={pokemon}
                  handleOpenDetails={handleOpenDetails}
                />
              </Grid>
            ))
          )}
        </Grid>
      )}
    </>
  );
}
