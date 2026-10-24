const weatherInput = document.querySelector(".weather-input");
const searchWeather = document.querySelector(".search-weather");
const errorMessage = document.querySelector(".errorMessage");
const form = document.querySelector("form");
const serverMessage = document.querySelector(".serverMessage");
const loading = document.querySelector(".loading");
const searchedCity = document.querySelector(".searched-city");
const temperature = document.querySelector(".temperature");
const weatherCode = document.querySelector(".code");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const emoji = document.querySelector("#emoji");

// Get city coordinates
async function getCoordinates(cityName) {
  const data = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`,
  );

  if (!data.ok) {
    throw new Error("Something went wrong. Please try again");
  }

  const response = await data.json();

  if (!response.results || response.results.length === 0) {
    throw new Error("City not found");
  }

  const latitude = response.results[0].latitude;
  const longitude = response.results[0].longitude;

  return { latitude, longitude };
}

// Get weather data
async function getWeather(latitude, longitude) {
  const weather = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&forecast_days=7`,
  );

  if (!weather.ok) {
    throw new Error("Something went wrong. Please try again");
  }

  const weatherResponse = await weather.json();
  console.log(weatherResponse);

  return weatherResponse;
}

// Get weather description based on weather code
function getWeatherDescription(code) {
  if (code === 0) {
    weatherCode.textContent = "Clear sky";
    emoji.textContent = "☀️";
  } else if (code === 1) {
    weatherCode.textContent = "Mainly clear";
    emoji.textContent = "🌤️";
  } else if (code === 2) {
    weatherCode.textContent = "Partly cloudy";
    emoji.textContent = "⛅";
  } else if (code === 3) {
    weatherCode.textContent = "Overcast";
    emoji.textContent = "☁️";
  } else if (code === 45 || code === 48) {
    weatherCode.textContent = "Foggy";
    emoji.textContent = "🌫️";
  } else if (code >= 51 && code <= 57) {
    weatherCode.textContent = "Drizzle";
    emoji.textContent = "🌦️";
  } else if (code >= 61 && code <= 67) {
    weatherCode.textContent = "Rain";
    emoji.textContent = "🌧️";
  } else if (code >= 71 && code <= 77) {
    weatherCode.textContent = "Snow";
    emoji.textContent = "❄️";
  } else if (code >= 80 && code <= 82) {
    weatherCode.textContent = "Rain showers";
    emoji.textContent = "🌦️";
  } else if (code >= 95) {
    weatherCode.textContent = "Thunderstorm";
    emoji.textContent = "⛈️";
  }
}

// Display weather data
function displayWeather(response, cityName) {
  searchedCity.textContent = `${cityName}`;
  temperature.textContent = `${response.current.temperature_2m}°C`;
  getWeatherDescription(response.current.weather_code);
  humidity.textContent = `Humidity: ${response.current.relative_humidity_2m}%`;
  wind.textContent = `Wind: ${response.current.wind_speed_10m}km/h`;
}

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const cityName = weatherInput.value.trim();
  errorMessage.textContent = "";
  serverMessage.textContent = "";

  if (cityName === "") {
    errorMessage.textContent = "Please enter a city";
    return;
  }

  try {
    loading.textContent = "Loading...";
    const coordinates = await getCoordinates(cityName);
    const weather = await getWeather(coordinates.latitude, coordinates.longitude);
    displayWeather(weather, cityName);
  } catch (error) {
    if (error.message.includes("Failed to fetch")) {
      serverMessage.textContent = "Please check your internet connection and try again.";
    } else {
      serverMessage.textContent = error.message;
    }
  } finally {
    loading.textContent = "";
  }
});