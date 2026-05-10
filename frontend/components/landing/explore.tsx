"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { MapPin } from "lucide-react"

const FLOAT_CARDS = [
  {
    place: "Amazon Rainforest",
    description: "Breathe the world's lungs deep in South America.",
  },
  {
    place: "Norwegian Fjords",
    description: "Sail through glacially carved walls of raw stone.",
  },
  {
    place: "Zhangjiajie Peaks",
    description: "Walk among the pillars that inspired Avatar.",
  },
]

export default function Explore() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ minHeight: 520 }}
      aria-labelledby="explore-heading"
    >
      {/* Background forest photo */}
      <img
        src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80"
        alt="Dense forest canopy"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0,0,0,0.70)", zIndex: 1 }}
      />

      {/* Content */}
      <div
        className="relative flex flex-col items-center gap-12 py-20 px-6"
        style={{ zIndex: 2 }}
      >
        <motion.h2
          id="explore-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(32px, 6vw, 52px)",
            color: "#fff",
            letterSpacing: 2,
          }}
        >
          EXPLORE THE NATURE WITH US
        </motion.h2>

        {/* Floating cards */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-5">
          {FLOAT_CARDS.map((card, i) => (
            <motion.article
              key={card.place}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 + i * 0.1 }}
              className="flex flex-col gap-3 p-6 rounded-xl"
              style={{
                backgroundColor: "rgba(26,26,26,0.80)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(143,171,140,0.2)",
              }}
            >
              <div className="flex items-center gap-2">
                <MapPin size={15} style={{ color: "#8fab8c", flexShrink: 0 }} strokeWidth={1.5} />
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#fff",
                  }}
                >
                  {card.place}
                </span>
              </div>
              <p style={{ fontSize: 13, color: "#888", fontFamily: "var(--font-sans)", lineHeight: 1.6 }}>
                {card.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
