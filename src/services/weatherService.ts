import { WeatherData, ForecastData, GeoSuggestion } from '../types/weather'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE = 'https://api.openweathermap.org/data/2.5'
const GEO  = 'https://api.openweathermap.org/geo/1.0'

async function apiFetch<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json() as Promise<T>
}

export const fetchWeather = (city: string) =>
  apiFetch<WeatherData>(
    `${BASE}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
  )

export const fetchForecast = (city: string) =>
  apiFetch<ForecastData>(
    `${BASE}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
  )

export const fetchWeatherByCoords = (lat: number, lon: number) =>
  apiFetch<WeatherData>(
    `${BASE}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )

export const fetchForecastByCoords = (lat: number, lon: number) =>
  apiFetch<ForecastData>(
    `${BASE}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )

export const fetchSuggestions = (query: string) =>
  apiFetch<GeoSuggestion[]>(
    `${GEO}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
  )
