"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { fetchWeatherApi } from "openmeteo"
import type { JSX } from "react/jsx-runtime"

interface WeatherData {
  current: {
    temperature: number
    weatherCode: number
    humidity: number
    precipitationProbability: number
    windSpeed: number
    feelsLike: number
  }
  daily: {
    time: string[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    weather_code: number[]
  }
}

interface WeatherWidgetProps {
  className?: string
}

const weatherIcons: Record<number, { icon: JSX.Element; label: string }> = {
  0: {
    label: "Clear",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="5" fill="#FDB813" />
        <g stroke="#FDB813" strokeWidth="2" strokeLinecap="round">
          <path d="M12 1v2M12 21v2M23 12h-2M3 12H1M20.485 3.515l-1.414 1.414M4.929 19.071l-1.414 1.414M20.485 20.485l-1.414-1.414M4.929 4.929L3.515 3.515" />
        </g>
      </svg>
    ),
  },
  1: {
    label: "Mainly Clear",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="5" fill="#FDB813" />
        <g stroke="#FDB813" strokeWidth="2" strokeLinecap="round">
          <path d="M12 1v2M12 21v2M23 12h-2M3 12H1" />
        </g>
      </svg>
    ),
  },
  2: {
    label: "Partly Cloudy",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
        <circle cx="10" cy="10" r="4" fill="#FDB813" />
        <path d="M18 14.5a3.5 3.5 0 0 1 0 7H7a4 4 0 0 1-.5-7.95" fill="#E0E7FF" stroke="#C7D2FE" strokeWidth="1.5" />
      </svg>
    ),
  },
  3: {
    label: "Overcast",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
        <path d="M18 13a4 4 0 0 1 0 8H7a5 5 0 0 1-.5-9.97" fill="#9CA3AF" stroke="#6B7280" strokeWidth="1.5" />
        <path d="M16 9a4 4 0 0 1 0 8" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="1.5" />
      </svg>
    ),
  },
  45: {
    label: "Foggy",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
        <g stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round">
          <path d="M4 12h16M4 16h16M4 20h12" opacity="0.7" />
        </g>
      </svg>
    ),
  },
  48: {
    label: "Foggy",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
        <g stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round">
          <path d="M4 12h16M4 16h16M4 20h12" opacity="0.7" />
        </g>
      </svg>
    ),
  },
  51: {
    label: "Light Drizzle",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
        <path d="M18 13a4 4 0 0 1 0 8H7a5 5 0 0 1-.5-9.97" fill="#93C5FD" stroke="#60A5FA" strokeWidth="1.5" />
        <g stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round">
          <path d="M8 19v3M12 19v3M16 19v3M10 16v2M14 16v2" />
        </g>
      </svg>
    ),
  },
  61: {
    label: "Rain",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
        <path d="M18 13a4 4 0 0 1 0 8H7a5 5 0 0 1-.5-9.97" fill="#60A5FA" stroke="#3B82F6" strokeWidth="1.5" />
        <g stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round">
          <path d="M8 19v3M12 19v3M16 19v3M10 16v2M14 16v2" />
        </g>
      </svg>
    ),
  },
  71: {
    label: "Snow",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
        <path d="M18 13a4 4 0 0 1 0 8H7a5 5 0 0 1-.5-9.97" fill="#E0E7FF" stroke="#C7D2FE" strokeWidth="1.5" />
        <g fill="#DBEAFE">
          <circle cx="8" cy="19" r="1.5" />
          <circle cx="12" cy="20" r="1.5" />
          <circle cx="16" cy="19" r="1.5" />
        </g>
      </svg>
    ),
  },
  95: {
    label: "Thunderstorm",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
        <path d="M18 13a4 4 0 0 1 0 8H7a5 5 0 0 1-.5-9.97" fill="#6B7280" stroke="#4B5563" strokeWidth="1.5" />
        <path d="M13 14l-2 4h2l-2 4" stroke="#FDB813" strokeWidth="2" fill="#FDB813" />
      </svg>
    ),
  },
}

function getWeatherIcon(code: number) {
  if (code in weatherIcons) return weatherIcons[code]
  if (code >= 80 && code <= 82) return weatherIcons[61] // Rain showers
  if (code >= 71 && code <= 77) return weatherIcons[71] // Snow
  if (code >= 61 && code <= 65) return weatherIcons[61] // Rain
  if (code >= 51 && code <= 55) return weatherIcons[51] // Drizzle
  return weatherIcons[0] // Default to clear
}

