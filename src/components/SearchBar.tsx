import { useState, useEffect, useRef, KeyboardEvent } from 'react'
import { GeoSuggestion } from '../types/weather'
import { fetchSuggestions } from '../services/weatherService'

interface Props {
  onSearch: (city: string) => void
  onSearchByCoords: (lat: number, lon: number) => void
  onLocationSearch: () => void
  loading: boolean
}

function flag(code: string): string {
  return code.toUpperCase().split('').map(c => String.fromCodePoint(c.charCodeAt(0) + 127397)).join('')
}

export default function SearchBar({ onSearch, onSearchByCoords, onLocationSearch, loading }: Props) {
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState<GeoSuggestion[]>([])
  const [open, setOpen] = useState(false)
  const [activeIdx, setActiveIdx] = useState(-1)
  const [fetching, setFetching] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleChange = (v: string) => {
    setValue(v)
    setActiveIdx(-1)
    if (timer.current) clearTimeout(timer.current)
    if (v.trim().length < 2) { setSuggestions([]); setOpen(false); return }
    timer.current = setTimeout(async () => {
      setFetching(true)
      try {
        const list = await fetchSuggestions(v.trim())
        setSuggestions(list)
        setOpen(list.length > 0)
      } catch { setSuggestions([]) }
      finally { setFetching(false) }
    }, 380)
  }

  const select = (s: GeoSuggestion) => {
    setValue([s.name, s.state, s.country].filter(Boolean).join(', '))
    setSuggestions([])
    setOpen(false)
    onSearchByCoords(s.lat, s.lon)
  }

  const doSearch = () => {
    const t = value.trim()
    if (!t) return
    setOpen(false)
    onSearch(t)
  }

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!open) { if (e.key === 'Enter') doSearch(); return }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, suggestions.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)) }
    else if (e.key === 'Enter') { e.preventDefault(); if (activeIdx >= 0) select(suggestions[activeIdx]); else doSearch() }
    else if (e.key === 'Escape') setOpen(false)
  }

  return (
    <div className="search-container">
      <div className="search-bar-wrap" ref={wrapRef}>
        <div className="search-bar">
          <input
            type="text"
            value={value}
            onChange={e => handleChange(e.target.value)}
            onKeyDown={onKey}
            onFocus={() => { if (suggestions.length > 0) setOpen(true) }}
            placeholder="Search city… (e.g. Mumbai, Delhi, Pune)"
            disabled={loading}
            className="search-input"
            aria-label="City name"
            autoComplete="off"
            spellCheck={false}
          />
          <button
            onClick={doSearch}
            disabled={loading || !value.trim()}
            className="search-btn"
            aria-label="Search"
          >
            {loading || fetching ? <span className="btn-spinner" /> : '🔍'}
          </button>
        </div>

        {open && (
          <div className="suggestions-dropdown" role="listbox">
            {suggestions.map((s, i) => (
              <button
                key={`${s.lat}-${s.lon}`}
                role="option"
                aria-selected={i === activeIdx}
                className={`suggestion-item${i === activeIdx ? ' active' : ''}`}
                onClick={() => select(s)}
                onMouseEnter={() => setActiveIdx(i)}
              >
                <span className="sug-flag">{flag(s.country)}</span>
                <span className="sug-name">{s.name}</span>
                {s.state && <span className="sug-state">{s.state}</span>}
                <span className="sug-country">{s.country}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <button onClick={onLocationSearch} disabled={loading} className="location-btn">
        📍 Use My Location
      </button>
    </div>
  )
}
