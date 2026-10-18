import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { profile } from "@/data/portfolio";

// Social preview shown when the portfolio link is shared (LinkedIn, WhatsApp, Slack…).
export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const avatar = await readFile(join(process.cwd(), "src/assets/avatar.jpg"));
  const avatarSrc = `data:image/jpeg;base64,${avatar.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: 80,
          background: "radial-gradient(circle at 85% 20%, #2a1d7a 0%, #07070b 55%)",
          color: "#f2f1ec",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 24, color: "#c6ff3d" }}>
            <div style={{ width: 12, height: 12, borderRadius: 999, background: "#c6ff3d" }} />
            Available for new opportunities
          </div>
          <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -3, lineHeight: 1, marginTop: 28 }}>{profile.name}</div>
          <div style={{ fontSize: 40, color: "#c6ff3d", marginTop: 18 }}>{profile.role}</div>
          <div style={{ fontSize: 26, color: "#8d8c96", marginTop: 28 }}>
            {`${profile.experienceYears}+ years · React · Next.js · Node.js · MongoDB · ${profile.location}`}
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={avatarSrc} width={300} height={300} alt="" style={{ borderRadius: 32, border: "2px solid rgba(255,255,255,0.15)", objectFit: "cover" }} />
      </div>
    ),
    { ...size },
  );
}
