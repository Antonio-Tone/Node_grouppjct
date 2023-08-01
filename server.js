// app.js
const express = require('express');
const axios = require('axios');
const path = require('path'); 
const app = express();
const PORT = process.env.PORT || 3000;

// Your OpenWeatherMap API key (replace with the actual API key)
const apiKey = "a8d7accd6865ef338c7c32040ff3f0b0";


app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/weather', async (req, res) => {
  const city = req.query.city;


  try {
    
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );

    // Extract relevant weather data from the API response
    const { name, main, weather, wind } = response.data;
    const temperature = main.temp;
    const description = weather[0].description;
    const humidity = main.humidity;
    const windSpeed = wind.speed;

    // Send the weather data as the response
    res.json({ city: name, temperature, description, humidity, windSpeed });
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ error: 'Unable to fetch weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

