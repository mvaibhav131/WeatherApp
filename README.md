# 🌤️ WeatherScope

> Real-time weather app with rain & heat predictions — built with React + TypeScript + Vite

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=flat-square)](https://weather-app-vaibhav.netlify.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Code-black?style=flat-square&logo=github)](https://github.com/mvaibhav131/WeatherApp)

---

## ✨ Features

- 🔍 **Smart City Search** — autocomplete dropdown with country flag, state & country using OpenWeatherMap Geocoding API
- 📍 **My Location** — one-click GPS-based weather detection
- 🌡️ **Current Weather** — temperature, feels like (warmer/cooler badge), min/max, humidity with progress bar, wind speed & direction, pressure, visibility
- 🌅 **Sunrise & Sunset** times
- 📈 **24-Hour Temperature Chart** — animated area chart (Recharts) showing temperature + feels like trend
- 🌧️ **Rain Alert** — tells you exactly when rain is expected (day, date & time) with probability
- 🔥 **Heat Alert** — extreme heat warnings when temperature exceeds 35°C
- 📅 **5-Day Forecast** — daily min/max, weather icon, rain probability, heat badges
- ☀️🌙 **Light / Dark Theme** — toggle with preference saved in localStorage
- 🎨 **Dynamic Backgrounds** — animated gradient per weather condition (clear, rain, thunder, snow, night, etc.)
- 📱 **Fully Responsive** — mobile-first layout with scroll-snap forecast, iOS safe-area support

---

## 🛠️ Tech Stack

| Layer      | Technology                                       |
| ---------- | ------------------------------------------------ |
| Framework  | React 18 + TypeScript                            |
| Build tool | Vite 5                                           |
| Charts     | Recharts                                         |
| API        | OpenWeatherMap (Current, Forecast, Geocoding)    |
| Styling    | Pure CSS — Glassmorphism + CSS custom properties |

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/mvaibhav131/WeatherApp.git
cd WeatherApp

# 2. Install dependencies
npm install

# 3. Add your API key
# Create a .env file in the root:
echo "VITE_WEATHER_API_KEY=your_key_here" > .env
# Get a free key at https://openweathermap.org/api

# 4. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── SearchBar.tsx        # Autocomplete search with dropdown
│   ├── CurrentWeather.tsx   # Main weather card
│   ├── TemperatureChart.tsx # 24h Recharts area chart
│   ├── WeatherAlerts.tsx    # Rain & heat prediction cards
│   └── ForecastSection.tsx  # 5-day forecast grid
├── hooks/
│   └── useWeather.ts        # Data fetching & state management
├── services/
│   └── weatherService.ts    # OpenWeatherMap API calls
├── types/
│   └── weather.ts           # TypeScript interfaces
└── utils/
    └── weatherUtils.ts      # Grouping, alerts, formatting
```

---

## 🌐 Links

- **Live App** → [weather-app-vaibhav.netlify.app](https://weather-app-vaibhav.netlify.app/)
- **Portfolio** → [vaibhav-more-portfolio-site.netlify.app](https://vaibhav-more-portfolio-site.netlify.app/)
- **LinkedIn** → [linkedin.com/in/vaibhav131](https://www.linkedin.com/in/vaibhav131/)

---

_Created by **Vaibhav More** — Full Stack Developer_
