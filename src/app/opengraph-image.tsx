import { ImageResponse } from "next/og";

export const alt = "E-Reach Marketing: Turn your online presence into real opportunities.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "white",
          background:
            "radial-gradient(circle at 15% 10%, rgba(46,107,255,0.6), transparent 50%), radial-gradient(circle at 90% 90%, rgba(63,214,255,0.35), transparent 45%), radial-gradient(circle at 60% 60%, rgba(138,99,255,0.25), transparent 50%), #03050c",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ width: 30, height: 8, borderRadius: 4, background: "#2e6bff" }} />
            <div style={{ width: 42, height: 8, borderRadius: 4, background: "#3fd6ff" }} />
            <div style={{ width: 30, height: 8, borderRadius: 4, background: "#2e6bff" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: 3 }}>E-REACH</span>
            <span style={{ fontSize: 14, letterSpacing: 8, color: "#9cadd0" }}>MARKETING</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 78, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2, maxWidth: 980 }}>
            Turn your online presence into real opportunities.
          </div>
          <div style={{ marginTop: 28, fontSize: 28, color: "#9cadd0" }}>
            Strategy · Websites · Lead generation · Creative
          </div>
        </div>
      </div>
    ),
    size,
  );
}