export function WeatherWidget({ className }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [showForecast, setShowForecast] = useState(true)

  useEffect(() => {
    async function fetchWeather() {
      try {
        const params = {
          latitude: 43.65107,
          longitude: -79.347015,
          current: [
            "temperature_2m",
            "weather_code",
            "relative_humidity_2m",
            "apparent_temperature",
            "precipitation_probability",
            "wind_speed_10m",
          ],
          daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
          timezone: "America/Toronto",
          forecast_days: 5,
        }

        const responses = await fetchWeatherApi("https://api.open-meteo.com/v1/forecast", params)
        const response = responses[0]

        const current = response.current()!
        const daily = response.daily()!

        const weatherCodeValues = Object.values(daily.variables(0)!.valuesArray()!)
        const tempMaxValues = Object.values(daily.variables(1)!.valuesArray()!)
        const tempMinValues = Object.values(daily.variables(2)!.valuesArray()!)

        const baseTime = Number(daily.time())
        const timeArray = Array.from(
          { length: weatherCodeValues.length },
          (_, i) => new Date((baseTime + i * 86400) * 1000).toISOString().split("T")[0],
        )

        setWeather({
          current: {
            temperature: Math.round(current.variables(0)!.value()),
            weatherCode: current.variables(1)!.value(),
            humidity: Math.round(current.variables(2)!.value()),
            feelsLike: Math.round(current.variables(3)!.value()),
            precipitationProbability: Math.round(current.variables(4)!.value()),
            windSpeed: Math.round(current.variables(5)!.value()),
          },
          daily: {
            time: timeArray,
            temperature_2m_max: tempMaxValues,
            temperature_2m_min: tempMinValues,
            weather_code: weatherCodeValues,
          },
        })
      } catch (error) {
        console.error("Failed to fetch weather:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
    const interval = setInterval(fetchWeather, 600000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setShowForecast((prev) => !prev)
    }, 5000)
    return () => clearInterval(cycleInterval)
  }, [])

  if (loading) {
    return (
      <div className={cn("flex items-center justify-center h-full w-full", className)}>
        <div className="text-muted-foreground text-sm">Loading weather...</div>
      </div>
    )
  }

  if (!weather) return null

  const currentWeather = getWeatherIcon(weather.current.weatherCode)
  const forecastDays = 3

  return (
    <div className={cn("flex flex-col justify-between h-full w-full relative", className)}>
      {/* Header with current weather */}
      <div className="flex-col space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium">Toronto Weather</h2>
            <p className="text-xs text-muted-foreground">{currentWeather.label}</p>
          </div>
          <div className="w-10 h-10">{currentWeather.icon}</div>
        </div>
        
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold">{weather.current.temperature}°</span>
          <span className="text-sm text-muted-foreground">Feels like {weather.current.feelsLike}°</span>
        </div>
      </div>

      {/* Animated content area */}
      <div className="relative flex-1 min-h-0 overflow-hidden mt-3">
        {/* Forecast View */}
        <div
          className={cn(
            "absolute inset-0 transition-all duration-500 ease-in-out",
            showForecast ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none",
          )}
        >
          <div className="space-y-1.5">
            {weather.daily.time.slice(1, forecastDays + 1).map((date, index) => {
              const dayWeather = getWeatherIcon(weather.daily.weather_code[index + 1])
              const dayName = new Date(date).toLocaleDateString("en-US", { weekday: "short" })

              return (
                <div key={date} className="flex items-center justify-between text-sm">
                  <span className="w-8 text-muted-foreground">{dayName}</span>
                  <div className="w-6 h-6">{dayWeather.icon}</div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{Math.round(weather.daily.temperature_2m_max[index + 1])}°</span>
                    <span className="text-muted-foreground text-xs">
                      {Math.round(weather.daily.temperature_2m_min[index + 1])}°
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Details View */}
        <div
          className={cn(
            "absolute inset-0 transition-all duration-500 ease-in-out",
            !showForecast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
          )}
        >
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="space-y-0.5">
              <div className="text-muted-foreground text-xs">Humidity</div>
              <div className="font-semibold">{weather.current.humidity}%</div>
            </div>
            <div className="space-y-0.5">
              <div className="text-muted-foreground text-xs">Wind</div>
              <div className="font-semibold">{weather.current.windSpeed} km/h</div>
            </div>
            <div className="space-y-0.5">
              <div className="text-muted-foreground text-xs">Rain</div>
              <div className="font-semibold">{weather.current.precipitationProbability}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
