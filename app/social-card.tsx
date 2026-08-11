export const socialImageSize = { width: 1200, height: 630 };

export function SocialCard() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#0b101a",
        color: "#f2f5fa",
        padding: "72px 80px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            color: "#83e68d",
            fontSize: 26,
          }}
        >
          <span style={{ width: 46, height: 4, background: "#83e68d" }} />
          Blantyre, Malawi · Available for selected work
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
          }}
        >
          <div
            style={{
              fontSize: 86,
              lineHeight: 0.98,
              fontWeight: 700,
              letterSpacing: "-4px",
            }}
          >
            Paul Phiri
          </div>
          <div
            style={{
              marginTop: 30,
              maxWidth: 880,
              color: "#bdc7d7",
              fontSize: 38,
              lineHeight: 1.18,
            }}
          >
            Full-stack software developer building dependable web and mobile
            systems.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 58,
            paddingTop: 26,
            borderTop: "2px solid #293348",
            color: "#93a1b7",
            fontSize: 24,
          }}
        >
          <span>Web · Mobile · APIs · Integrations</span>
          <span style={{ color: "#83e68d", fontWeight: 700 }}>PP.</span>
        </div>
      </div>
    </div>
  );
}
