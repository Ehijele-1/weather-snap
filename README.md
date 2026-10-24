# WeatherSnap

A simple, good-looking weather app. Search for any city and instantly see its current temperature, conditions, humidity, and wind speed. Built with vanilla HTML, CSS, and JavaScript, with no frameworks or API keys needed.

## Features

- **City search**: type any city name and get its current weather
- **Current conditions**: temperature (°C), weather description, humidity, and wind speed
- **Weather emojis**: the card icon changes with conditions (clear, cloudy, fog, rain, snow, thunderstorm, and more)
- **Loading state**: a "Loading..." message shows while data is being fetched
- **Error handling**: clear messages for empty input, unknown cities, API failures, and lost internet connection
- **Responsive design**: a glassmorphism-style card that adapts to mobile and desktop

## Tech Stack

- HTML5
- CSS3 (flexbox, grid, `backdrop-filter`, media queries)
- Vanilla JavaScript (`async/await`, Fetch API)
- [Open-Meteo](https://open-meteo.com/) Geocoding API and Forecast API (free, no API key)

## Project Structure

```
weather-snap/
├── index.html          # App markup
├── weather-snap.css    # Styling
├── weather-snap.js     # App logic
└── README.md
```

## Getting Started

1. Clone or download this repository:
   ```bash
   git clone <your-repo-url>
   cd weather-snap
   ```
2. Open `index.html` in your browser. No install or build step is needed, and you don't need an API key.

## How It Works

Searching for a city is a two-step process:

1. **Geocoding**: the city name is sent to the Open-Meteo Geocoding API, which returns the city's latitude and longitude.
   ```
   https://geocoding-api.open-meteo.com/v1/search?name={city}&count=1
   ```
2. **Weather lookup**: those coordinates are sent to the Open-Meteo Forecast API, which returns the current conditions.
   ```
   https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m
   ```

The app then maps the returned **WMO weather code** to a readable description and emoji:

| Code | Condition | Emoji |
| --- | --- | --- |
| 0 | Clear sky | ☀️ |
| 1 | Mainly clear | 🌤️ |
| 2 | Partly cloudy | ⛅ |
| 3 | Overcast | ☁️ |
| 45, 48 | Foggy | 🌫️ |
| 51-57 | Drizzle | 🌦️ |
| 61-67 | Rain | 🌧️ |
| 71-77 | Snow | ❄️ |
| 80-82 | Rain showers | 🌦️ |
| 95+ | Thunderstorm | ⛈️ |

## Error Handling

| Situation | Message |
| --- | --- |
| Empty input | "Please enter a city" |
| City not found | "City not found" |
| API returns an error | "Something went wrong. Please try again" |
| No internet connection | "Please check your internet connection and try again." |

## Known Limitations and Future Improvements

- Weather codes 85-86 (snow showers) and 83-84/87-94 aren't mapped yet, so the previous description stays on screen for those
- The city shown is what the user typed, not the official name returned by the geocoding API
- Only the current weather is displayed (the 7-day forecast is requested but not shown yet)
- Ideas: 7-day forecast cards, °C/°F toggle, "use my location" button, recent searches, city name autocomplete

## Credits

Weather data provided by [Open-Meteo](https://open-meteo.com/) (free for non-commercial use).

## License

This project is open source and available under the [MIT License](LICENSE).
