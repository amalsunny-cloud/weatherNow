import Image from "next/image";

type Hour = {
  time: string;
  temp_c: number;
  condition: { icon: string; text: string };
};

export default function HourlyForecast({ hours }: { hours: Hour[] }) {
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
      marginBottom: "2rem",
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
        Hourly
      </p>

      <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto", paddingBottom: "0.25rem" }}>
        {hours.map((h, i) => (
          <div key={i} style={{
            minWidth: "4.5rem",
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "1.2rem",
            padding: "0.9rem 0.4rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.3rem",
            flexShrink: 0,
            transition: "background 0.2s ease",
            cursor: "default",
          }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.13)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
          >
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.68rem", letterSpacing: "0.04em" }}>
              {new Date(h.time).getHours()}:00
            </p>
            <Image
              src={`https:${h.condition.icon}`}
              alt={h.condition.text}
              width={34}
              height={34}
            />
            <p style={{ color: "white", fontSize: "0.9rem", fontWeight: 600 }}>{h.temp_c}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}