"use client"

import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import Link from "next/link"

const LOCATIONS = [
  { city: "Santorini", tagline: "Greek island magic" },
  { city: "Kyoto", tagline: "Ancient Japan awaits" },
  { city: "Patagonia", tagline: "Edge of the world" },
  { city: "Marrakech", tagline: "Colours of Morocco" },
]

const SIDE_NUMBERS = ["01", "02", "03", "04"]

export default function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "100vh", minHeight: 600 }}
      aria-label="Hero section"
    >
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80"
        alt="Dramatic mountain landscape"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      />

      {/* Gradient overlay – heavy at bottom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 70%, transparent 100%)",
          zIndex: 1,
        }}
      />

      {/* Left side numbers */}
      <div
        className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6"
        style={{ zIndex: 2 }}
        aria-hidden="true"
      >
        <div style={{ width: 1, height: 60, backgroundColor: "rgba(143,171,140,0.18)" }} />
        {SIDE_NUMBERS.map((n) => (
          <span
            key={n}
            style={{ fontSize: 11, color: "#555", fontFamily: "var(--font-sans)", letterSpacing: 1 }}
          >
            {n}
          </span>
        ))}
        <div style={{ width: 1, height: 60, backgroundColor: "rgba(143,171,140,0.18)" }} />
      </div>

      {/* Center content */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-5"
        style={{ zIndex: 2 }}
      >
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span
            className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full"
            style={{
              backgroundColor: "rgba(143,171,140,0.1)",
              border: "1px solid rgba(143,171,140,0.3)",
              color: "#8fab8c",
              fontSize: 11,
              fontFamily: "var(--font-sans)",
              letterSpacing: 1.5,
            }}
          >
            ✦ ADVENTURE AWAITS
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-center text-white"
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(64px, 11vw, 120px)",
            letterSpacing: 4,
            lineHeight: 1,
          }}
        >
          TRAVELOOP
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
          style={{ fontSize: 18, color: "#888", fontFamily: "var(--font-sans)" }}
        >
          Plan Your Journey. Discover The World.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex items-center gap-4 mt-2"
        >
          <Link
            href="/create-trip"
            className="px-7 py-3 rounded-md font-bold transition-opacity duration-200 hover:opacity-85"
            style={{
              backgroundColor: "#8fab8c",
              color: "#0a1200",
              fontSize: 14,
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Start Planning
          </Link>
          <a
            href="#"
            className="px-7 py-3 rounded-md transition-colors duration-200"
            style={{
              border: "1.5px solid #8fab8c",
              color: "#8fab8c",
              fontSize: 14,
              fontFamily: "var(--font-sans)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#8fab8c18")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")}
          >
            Watch Demo
          </a>
        </motion.div>
      </div>

      {/* Bottom location strip */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          backgroundColor: "rgba(0,0,0,0.70)",
          borderTop: "1px solid #1e1e1e",
          zIndex: 3,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {LOCATIONS.map((loc) => (
            <div key={loc.city} className="flex items-start gap-2">
              <MapPin
                size={14}
                style={{ color: "#8fab8c", marginTop: 2, flexShrink: 0 }}
                strokeWidth={1.5}
              />
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: 16,
                    color: "#fff",
                    lineHeight: 1.2,
                  }}
                >
                  {loc.city}
                </p>
                <p style={{ fontSize: 11, color: "#555", fontFamily: "var(--font-sans)" }}>
                  {loc.tagline}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
