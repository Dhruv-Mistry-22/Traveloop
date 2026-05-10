"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Bed, UtensilsCrossed, Plane, MapPin } from "lucide-react"
import type { Activity, ActivityCategory } from "@/lib/itinerary-types"

const CATEGORIES: { value: ActivityCategory; label: string; icon: React.ReactNode }[] = [
  { value: "hotel", label: "Hotel", icon: <Bed size={15} /> },
  { value: "food", label: "Food", icon: <UtensilsCrossed size={15} /> },
  { value: "flight", label: "Flight", icon: <Plane size={15} /> },
  { value: "activity", label: "Activity", icon: <MapPin size={15} /> },
]

interface Props {
  open: boolean
  initial?: Activity | null
  onClose: () => void
  onSave: (activity: Omit<Activity, "id"> & { id?: string }) => void
}

const EMPTY = { name: "", category: "activity" as ActivityCategory, time: "", duration: "", cost: 0 }

export default function AddActivityModal({ open, initial, onClose, onSave }: Props) {
  const [form, setForm] = useState<typeof EMPTY>(
    initial
      ? { name: initial.name, category: initial.category, time: initial.time, duration: initial.duration, cost: initial.cost }
      : EMPTY
  )

  function handleSave() {
    if (!form.name.trim()) return
    onSave({ ...form, id: initial?.id })
    setForm(EMPTY)
    onClose()
  }

  const field = (label: string, child: React.ReactNode) => (
    <div className="flex flex-col gap-1.5">
      <label className="font-sans text-xs" style={{ color: "#555" }}>
        {label}
      </label>
      {child}
    </div>
  )

  const inputStyle: React.CSSProperties = {
    backgroundColor: "#111",
    border: "1px solid #2a2a2a",
    borderRadius: 8,
    color: "#fff",
    fontFamily: "var(--font-inter), sans-serif",
    fontSize: 13,
    padding: "8px 12px",
    outline: "none",
    width: "100%",
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
            style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed z-50 flex flex-col gap-5"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#141414",
              border: "1px solid #2a2a2a",
              borderRadius: 14,
              padding: "28px 28px 24px",
              width: "min(480px, calc(100vw - 32px))",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2
                className="font-sans"
                style={{
                  fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                  fontSize: 22,
                  color: "#fff",
                  letterSpacing: "0.04em",
                }}
              >
                {initial ? "Edit Activity" : "Add Activity"}
              </h2>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="p-1.5 rounded-lg transition-colors"
                style={{ color: "#555" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.color = "#fff")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.color = "#555")
                }
              >
                <X size={18} />
              </button>
            </div>

            {/* Category chips */}
            {field(
              "Category",
              <div className="flex gap-2">
                {CATEGORIES.map((cat) => {
                  const active = form.category === cat.value
                  return (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, category: cat.value }))}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-sans text-xs transition-all"
                      style={{
                        backgroundColor: active ? "#0e1a0e" : "#1a1a1a",
                        border: active ? "1px solid #8fab8c" : "1px solid #2a2a2a",
                        color: active ? "#8fab8c" : "#555",
                      }}
                    >
                      {cat.icon}
                      {cat.label}
                    </button>
                  )
                })}
              </div>
            )}

            {/* Name */}
            {field(
              "Activity Name",
              <input
                type="text"
                placeholder="e.g. Check-in at Hotel Le Marais"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                style={inputStyle}
              />
            )}

            {/* Time + Duration */}
            <div className="grid grid-cols-2 gap-3">
              {field(
                "Time",
                <input
                  type="text"
                  placeholder="e.g. 3:00 PM"
                  value={form.time}
                  onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                  style={inputStyle}
                />
              )}
              {field(
                "Duration",
                <input
                  type="text"
                  placeholder="e.g. 2 hrs"
                  value={form.duration}
                  onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
                  style={inputStyle}
                />
              )}
            </div>

            {/* Cost */}
            {field(
              "Estimated Cost (₹)",
              <input
                type="number"
                placeholder="0"
                value={form.cost === 0 ? "" : form.cost}
                onChange={(e) =>
                  setForm((f) => ({ ...f, cost: parseFloat(e.target.value) || 0 }))
                }
                style={inputStyle}
              />
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-lg font-sans text-sm transition-colors"
                style={{ border: "1px solid #2a2a2a", color: "#555" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.color = "#fff")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.color = "#555")
                }
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-2.5 rounded-lg font-sans text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#8fab8c", color: "#0a1200" }}
              >
                {initial ? "Save Changes" : "Add Activity"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
