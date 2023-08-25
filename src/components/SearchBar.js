import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

export default function SearchBar({
  setShowFilters,
  fetchPokemons,
  setSelectedTypes,
  fetchPokemonByName,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    setShowFilters(false);
    setSelectedTypes([]);
    if (searchTerm.length > 0) {
      fetchPokemonByName(searchTerm);
    } else {
      fetchPokemons();
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <TextField
        label="Search..."
        variant="outlined"
        size="small"
        type="search"
        value={searchTerm}
        onChange={handleInputChange}
        sx={{ marginRight: "10px" }}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
}
