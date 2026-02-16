import React from "react";

export default function FooterA() {
  return (
    <footer
      style={{
        background: "#1A0A05",
        color: "rgba(255,255,255,0.7)",
        padding: "5rem 4rem 2.5rem",
      }}
    >
      {/* <BrickWall opacity={0.12} color="#C84B31" /> */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "4rem",
            marginBottom: "5rem",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.875rem",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  background: "linear-gradient(135deg, #C84B31, #8B2E1A)",
                  borderRadius: "10px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "3px",
                  padding: "8px",
                }}
              >
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    style={{
                      background: "rgba(255,255,255,0.55)",
                      borderRadius: "2px",
                    }}
                  />
                ))}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: "white",
                  }}
                >
                  Jay Jalaram Bricks
                </div>
                <div
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "#C84B31",
                  }}
                >
                  Est. 1986 · Godhra, Gujarat
                </div>
              </div>
            </div>
            <p
              style={{
                fontSize: "0.9rem",
                lineHeight: 1.8,
                maxWidth: "280px",
                fontWeight: 300,
                color: "rgba(255,255,255,0.5)",
              }}
            >
              35 years of firing exceptional clay bricks for architects,
              engineers, and builders who refuse to settle for ordinary.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "2rem" }}>
              {["in", "fb", "ig", "yt"].map((s) => (
                <div
                  key={s}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.5)",
                    transition: "all 0.3s",
                    cursor: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(200,75,49,0.2)";
                    e.currentTarget.style.borderColor = "rgba(200,75,49,0.4)";
                    e.currentTarget.style.color = "#E8855A";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.08)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
          {[
            {
              title: "Products",
              links: [
                "Structural Clay",
                "Facing Bricks",
                "Textured Series",
                "Handmade Range",
                "Export Range",
              ],
            },
            {
              title: "Company",
              links: [
                "About Us",
                "Our History",
                "Sustainability",
                "Careers",
                "Press Kit",
              ],
            },
            {
              title: "Connect",
              links: [
                "The Brick Store",
                "Architect Portal",
                "Distributor Login",
                "Contact Us",
                "Track Order",
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <div
                style={{
                  fontSize: "0.72rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#C84B31",
                  marginBottom: "1.5rem",
                  fontWeight: 700,
                }}
              >
                {col.title}
              </div>
              {col.links.map((link) => (
                <a
                  key={link}
                  href="#"
                  style={{
                    display: "block",
                    color: "rgba(255,255,255,0.45)",
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    marginBottom: "0.8rem",
                    fontWeight: 300,
                    transition: "color 0.2s",
                    cursor: "none",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.9)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.45)")
                  }
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.25)" }}>
            © 2025 Jay Jalaram Bricks Works. All rights reserved.
          </div>
          <div style={{ display: "flex", gap: "2rem" }}>
            {["Privacy Policy", "Terms of Use", "Sitemap"].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontSize: "0.78rem",
                  color: "rgba(255,255,255,0.25)",
                  textDecoration: "none",
                  cursor: "none",
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

const BrickWall = ({ opacity = 0.06, color = "#8B4513" }) => (
  <svg
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
    }}
  >
    <defs>
      <pattern
        id={`bwall-${color.replace("#", "")}`}
        x="0"
        y="0"
        width="88"
        height="44"
        patternUnits="userSpaceOnUse"
      >
        <rect
          x="2"
          y="2"
          width="84"
          height="20"
          fill="none"
          stroke={color}
          strokeWidth="1"
          rx="2"
          opacity={opacity * 12}
        />
        <rect
          x="46"
          y="24"
          width="42"
          height="18"
          fill="none"
          stroke={color}
          strokeWidth="1"
          rx="2"
          opacity={opacity * 12}
        />
        <rect
          x="2"
          y="24"
          width="42"
          height="18"
          fill="none"
          stroke={color}
          strokeWidth="1"
          rx="2"
          opacity={opacity * 12}
        />
      </pattern>
    </defs>
    <rect
      width="100%"
      height="100%"
      fill={`url(#bwall-${color.replace("#", "")})`}
      opacity={opacity}
    />
  </svg>
);


{/* <BrickWall opacity={0.07} color="#8B4513" /> */}