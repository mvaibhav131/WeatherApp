import {
  AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { ForecastItem } from '../types/weather'

interface Props {
  list: ForecastItem[]
  isDark: boolean
}

interface Point { time: string; temp: number; feels: number }

interface TooltipItem { name: string; value: unknown; color: string }

const ChartTooltip = ({
  active, payload, label, isDark,
}: {
  active?: boolean
  payload?: TooltipItem[]
  label?: string
  isDark: boolean
}) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: isDark ? 'rgba(15,23,42,0.93)' : 'rgba(255,255,255,0.97)',
      border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'}`,
      borderRadius: 12,
      padding: '10px 14px',
      fontSize: 13,
      color: isDark ? '#fff' : '#0f172a',
      boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
    }}>
      <div style={{ color: isDark ? 'rgba(255,255,255,0.55)' : '#64748b', fontWeight: 600, marginBottom: 6 }}>
        {label}
      </div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, margin: '2px 0' }}>
          {p.name}: <strong>{Number(p.value)}°C</strong>
        </div>
      ))}
    </div>
  )
}

export default function TemperatureChart({ list, isDark }: Props) {
  const data: Point[] = list.slice(0, 8).map(item => ({
    time: new Date(item.dt * 1000).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    temp: Math.round(item.main.temp),
    feels: Math.round(item.main.feels_like),
  }))

  const grid       = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'
  const tick       = isDark ? 'rgba(255,255,255,0.5)'  : '#94a3b8'
  const tempColor  = isDark ? '#60a5fa' : '#2563eb'
  const feelsColor = isDark ? '#c084fc' : '#7c3aed'
  const fillStop   = isDark ? 'rgba(96,165,250,0.28)'  : 'rgba(37,99,235,0.18)'

  return (
    <div className="chart-card glass-card">
      <h3 className="section-title">24-Hour Temperature Trend</h3>
      <ResponsiveContainer width="100%" height={190}>
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -22, bottom: 0 }}>
          <defs>
            <linearGradient id="tGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={fillStop} stopOpacity={1} />
              <stop offset="100%" stopColor={fillStop} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
          <XAxis
            dataKey="time"
            tick={{ fill: tick, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fill: tick, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            unit="°"
          />
          <Tooltip
            content={({ active, payload, label }) => (
              <ChartTooltip
                active={active}
                payload={payload as unknown as TooltipItem[] | undefined}
                label={String(label ?? '')}
                isDark={isDark}
              />
            )}
          />
          <Area
            type="monotone"
            dataKey="temp"
            name="Temp"
            stroke={tempColor}
            strokeWidth={2.5}
            fill="url(#tGrad)"
            dot={{ fill: tempColor, r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5 }}
          />
          <Area
            type="monotone"
            dataKey="feels"
            name="Feels like"
            stroke={feelsColor}
            strokeWidth={1.8}
            fill="none"
            strokeDasharray="5 3"
            dot={false}
            activeDot={{ r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="chart-legend">
        <span>
          <span className="legend-dot" style={{ background: tempColor }} />
          Temperature
        </span>
        <span>
          <span className="legend-dot legend-dashed" style={{ background: feelsColor }} />
          Feels like
        </span>
      </div>
    </div>
  )
}
