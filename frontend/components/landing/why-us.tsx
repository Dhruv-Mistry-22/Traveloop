"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Compass, Headphones, Users } from "lucide-react"

const CARDS = [
  {
    icon: Compass,
    title: "Expert Guided Routes",
    description:
      "Every journey is crafted by seasoned explorers who know the terrain, the culture, and the hidden gems that maps never show.",
  },
  {
    icon: Headphones,
    title: "24/7 Travel Support",
    description:
      "Whether it&apos;s a missed flight or an unexpected detour, our support team is always a message away — night or day.",
  },
  {
    icon: Users,
    title: "Community of Explorers",
    description:
      "Join thousands of like-minded adventurers who share tips, stories, and inspiration from every corner of the globe.",
  },
]

export default function WhyUs() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      ref={ref}
      style={{ backgroundColor: "#111111", padding: "5rem 2rem" }}
      aria-labelledby="why-us-heading"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <h2
            id="why-us-heading"
            style={{ fontFamily: "var(--font-bebas)", fontSize: 34, color: "#fff", letterSpacing: 1 }}
          >
            REASON FOR CHOOSING US
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CARDS.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className="flex flex-col gap-5 p-7 rounded-xl"
                style={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #222",
                }}
              >
                {/* Icon circle */}
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    backgroundColor: "#0e1a0e",
                    border: "1.5px solid rgba(143,171,140,0.3)",
                  }}
                  aria-hidden="true"
                >
                  <Icon size={20} style={{ color: "#8fab8c" }} strokeWidth={1.5} />
                </div>

                <div className="flex flex-col gap-2">
                  <h3
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#fff",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 13,
                      color: "#555",
                      lineHeight: 1.65,
                    }}
                    dangerouslySetInnerHTML={{ __html: card.description }}
                  />
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
