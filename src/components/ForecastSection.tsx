import { ForecastData, DailyForecast } from '../types/weather'
import { groupForecastByDay } from '../utils/weatherUtils'

interface CardProps {
  day: DailyForecast
}

function ForecastCard({ day }: CardProps) {
  const icon = `https://openweathermap.org/img/wn/${day.icon}@2x.png`
  return (
    <div
      className={`forecast-card glass-card${day.willRain ? ' rain-day' : ''}${day.isHot ? ' hot-day' : ''}`}
    >
      <p className="forecast-day">{day.isToday ? 'Today' : day.dayName.slice(0, 3)}</p>
      <p className="forecast-date">{day.date}</p>
      <img src={icon} alt={day.description} className="forecast-icon" />
      <p className="forecast-desc">{day.description}</p>
      <div className="forecast-temps">
        <span className="max-temp">{day.maxTemp}°</span>
        <span className="min-temp">{day.minTemp}°</span>
      </div>
      {day.willRain && (
        <div className="rain-prob">
          <span>💧</span>
          <span>{Math.round(day.pop * 100)}%</span>
        </div>
      )}
      {day.isHot && <div className="hot-tag">🔥 Hot</div>}
    </div>
  )
}

export default function ForecastSection({ forecast }: { forecast: ForecastData }) {
  const days = groupForecastByDay(forecast.list)
  return (
    <div className="forecast-section">
      <h3 className="section-title">5-Day Forecast</h3>
      <div className="forecast-grid">
        {days.map(day => (
          <ForecastCard key={day.dateKey} day={day} />
        ))}
      </div>
    </div>
  )
}
