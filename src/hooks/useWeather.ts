import { useState } from 'react'
import { WeatherData, ForecastData } from '../types/weather'
import {
  fetchWeather,
  fetchForecast,
  fetchWeatherByCoords,
  fetchForecastByCoords,
} from '../services/weatherService'

interface State {
  weather: WeatherData | null
  forecast: ForecastData | null
  loading: boolean
  error: string | null
}

export function useWeather() {
  const [state, setState] = useState<State>({
    weather: null,
    forecast: null,
    loading: false,
    error: null,
  })

  async function loadData(
    weatherPromise: Promise<WeatherData>,
    forecastPromise: Promise<ForecastData>
  ) {
    setState(prev => ({ ...prev, loading: true, error: null }))
    try {
      const [weather, forecast] = await Promise.all([weatherPromise, forecastPromise])
      setState({ weather, forecast, loading: false, error: null })
    } catch {
      setState(prev => ({
        ...prev,
        weather: null,
        forecast: null,
        loading: false,
        error: 'City not found. Please check spelling and try again.',
      }))
    }
  }

  function searchByCity(city: string) {
    void loadData(fetchWeather(city), fetchForecast(city))
  }

  function searchByCoords(lat: number, lon: number) {
    void loadData(fetchWeatherByCoords(lat, lon), fetchForecastByCoords(lat, lon))
  }

  function searchByLocation() {
    if (!navigator.geolocation) {
      setState(prev => ({ ...prev, error: 'Geolocation is not supported by your browser.' }))
      return
    }
    setState(prev => ({ ...prev, loading: true, error: null }))
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        void loadData(
          fetchWeatherByCoords(coords.latitude, coords.longitude),
          fetchForecastByCoords(coords.latitude, coords.longitude)
        )
      },
      () => {
        setState(prev => ({
          ...prev,
          loading: false,
          error: 'Location access denied. Please search by city name.',
        }))
      }
    )
  }

  return { ...state, searchByCity, searchByCoords, searchByLocation }
}
