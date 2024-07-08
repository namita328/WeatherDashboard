import React from "react";
import { Card, CardContent, Typography, Grid, CardMedia } from "@mui/material";
import "./styles.css";

const Forecast = ({ data }) => {
  if (!data || !data.list) {
    console.log("No data or data.list is undefined");
    return <div>Loading...</div>; // Or any loading indicator
  }

  return (
    <Grid container spacing={2} className="grid-container">
      {data.list.map((day, index) => {
        const iconUrl = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
        return (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className="card">
              <div className="card-header">
                <Typography variant="h6">
                  {new Date(day.dt * 1000).toDateString()}
                </Typography>
              </div>
              <CardContent>
                <CardMedia
                  component="img"
                  alt={day.weather[0].description}
                  image={iconUrl}
                  title={day.weather[0].description}
                  className="weather-icon"
                />
                <Typography>
                  Temperature: {day.main?.temp ?? "N/A"}°C
                </Typography>
                <Typography>
                  Weather: {day.weather?.[0]?.description ?? "N/A"}
                </Typography>
                <Typography>
                  Precipitation: {day.pop ? day.pop * 100 : 0}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Forecast;
