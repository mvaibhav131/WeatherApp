import { WeatherData } from '../types/weather'
import { formatTime, getWindDirection } from '../utils/weatherUtils'

interface Props {
  data: WeatherData
}

export default function CurrentWeather({ data }: Props) {
  const { name, sys, main, weather, wind, visibility } = data
  const cond = weather[0]
  const iconUrl = `https://openweathermap.org/img/wn/${cond.icon}@2x.png`
  const feelsHotter = main.feels_like > main.temp

  return (
    <div className="current-weather glass-card">
      {/* Header */}
      <div className="weather-header">
        <div>
          <h2 className="city-name">
            {name}, {sys.country}
          </h2>
          <p className="weather-desc">{cond.description}</p>
          <p className="updated-at">
            Updated {new Date(data.dt * 1000).toLocaleTimeString('en-IN', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <img src={iconUrl} alt={cond.description} className="weather-icon-lg" />
      </div>

      {/* Temperature */}
      <div className="temp-display">
        <span className="temp-main">{Math.round(main.temp)}°</span>
        <div className="temp-meta">
          <span className="feels-like">
            Feels like {Math.round(main.feels_like)}°C
            <span className={feelsHotter ? 'feels-badge hot' : 'feels-badge cool'}>
              {feelsHotter ? '🔥 Warmer' : '❄️ Cooler'}
            </span>
          </span>
          <span className="temp-range">
            ↑ {Math.round(main.temp_max)}° &nbsp; ↓ {Math.round(main.temp_min)}°
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="weather-stats">
        <div className="stat-item">
          <span className="stat-icon">💧</span>
          <span className="stat-value">{main.humidity}%</span>
          <div className="humidity-track">
            <div
              className="humidity-fill"
              style={{
                width: `${main.humidity}%`,
                background:
                  main.humidity > 70 ? '#f97316' :
                  main.humidity > 40 ? '#facc15' : '#60a5fa',
              }}
            />
          </div>
          <span className="stat-label">Humidity</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">🌬️</span>
          <span className="stat-value">
            {wind.speed} m/s {getWindDirection(wind.deg)}
          </span>
          <span className="stat-label">Wind</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">🔵</span>
          <span className="stat-value">{main.pressure} hPa</span>
          <span className="stat-label">Pressure</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">👁️</span>
          <span className="stat-value">{(visibility / 1000).toFixed(1)} km</span>
          <span className="stat-label">Visibility</span>
        </div>
      </div>

      {/* Sunrise / Sunset */}
      <div className="sun-times">
        <div className="sun-item">
          <span className="sun-label">🌅 Sunrise</span>
          <strong>{formatTime(sys.sunrise)}</strong>
        </div>
        <div className="sun-divider" />
        <div className="sun-item">
          <span className="sun-label">🌇 Sunset</span>
          <strong>{formatTime(sys.sunset)}</strong>
        </div>
      </div>
    </div>
  )
}
