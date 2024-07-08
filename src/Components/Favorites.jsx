import React, { useState, useEffect } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const Favorites = ({ onSelectFavorite }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleAddFavorite = (city) => {
    const updatedFavorites = [...favorites, city];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleRemoveFavorite = (city) => {
    const updatedFavorites = favorites.filter((fav) => fav !== city);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const isFavorite = (city) => {
    return favorites.includes(city);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleAddFavorite(prompt("Enter city name:"))}
        className="addfavbutton"
        sx={{ marginTop: "16px" }}
      >
        Add Favorite
      </Button>
      <List>
        {favorites.map((favorite, index) => (
          <ListItem key={index} disablePadding>
            <IconButton
              color={isFavorite(favorite) ? "primary" : "default"}
              onClick={() => onSelectFavorite(favorite)}
            >
              <StarIcon />
            </IconButton>
            <ListItemText primary={favorite} />
            <Button
              color="secondary"
              onClick={() => handleRemoveFavorite(favorite)}
            >
              Remove
            </Button>
          </ListItem>
        ))}
        {favorites.length === 0 && (
          <Typography variant="body2" color="textSecondary">
            No favorites added yet.
          </Typography>
        )}
      </List>
    </div>
  );
};

export default Favorites;
