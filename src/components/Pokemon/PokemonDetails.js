import {
  Dialog,
  IconButton,
  Typography,
  Grid,
  List,
  ListItem,
  Box,
  LinearProgress,
} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import {
  decimetersToCentimeters,
  hectogramsToKilograms,
  toTitleCase,
} from "../../utils/common";

export default function PokemonDetails({ open, onOpen, onClose, pokemon }) {
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="lg"
      PaperProps={{
        sx: {
          width: "1300px",
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Details
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Grid container sx={{ p: 2 }} spacing={2}>
          <Grid item xs={12} sm={3}>
            <Box
              sx={{
                p: 2,
                textAlign: "center",
                background: "#e9eef7",
              }}
            >
              <Box>
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
                  {pokemon.name}
                </Typography>
                <Typography
                  gutterBottom
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    textAlign: "center",
                    fontStyle: "italic",
                    color: "red",
                  }}
                >
                  {pokemon.genera}
                </Typography>
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  style={{ width: "95%" }}
                />
              </Box>
              <Box>
                <Typography
                  gutterBottom
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    color: "#333",
                    textTransform: "capitalize",
                  }}
                >
                  Types:
                </Typography>
                {pokemon.types.map((type) => (
                  <div
                    key={type}
                    className={type}
                    style={{
                      color: "white",
                      borderRadius: "16px",
                      padding: "5px 10px",
                      margin: "5px 0",
                    }}
                  >
                    {type}
                  </div>
                ))}
              </Box>
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#333",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Weight:
                </Typography>
                <Typography
                  sx={{
                    color: "#333",
                    textAlign: "center",
                  }}
                >
                  {hectogramsToKilograms(pokemon.weight)} kg
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#333",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Height:
                </Typography>
                <Typography
                  sx={{
                    color: "#333",
                    textAlign: "center",
                  }}
                >
                  {decimetersToCentimeters(pokemon.height)} cm
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Box>
              <Box>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    color: "#333",
                    textTransform: "capitalize",
                  }}
                >
                  About
                </Typography>
                <Typography sx={{ textAlign: "center" }}>
                  {pokemon.description}
                </Typography>
              </Box>
              <Box>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    color: "#333",
                    textTransform: "capitalize",
                  }}
                >
                  Abilities
                </Typography>
                <List
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {pokemon.abilities.map((ability) => (
                    <ListItem
                      key={ability}
                      disableGutters
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <Typography>{toTitleCase(ability)}</Typography>
                    </ListItem>
                  ))}
                </List>
              </Box>
              <Box>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    color: "#333",
                    textTransform: "capitalize",
                  }}
                >
                  Base Statistics
                </Typography>
                <Box>
                  {pokemon.stats.map((stat) => (
                    <Box
                      key={stat["stat__name"]}
                      display="flex"
                      flexDirection={{ xs: "column", md: "row" }}
                      marginBottom={2}
                    >
                      <Box
                        flex={{ xs: "auto", md: 0.5 }}
                        display="flex"
                        alignItems="center"
                        justifyContent="flex-end"
                      >
                        <Typography style={{ marginRight: "0.5rem" }}>
                          {stat["stat__name"].toUpperCase()}:
                        </Typography>
                        <Typography style={{ marginRight: "0.5rem" }}>
                          {stat["stat__val"]}
                        </Typography>
                      </Box>
                      <Box
                        flex={1}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <LinearProgress
                          variant="determinate"
                          value={stat["stat__val"]}
                          sx={{ height: 10, width: "80%" }}
                        />
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}
