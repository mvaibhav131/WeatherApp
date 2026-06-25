import { ForecastItem, DailyForecast, RainAlert, HeatAlert } from '../types/weather'

export function groupForecastByDay(list: ForecastItem[]): DailyForecast[] {
  const groups: Record<string, ForecastItem[]> = {}
  list.forEach(item => {
    const date = item.dt_txt.split(' ')[0]
    if (!groups[date]) groups[date] = []
    groups[date].push(item)
  })

  const todayKey = new Date().toISOString().split('T')[0]

  return Object.entries(groups)
    .map(([key, items]) => {
      const temps = items.map(i => i.main.temp)
      const maxPop = Math.max(...items.map(i => i.pop))
      const noon = items.find(i => i.dt_txt.includes('12:00:00')) ?? items[Math.floor(items.length / 2)]
      const d = new Date(key + 'T12:00:00')
      const willRain =
        maxPop > 0.3 ||
        items.some(i => ['Rain', 'Drizzle', 'Thunderstorm'].includes(i.weather[0].main))

      return {
        dateKey: key,
        date: d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
        dayName: d.toLocaleDateString('en-IN', { weekday: 'long' }),
        isToday: key === todayKey,
        minTemp: Math.round(Math.min(...temps)),
        maxTemp: Math.round(Math.max(...temps)),
        icon: noon.weather[0].icon,
        description: noon.weather[0].description,
        pop: maxPop,
        willRain,
        isHot: Math.max(...temps) > 35,
      }
    })
    .slice(0, 5)
}

export function getNextRainAlert(list: ForecastItem[]): RainAlert | null {
  const item = list.find(
    i =>
      ['Rain', 'Drizzle', 'Thunderstorm'].includes(i.weather[0].main) || i.pop >= 0.5
  )
  if (!item) return null

  const d = new Date(item.dt * 1000)
  return {
    time: d.toLocaleDateString('en-IN', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    description: item.weather[0].description,
    pop: Math.round(item.pop * 100),
    isThunderstorm: item.weather[0].main === 'Thunderstorm',
  }
}

export function getHeatAlerts(list: ForecastItem[]): HeatAlert[] {
  return list
    .filter(i => i.main.temp > 35)
    .slice(0, 3)
    .map(i => ({
      time: new Date(i.dt * 1000).toLocaleDateString('en-IN', {
        weekday: 'short',
        hour: '2-digit',
      }),
      temp: Math.round(i.main.temp),
    }))
}

export function getWindDirection(deg: number): string {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  return dirs[Math.round(deg / 45) % 8]
}

export function formatTime(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  })
}
