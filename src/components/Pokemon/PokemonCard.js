import React, { useState } from "react";
import "../../styles/Pokemon.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PokemonDetails from "./PokemonDetails";

export default function PokemonCard({ pokemon }) {
  const [showDetails, setShowDetails] = useState(false);
  const { name, image, types } = pokemon;

  const handleOpenDetails = () => setShowDetails(true);
  const handleCloseDetails = () => setShowDetails(false);
  return (
    <>
      <Card
        onClick={handleOpenDetails}
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <CardMedia
          component="img"
          alt="green iguana"
          image={image}
          sx={{
            height: 200,
            objectFit: "contain",
          }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              fontWeight: "bold",
              color: "#333",
              textTransform: "capitalize",
              textAlign: "center",
            }}
          >
            {name}
          </Typography>
        </CardContent>
        <CardActions>
          {types.map((type) => (
            <div
              key={type}
              className={type}
              style={{
                color: "white",
                borderRadius: "16px",
                padding: "5px 10px",
                display: "inline-block",
              }}
            >
              {type}
            </div>
          ))}
        </CardActions>
      </Card>
      <PokemonDetails
        open={showDetails}
        onOpen={handleOpenDetails}
        onClose={handleCloseDetails}
        pokemon={pokemon}
      />
    </>
  );
}
