import React, { useState, useEffect } from "react";
import { TextField, List, ListItem, ListItemText } from "@mui/material";

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null); // Track selected city separately

  useEffect(() => {
    if (query.length > 2) {
      fetchSuggestions(query);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/find?q=${query}&appid=${API_KEY}`
      );
      const data = await response.json();

      // Filter out duplicate suggestions based on id
      const uniqueSuggestions = data.list.reduce((acc, current) => {
        const x = acc.find((item) => item.id === current.id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);

      setSuggestions(uniqueSuggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      onSearch(query);
      setSuggestions([]); // Clear suggestions after search
      setSelectedCity(null); // Clear selected city when new search is initiated
    }
  };

  const handleSuggestionClick = (cityName) => {
    setQuery(cityName);
    setSelectedCity(cityName); // Set selected city separately
    onSearch(cityName);
    setSuggestions([]); // Clear suggestions after selecting a city
  };

  return (
    <>
      <TextField
        label="Search City"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleSearch}
        fullWidth
      />
      {suggestions.length > 0 && (
        <List>
          {suggestions.map((suggestion) => (
            <ListItem
              button
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion.name)}
            >
              <ListItemText primary={suggestion.name} />
            </ListItem>
          ))}
        </List>
      )}
      {/* Display selected city separately */}
      {selectedCity && <div>Selected City: {selectedCity}</div>}
    </>
  );
};

export default Search;
