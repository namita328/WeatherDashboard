const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

export const fetchWeather = async (city) => {
  console.log("API Key:", API_KEY);
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 404) {
        throw new Error(`City not found: ${errorData.message}`);
      } else if (response.status === 401) {
        throw new Error(
          `Unauthorized: Check your API key: ${errorData.message}`
        );
      } else {
        throw new Error(`Failed to fetch weather data: ${errorData.message}`);
      }
    }
    const data = await response.json();
    console.log("Weather data:", data);
    return data;
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

export const fetchForecast = async (city) => {
  console.log("API Key ForeCast:", API_KEY);
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 404) {
        throw new Error(`City not found: ${errorData.message}`);
      } else if (response.status === 401) {
        throw new Error(
          `Unauthorized: Check your API key: ${errorData.message}`
        );
      } else {
        throw new Error(`Failed to fetch forecast data: ${errorData.message}`);
      }
    }
    const data = await response.json();

    // Filter the data to get one entry per day (noon)
    const dailyData = [];
    const seenDates = new Set();

    for (const entry of data.list) {
      const date = new Date(entry.dt * 1000);
      const day = date.toISOString().split("T")[0]; // Get the day part of the date
      if (!seenDates.has(day) && date.getHours() === 12) {
        dailyData.push(entry);
        seenDates.add(day);
      }
    }

    return { ...data, list: dailyData };
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};
