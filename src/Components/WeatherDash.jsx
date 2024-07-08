import React from "react";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import "./styles.css";

const WeatherDash = ({ data }) => {
  const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

  return (
    <Card className="card weather-card">
      <CardContent>
        <Typography variant="h5" className="city-name">
          {data.name}
        </Typography>
        <CardMedia
          alt={data.weather[0].description}
          image={iconUrl}
          title={data.weather[0].description}
          className="weather-icon"
        />
        <Typography variant="h6" className="weather-description">
          {data.weather[0].description}
        </Typography>
        <Typography>Temperature: {data.main.temp}°C</Typography>
        <Typography>Humidity: {data.main.humidity}%</Typography>
        <Typography>Wind Speed: {data.wind.speed} m/s</Typography>
      </CardContent>
    </Card>
  );
};

export default WeatherDash;
