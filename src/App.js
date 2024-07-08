import React, { useState } from "react";
import { Container, Typography, CircularProgress } from "@mui/material";
import Search from "./Components/Search";
import WeatherDash from "./Components/WeatherDash";
import Forecast from "./Components/Forecast";
import TemperatureChart from "./Components/TemperatureChart";
import { fetchWeather, fetchForecast } from "./api/weatherData";
import Favorites from "./Components/Favorites";
import "./Components/styles.css";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (city) => {
    setLoading(true);
    try {
      const weatherData = await fetchWeather(city);
      setWeather(weatherData);

      const forecastData = await fetchForecast(city);
      setForecast(forecastData);

      setError(null); // Reset error state
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="container">
      <Typography variant="h4" gutterBottom>
        Weather Dashboard
      </Typography>
      <Search onSearch={handleSearch} />
      <Favorites onSelectFavorite={handleSearch} />
      {loading && <CircularProgress />} {/* Loading indicator */}
      {error && (
        <Typography variant="body1" className="error-message">
          {error}
        </Typography>
      )}
      {weather && <WeatherDash data={weather} />}
      {forecast && (
        <>
          <Forecast data={forecast} />
          <TemperatureChart forecast={forecast} />
        </>
      )}
    </Container>
  );
};

export default App;
