"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"

const MOSAIC = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80",
]

export default function PerfectVacation() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      ref={ref}
      style={{ backgroundColor: "#0f0f0f", padding: "5rem 2rem" }}
      aria-labelledby="perfect-vacation-heading"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left: 2x2 mosaic */}
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-2"
        >
          {MOSAIC.map((src, i) => (
            <div key={i} className="overflow-hidden rounded-lg" style={{ aspectRatio: "4/3" }}>
              <img
                src={src}
                alt={`Travel destination ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </motion.div>

        {/* Right: copy */}
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-5"
        >
          <span
            style={{
              fontSize: 11,
              color: "#8fab8c",
              fontFamily: "var(--font-sans)",
              letterSpacing: 2.5,
              textTransform: "uppercase",
            }}
          >
            WHY TRAVELOOP
          </span>

          <div>
            <h2
              id="perfect-vacation-heading"
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(28px, 4vw, 42px)",
                color: "#fff",
                lineHeight: 1.1,
              }}
            >
              Your Perfect Vacation Starts Here
            </h2>
            {/* Accent underline */}
            <div
              style={{ width: 40, height: 3, backgroundColor: "#8fab8c", marginTop: 14, borderRadius: 2 }}
              aria-hidden="true"
            />
          </div>

          <p
            style={{
              fontSize: 14,
              color: "#888",
              fontFamily: "var(--font-sans)",
              lineHeight: 1.7,
              maxWidth: 420,
            }}
          >
            From snow-capped peaks to sun-drenched coastlines, we curate every detail so you can focus on
            what matters — living the experience fully and coming home with stories worth telling.
          </p>

          <Link
            href="/explore"
            className="self-start mt-2 px-7 py-3 rounded-md font-bold transition-opacity duration-200 hover:opacity-85"
            style={{
              backgroundColor: "#8fab8c",
              color: "#0a1200",
              fontSize: 14,
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Book Now
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
