"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const DESTINATIONS = [
  {
    city: "Bali",
    country: "Indonesia",
    badge: "Budget",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
  },
  {
    city: "Tuscany",
    country: "Italy",
    badge: "Moderate",
    image: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=600&q=80",
  },
  {
    city: "Maldives",
    country: "Indian Ocean",
    badge: "Luxury",
    image: "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=600&q=80",
  },
  {
    city: "Patagonia",
    country: "Argentina",
    badge: "Moderate",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80",
  },
]

function DestCard({ dest, index }: { dest: (typeof DESTINATIONS)[0]; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
      className="relative rounded-xl overflow-hidden cursor-pointer"
      style={{
        aspectRatio: "3/4",
        border: "1px solid transparent",
        transition: "border-color 300ms, box-shadow 300ms",
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLElement).style.borderColor = "#8fab8c"
        ;(e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(143,171,140,0.12)"
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLElement).style.borderColor = "transparent"
        ;(e.currentTarget as HTMLElement).style.boxShadow = "none"
      }}
    >
      {/* Photo */}
      <img
        src={dest.image}
        alt={`${dest.city}, ${dest.country}`}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)",
        }}
      />

      {/* Badge */}
      <div className="absolute top-3 right-3">
        <span
          className="px-2.5 py-1 rounded-full"
          style={{
            backgroundColor: "rgba(15,15,15,0.75)",
            border: "1px solid rgba(143,171,140,0.3)",
            color: "#8fab8c",
            fontSize: 10,
            fontFamily: "var(--font-sans)",
            letterSpacing: 0.5,
          }}
        >
          {dest.badge}
        </span>
      </div>

      {/* City / country */}
      <div className="absolute bottom-4 left-4">
        <p
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: 22,
            color: "#fff",
            lineHeight: 1,
          }}
        >
          {dest.city}
        </p>
        <p style={{ fontSize: 11, color: "#aaa", fontFamily: "var(--font-sans)", marginTop: 2 }}>
          {dest.country}
        </p>
      </div>
    </motion.article>
  )
}

export default function Destinations() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      ref={ref}
      style={{ backgroundColor: "#0f0f0f", padding: "5rem 2rem" }}
      aria-labelledby="destinations-heading"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-12"
        >
          <h2
            id="destinations-heading"
            style={{ fontFamily: "var(--font-bebas)", fontSize: 34, color: "#fff", letterSpacing: 1 }}
          >
            TOP REGIONAL SELECTIONS
          </h2>
          <p style={{ fontSize: 13, color: "#555", fontFamily: "var(--font-sans)", marginTop: 6 }}>
            Handpicked destinations for every traveler
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {DESTINATIONS.map((dest, i) => (
            <DestCard key={dest.city} dest={dest} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
