import Image from "next/image";

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
    }[];
  };
};

export default function WeatherCard({ weather }: { weather: Weather }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.10)",
      backdropFilter: "blur(28px) saturate(180%)",
      WebkitBackdropFilter: "blur(28px) saturate(180%)",
      border: "1px solid rgba(255,255,255,0.18)",
      boxShadow: "0 12px 48px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.28)",
      borderRadius: "2rem",
      padding: "2rem 1.75rem",
      width: "100%",
      fontFamily: "'DM Sans', sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "0.25rem",
    }}>
      {/* Location */}
      <p style={{
        color: "rgba(255,255,255,0.6)",
        fontSize: "0.75rem",
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        fontWeight: 500,
        marginBottom: "0.25rem"
      }}>
        📍 {weather.location.name}, {weather.location.country}
      </p>

      {/* Icon */}
      <Image
        src={`https:${weather.current.condition.icon}`}
        alt="Weather Icon"
        width={80}
        height={80}
        style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))" }}
      />

      {/* Temperature */}
      <p style={{
        fontFamily: "'DM Serif Display', serif",
        fontSize: "5.5rem",
        fontWeight: 400,
        color: "white",
        lineHeight: 1,
        letterSpacing: "-0.03em",
        textShadow: "0 4px 24px rgba(0,0,0,0.2)"
      }}>
        {weather.current.temp_c}{" "}°C
      </p>

      {/* Condition text */}
      <p style={{
        color: "rgba(255,255,255,0.75)",
        fontSize: "1rem",
        fontWeight: 400,
        letterSpacing: "0.04em",
        marginBottom: "1.25rem"
      }}>
        {weather.current.condition.text}
      </p>

      {/* Divider */}
      <div style={{
        width: "100%",
        height: "1px",
        background: "linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)",
        marginBottom: "1rem"
      }} />

      {/* Stats row */}
      <div style={{ display: "flex", gap: "2rem", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>Humidity</p>
          <p style={{ color: "white", fontSize: "1.15rem", fontWeight: 600, marginTop: "2px" }}>{weather.current.humidity}%</p>
        </div>
        <div style={{ width: "1px", background: "rgba(255,255,255,0.15)" }} />
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>Wind</p>
          <p style={{ color: "white", fontSize: "1.15rem", fontWeight: 600, marginTop: "2px" }}>{weather.current.wind_kph} <span style={{ fontSize: "0.7rem", fontWeight: 400, opacity: 0.7 }}>kph</span></p>
        </div>
      </div>
    </div>
  );
}