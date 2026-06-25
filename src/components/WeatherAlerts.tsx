import { ForecastData } from '../types/weather'
import { getNextRainAlert, getHeatAlerts } from '../utils/weatherUtils'

interface Props {
  forecast: ForecastData
}

export default function WeatherAlerts({ forecast }: Props) {
  const rain = getNextRainAlert(forecast.list)
  const heat = getHeatAlerts(forecast.list)

  if (!rain && heat.length === 0) {
    return (
      <div className="alerts-section">
        <div className="alert-card alert-clear glass-card">
          <span className="alert-icon">✅</span>
          <div>
            <h3>Clear Weather Ahead</h3>
            <p>No rain or extreme heat expected in the next 5 days. Enjoy the weather!</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="alerts-section">
      {rain && (
        <div className={`alert-card ${rain.isThunderstorm ? 'alert-thunder' : 'alert-rain'} glass-card`}>
          <span className="alert-icon">{rain.isThunderstorm ? '⛈️' : '🌧️'}</span>
          <div>
            <h3>{rain.isThunderstorm ? 'Thunderstorm' : 'Rain'} Expected</h3>
            <p className="alert-time">{rain.time}</p>
            <span className="pop-badge">
              {rain.pop}% chance &nbsp;·&nbsp; {rain.description}
            </span>
          </div>
        </div>
      )}

      {heat.length > 0 && (
        <div className="alert-card alert-heat glass-card">
          <span className="alert-icon">🔥</span>
          <div>
            <h3>Extreme Heat Alert</h3>
            <p>Temperatures exceeding 35°C:</p>
            <div className="heat-times">
              {heat.map((h, i) => (
                <span key={i} className="heat-badge">
                  {h.time} — {h.temp}°C
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
