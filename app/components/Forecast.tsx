type ForecastDay = {
  date: string;
  day: { avgtemp_c: number; condition: { text: string; icon: string } };
};

export default function Forecast({ days }: { days: ForecastDay[] }) {
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", { weekday: "short" });

  return (
    <div style={{
      background: "rgba(255,255,255,0.08)",
      backdropFilter: "blur(24px) saturate(160%)",
      WebkitBackdropFilter: "blur(24px) saturate(160%)",
      border: "1px solid rgba(255,255,255,0.14)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)",
      borderRadius: "1.5rem",
      padding: "1.25rem 1rem",
      width: "100%",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <p style={{
        color: "rgba(255,255,255,0.4)",
        fontSize: "0.65rem",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        marginBottom: "1rem",
        paddingLeft: "0.25rem"
      }}>
        3-day forecast
      </p>
      <div style={{ display: "flex", gap: "0.5rem", justifyContent: "space-between" }}>
        {days.map((d, i) => (
          <div key={i} style={{
            flex: 1,
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "1.2rem",
            padding: "0.9rem 0.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.3rem",
            transition: "background 0.2s ease",
            cursor: "default",
          }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.13)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
          >
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.72rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {formatDate(d.date)}
            </p>
            <img src={`https:${d.day.condition.icon}`} alt="" style={{ width: 36, height: 36 }} />
            <p style={{ color: "white", fontSize: "1rem", fontWeight: 600 }}>{d.day.avgtemp_c}°</p>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.62rem", textAlign: "center", lineHeight: 1.3 }}>
              {d.day.condition.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}