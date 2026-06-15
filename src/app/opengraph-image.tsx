import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — NYC's most trusted painters`;

export default function Og() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg,#0b1a2b 0%,#15314c 100%)",
          padding: "72px",
          color: "#faf6ef",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#16924f",
              marginRight: 20,
              display: "flex",
            }}
          />
          <div style={{ fontSize: 34, fontWeight: 700, display: "flex" }}>
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 78, fontWeight: 800, lineHeight: 1.05, display: "flex" }}>
            New York&apos;s most
          </div>
          <div style={{ fontSize: 78, fontWeight: 800, lineHeight: 1.05, display: "flex" }}>
            <span>trusted&nbsp;</span>
            <span style={{ color: "#7fd6a6" }}>painters.</span>
          </div>
          <div style={{ fontSize: 30, color: "#cdd6df", marginTop: 26, display: "flex" }}>
            Interior · Exterior · Commercial — all five boroughs
          </div>
        </div>

        <div style={{ fontSize: 26, color: "#7fd6a6", display: "flex" }}>
          Licensed &amp; insured · EPA Lead-Safe · Free estimates
        </div>
      </div>
    ),
    { ...size }
  );
}
