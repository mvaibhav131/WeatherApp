export interface WeatherMain {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
}

export interface WeatherCondition {
  id: number
  main: string
  description: string
  icon: string
}

export interface Wind {
  speed: number
  deg: number
}

export interface WeatherData {
  id: number
  name: string
  coord: { lat: number; lon: number }
  sys: {
    country: string
    sunrise: number
    sunset: number
  }
  main: WeatherMain
  weather: WeatherCondition[]
  wind: Wind
  visibility: number
  dt: number
  timezone: number
}

export interface ForecastItem {
  dt: number
  main: WeatherMain
  weather: WeatherCondition[]
  wind: Wind
  pop: number
  rain?: { '3h': number }
  dt_txt: string
}

export interface ForecastData {
  list: ForecastItem[]
  city: {
    name: string
    country: string
    timezone: number
    sunrise: number
    sunset: number
  }
}

export interface DailyForecast {
  dateKey: string
  date: string
  dayName: string
  isToday: boolean
  minTemp: number
  maxTemp: number
  icon: string
  description: string
  pop: number
  willRain: boolean
  isHot: boolean
}

export interface RainAlert {
  time: string
  description: string
  pop: number
  isThunderstorm: boolean
}

export interface HeatAlert {
  time: string
  temp: number
}

export interface GeoSuggestion {
  name: string
  lat: number
  lon: number
  country: string
  state?: string
}
