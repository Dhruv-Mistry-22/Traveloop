"use client"

import type { TripSection } from "@/lib/itinerary-types"
import { Plus } from "lucide-react"

interface Props {
  sections: TripSection[]
  activeSectionId: string
  onSelect: (id: string) => void
  onAddSection: () => void
}

export default function ItinerarySidebar({
  sections,
  activeSectionId,
  onSelect,
  onAddSection,
}: Props) {
  return (
    <aside
      className="flex flex-col shrink-0 overflow-y-auto"
      style={{
        width: 300,
        backgroundColor: "#111111",
        borderRight: "1px solid #1e1e1e",
      }}
    >
      {/* Label */}
      <div className="px-4 pt-5 pb-3">
        <span
          className="font-sans font-semibold text-xs tracking-widest uppercase"
          style={{ color: "#8fab8c", letterSpacing: "0.15em" }}
        >
          Itinerary
        </span>
      </div>

      {/* Timeline */}
      <nav className="flex flex-col px-4 pb-4 flex-1">
        {sections.map((section, index) => {
          const isActive = section.id === activeSectionId
          const isLast = index === sections.length - 1

          return (
            <div key={section.id} className="relative flex gap-3">
              {/* Left: circle + connector */}
              <div className="flex flex-col items-center shrink-0" style={{ width: 28 }}>
                {/* Circle */}
                <button
                  onClick={() => onSelect(section.id)}
                  className="flex items-center justify-center rounded-full shrink-0 transition-transform hover:scale-105 z-10"
                  style={{
                    width: 28,
                    height: 28,
                    backgroundColor: "#8fab8c",
                    marginTop: 10,
                  }}
                  aria-label={`Select ${section.city}`}
                >
                  <span
                    className="font-sans font-bold text-xs"
                    style={{ color: "#0a1200", lineHeight: 1 }}
                  >
                    {index + 1}
                  </span>
                </button>
                {/* Connector line */}
                {!isLast && (
                  <div
                    className="flex-1 mt-0.5"
                    style={{ width: 1, backgroundColor: "#1e1e1e", minHeight: 24 }}
                  />
                )}
              </div>

              {/* Right: section info */}
              <button
                onClick={() => onSelect(section.id)}
                className="flex-1 text-left rounded-lg px-3 py-2.5 mb-1 transition-colors"
                style={{
                  backgroundColor: isActive ? "rgba(14,26,14,0.32)" : "transparent",
                  borderLeft: isActive ? "2px solid #8fab8c" : "2px solid transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1a1a1a"
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"
                }}
              >
                <div className="flex items-baseline justify-between gap-1">
                  <span className="font-sans text-sm font-semibold text-white leading-snug">
                    {section.flag} {section.city}
                  </span>
                  <span
                    className="font-sans shrink-0"
                    style={{
                      fontSize: "13px",
                      fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                      color: "#8fab8c",
                      letterSpacing: "0.03em",
                    }}
                  >
                    ₹{section.budget.toLocaleString()}
                  </span>
                </div>
                <span className="font-sans block mt-0.5" style={{ fontSize: "11px", color: "#555" }}>
                  {section.dateFrom} — {section.dateTo}
                </span>
              </button>
            </div>
          )
        })}

        {/* Add Section button */}
        <button
          onClick={onAddSection}
          className="mt-3 w-full flex items-center justify-center gap-2 rounded-lg py-2.5 font-sans text-sm transition-colors"
          style={{
            border: "1.5px dashed rgba(143,171,140,0.3)",
            color: "#8fab8c",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#0e1a0e")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent")
          }
        >
          <Plus size={14} />
          Add Section
        </button>
      </nav>
    </aside>
  )
}
