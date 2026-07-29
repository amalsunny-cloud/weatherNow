"use client";
import { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import HourlyForecast from "./components/HourlyForecast";
import { getWeatherBackground } from "./lib/getWeatherBackground";

export default function Home() {
  const [city, setCity] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  type Weather = {
    location: { name: string; country: string };
    current: {
      temp_c: number;
      humidity: number;
      wind_kph: number;
      condition: { text: string; icon: string };
    };
    forecast: {
      forecastday: {
        date: string;
        day: { avgtemp_c: number; condition: { text: string; icon: string } };
        hour: { time: string; temp_c: number; condition: { text: string; icon: string } }[];
      }[];
    };
  };

  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => { getLocationWeather(); }, []);

  const getWeather = async () => {
    try {
      setError("");
      setLoading(true);
      if (!city.trim()) { setError("Please enter a city"); setLoading(false); return; }
      const res = await fetch(`/api/weather?city=${city}`);
      const data = await res.json();
      if (data.error) { setError(data.error.message); setWeather(null); return; }
      setWeather(data);
    } catch {
      setError("Something went wrong!");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const getLocationWeather = () => {
  
    if (!navigator.geolocation) { setError("Geolocation not supported"); return; }
    setLoading(true);
    setError("");
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude: lat, longitude: lon } = position.coords;
        try {
          const res = await fetch(`/api/weather?city=${lat},${lon}`);
          const data = await res.json();
          if (data.error) { setError(data.error.message); setWeather(null); return; }
          setWeather(data);
        } catch { setError("Failed to fetch location weather"); setWeather(null); }
        finally { setLoading(false); }
      },
      () => { setError("Permission denied to access location."); setLoading(false); }
    );
  };

  const backgroundVideo = weather
    ? getWeatherBackground(weather.current.condition.text)
    : "/videos/default.mp4";

  return (
    <>
      {/* Background Video */}
      <video key={backgroundVideo} autoPlay loop muted
        className="fixed top-0 left-0 w-full h-full object-cover -z-10 scale-105"
        style={{ filter: "brightness(0.9) saturate(1.2)" }}
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      {/* Layered overlays for depth */}
      <div className="fixed inset-0 -z-10"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.35) 100%)" }}
      />
      <div className="fixed inset-0 -z-10"
        style={{ backdropFilter: "blur(10px)" }}
      />

      {/* Main UI */}
      <main className="relative flex flex-col items-center min-h-screen px-4 py-12 overflow-x-hidden"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Google Font import */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap');

          .glass-card {
            background: rgba(255,255,255,0.10);
            backdrop-filter: blur(24px) saturate(180%);
            -webkit-backdrop-filter: blur(24px) saturate(180%);
            border: 1px solid rgba(255,255,255,0.18);
            box-shadow: 0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.25);
          }

          .search-input {
            background: rgba(255,255,255,0.12);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255,255,255,0.22);
            color: white;
            outline: none;
            transition: all 0.3s ease;
          }

          .search-input::placeholder { color: rgba(255,255,255,0.5); }

          .search-input:focus {
            background: rgba(255,255,255,0.18);
            border-color: rgba(255,255,255,0.45);
            box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
          }

          .search-btn {
            background: rgba(255,255,255,0.92);
            color: #1a1a2e;
            font-weight: 600;
            letter-spacing: 0.03em;
            transition: all 0.25s ease;
            border: none;
          }

          .search-btn:hover {
            background: white;
            transform: translateY(-1px);
            box-shadow: 0 8px 24px rgba(0,0,0,0.22);
          }

          .search-btn:active { transform: translateY(0); }

          .loc-btn {
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.25);
            color: rgba(255,255,255,0.85);
            font-size: 0.78rem;
            letter-spacing: 0.06em;
            transition: all 0.25s ease;
          }

          .loc-btn:hover {
            background: rgba(255,255,255,0.18);
            color: white;
          }

          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-in { animation: fadeSlideUp 0.6s ease forwards; }
          .delay-1 { animation-delay: 0.1s; opacity: 0; }
          .delay-2 { animation-delay: 0.2s; opacity: 0; }
          .delay-3 { animation-delay: 0.35s; opacity: 0; }

          @keyframes pulse-soft {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          .loading-pulse { animation: pulse-soft 1.5s ease-in-out infinite; }
        `}</style>

        {/* Header / Search */}
        <div className="w-full max-w-md flex flex-col items-center gap-5 mb-10 animate-in">
          <div className="text-center">
            <h1 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "2.6rem",
              fontWeight: 400,
              color: "white",
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
              textShadow: "0 2px 20px rgba(0,0,0,0.3)"
            }}>
              WeatherNow
            </h1>
            <p style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: "0.8rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 400,
              marginTop: "2px"
            }}>
              Real-time forecast
            </p>
          </div>

          {/* Search row */}
          <div className="w-full flex gap-2">
            <input
              type="text"
              placeholder="Search city…"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") getWeather(); }}
              className="search-input flex-1 px-4 py-3 rounded-2xl text-sm"
            />
            <button onClick={getWeather} className="search-btn px-5 py-3 rounded-2xl text-sm whitespace-nowrap">
              Search
            </button>
          </div>

          {/* Location button */}
          <span style={{color:"white",fontSize:"0.75rem"}}>Turn on location in settings to detect with "USE MY LOCATION" automatically.</span>
          <button onClick={getLocationWeather}
            className="loc-btn w-full py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-widest"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3"/>
            </svg>
            Use my location
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center gap-3 loading-pulse">
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: "rgba(255,255,255,0.7)"
            }} />
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", letterSpacing: "0.1em" }}>
              Fetching weather…
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="glass-card px-5 py-3 rounded-2xl">
            <p style={{ color: "#ffb3b3", fontSize: "0.85rem" }}>⚠ {error}</p>
          </div>
        )}

        {/* Weather content */}
        {weather && (
          <div className="w-full max-w-md flex flex-col items-center gap-6 animate-in delay-1">
            <WeatherCard weather={weather} />
            <Forecast days={weather.forecast.forecastday} />
            <HourlyForecast hours={weather.forecast.forecastday[0].hour.slice(0, 8)} />
          </div>
        )}
      </main>
    </>
  );
}