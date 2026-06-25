import { useState } from 'react'
import './App.css'
import { useWeather } from './hooks/useWeather'
import { WeatherData } from './types/weather'
import SearchBar from './components/SearchBar'
import CurrentWeather from './components/CurrentWeather'
import TemperatureChart from './components/TemperatureChart'
import WeatherAlerts from './components/WeatherAlerts'
import ForecastSection from './components/ForecastSection'

function getBgClass(weather: WeatherData | null): string {
  if (!weather) return 'bg-default'
  const h = new Date().getHours()
  if (h < 6 || h >= 20) return 'bg-night'
  const m = weather.weather[0].main.toLowerCase()
  if (m.includes('thunder')) return 'bg-thunder'
  if (m.includes('rain') || m.includes('drizzle')) return 'bg-rain'
  if (m.includes('snow')) return 'bg-snow'
  if (m.includes('cloud')) return 'bg-cloudy'
  if (m.includes('clear')) return 'bg-clear'
  return 'bg-haze'
}

export default function App() {
  const { weather, forecast, loading, error, searchByCity, searchByCoords, searchByLocation } = useWeather()
  const [theme, setTheme] = useState<'dark' | 'light'>(
    () => (localStorage.getItem('ws-theme') as 'dark' | 'light' | null) ?? 'dark'
  )
  const toggleTheme = () => setTheme(t => {
    const next = t === 'dark' ? 'light' : 'dark'
    localStorage.setItem('ws-theme', next)
    return next
  })
  const isDark = theme === 'dark'

  return (
    <div className={`app ${getBgClass(weather)}${isDark ? '' : ' light-theme'}`}>
      <div className="app-container">
        {/* Header */}
        <header className="app-header">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? '☀️' : '🌙'}
          </button>
          <h1 className="app-title">🌤️ WeatherScope</h1>
          <p className="app-subtitle">Real-time weather · Rain & Heat predictions</p>
        </header>

        {/* Search */}
        <SearchBar
          onSearch={searchByCity}
          onSearchByCoords={searchByCoords}
          onLocationSearch={searchByLocation}
          loading={loading}
        />

        {/* Loading */}
        {loading && (
          <div className="loading-container">
            <div className="loading-ring" />
            <p>Fetching weather data…</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="error-card glass-card">
            <span>⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {/* Weather Data */}
        {weather && !loading && (
          <div className="weather-content fade-in">
            <CurrentWeather data={weather} />
            {forecast && <TemperatureChart list={forecast.list} isDark={isDark} />}
            {forecast && <WeatherAlerts forecast={forecast} />}
            {forecast && <ForecastSection forecast={forecast} />}
          </div>
        )}

        {/* Welcome state */}
        {!weather && !loading && !error && (
          <div className="welcome-card glass-card">
            <div className="welcome-emoji">🌍</div>
            <h2>Find Your City Weather</h2>
            <p>
              Search any city or use your current location to get real-time weather —
              including when rain will hit and heat warnings.
            </p>
            <div className="feature-tags">
              <span>🌧️ Rain Alerts</span>
              <span>🔥 Heat Warnings</span>
              <span>📅 5-Day Forecast</span>
              <span>💨 Wind & Humidity</span>
              <span>📍 My Location</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          Created by{' '}
          <a href="https://github.com/mvaibhav131" target="_blank" rel="noopener noreferrer">
            Vaibhav More
          </a>
          {' '}·{' '}
          <a href="https://vaibhav-more-portfolio-site.netlify.app/" target="_blank" rel="noopener noreferrer">
            Portfolio
          </a>
          {' '}·{' '}
          <a href="https://www.linkedin.com/in/vaibhav131/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </p>
      </footer>
    </div>
  )
}
