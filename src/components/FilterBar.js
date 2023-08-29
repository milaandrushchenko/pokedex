import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React from "react";

export default function FilterBar({
  showFilters,
  types,
  setSelectedTypes,
  selectedTypes,
  isLoading,
  setSearchTerm,
}) {
  const handleTypeToggle = (event) => {
    setSearchTerm("");
    const type = event.target.name;
    setSelectedTypes((prevSelectedTypes) => {
      if (prevSelectedTypes.includes(type)) {
        return prevSelectedTypes.filter((prevType) => prevType !== type);
      } else {
        return [...prevSelectedTypes, type];
      }
    });
  };
  console.log(isLoading);

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
              disabled={isLoading}
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
