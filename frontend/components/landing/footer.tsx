"use client"

import { Compass, Twitter, Instagram, Linkedin } from "lucide-react"

const NAV_LINKS = ["About", "Blog", "Careers", "Contact"]

const SOCIAL = [
  { icon: Twitter, label: "Twitter" },
  { icon: Instagram, label: "Instagram" },
  { icon: Linkedin, label: "LinkedIn" },
]

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#0a0a0a",
        borderTop: "1px solid rgba(143,171,140,0.07)",
      }}
      aria-label="Site footer"
    >
      {/* Main footer row */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Logo + tagline */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Compass size={18} style={{ color: "#8fab8c" }} strokeWidth={1.5} />
            <span
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: 18,
                color: "#fff",
                letterSpacing: 3,
              }}
            >
              TRAVELOOP
            </span>
          </div>
          <p style={{ fontSize: 12, color: "#555", fontFamily: "var(--font-sans)" }}>
            Wander further. Discover deeper.
          </p>
        </div>

        {/* Nav links */}
        <nav className="flex items-center gap-6" aria-label="Footer navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="transition-colors duration-200"
              style={{ fontSize: 12, color: "#555", fontFamily: "var(--font-sans)", textDecoration: "none" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#8fab8c")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#555")}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Social icons */}
        <div className="flex items-center gap-4" aria-label="Social media links">
          {SOCIAL.map(({ icon: Icon, label }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="transition-colors duration-200"
              style={{ color: "#555" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#8fab8c")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#555")}
            >
              <Icon size={16} strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </div>

      {/* Bottom line */}
      <div
        style={{ borderTop: "1px solid #141414" }}
        className="px-6 py-4 flex justify-center"
      >
        <p style={{ fontSize: 11, color: "#333", fontFamily: "var(--font-sans)" }}>
          &copy; 2025 Traveloop. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
