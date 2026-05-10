"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { ArrowLeft, Share2, Save, Plus, ChevronRight } from "lucide-react"

import type { TripSection, Activity } from "@/lib/itinerary-types"
import { INITIAL_SECTIONS } from "@/lib/itinerary-types"
import ItinerarySidebar from "./sidebar"
import ActivityCard from "./activity-card"
import AddActivityModal from "./add-activity-modal"

let idCounter = 100

function newId() {
  return `a${++idCounter}`
}

export default function ItineraryBuilder() {
  const [sections, setSections] = useState<TripSection[]>(INITIAL_SECTIONS)
  const [activeSectionId, setActiveSectionId] = useState(INITIAL_SECTIONS[0].id)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null)
  const [prevSectionId, setPrevSectionId] = useState<string | null>(null)

  const activeSection = sections.find((s) => s.id === activeSectionId)!

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  )

  // Determine slide direction based on section order
  const sectionIndex = sections.findIndex((s) => s.id === activeSectionId)
  const prevIndex = sections.findIndex((s) => s.id === prevSectionId)
  const direction = prevSectionId === null ? 0 : sectionIndex > prevIndex ? 1 : -1

  function selectSection(id: string) {
    setPrevSectionId(activeSectionId)
    setActiveSectionId(id)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    setSections((prev) =>
      prev.map((s) => {
        if (s.id !== activeSectionId) return s
        const oldIndex = s.activities.findIndex((a) => a.id === active.id)
        const newIndex = s.activities.findIndex((a) => a.id === over.id)
        return { ...s, activities: arrayMove(s.activities, oldIndex, newIndex) }
      })
    )
  }

  const handleSaveActivity = useCallback(
    (data: Omit<Activity, "id"> & { id?: string }) => {
      setSections((prev) =>
        prev.map((s) => {
          if (s.id !== activeSectionId) return s
          if (data.id) {
            // edit
            return {
              ...s,
              activities: s.activities.map((a) =>
                a.id === data.id ? { ...a, ...data, id: a.id } : a
              ),
            }
          }
          // add
          return {
            ...s,
            activities: [...s.activities, { ...data, id: newId() }],
          }
        })
      )
    },
    [activeSectionId]
  )

  function handleDelete(activityId: string) {
    setSections((prev) =>
      prev.map((s) => {
        if (s.id !== activeSectionId) return s
        return { ...s, activities: s.activities.filter((a) => a.id !== activityId) }
      })
    )
  }

  function handleAddSection() {
    const id = `s${sections.length + 1}_${Date.now()}`
    const newSection: TripSection = {
      id,
      city: "New City",
      country: "",
      flag: "🌍",
      dateFrom: "TBD",
      dateTo: "TBD",
      budget: 0,
      activities: [],
    }
    setSections((prev) => [...prev, newSection])
    selectSection(id)
  }

  const totalCost = activeSection.activities.reduce((sum, a) => sum + a.cost, 0)

  return (
    <div className="flex flex-col" style={{ height: "100vh", backgroundColor: "#0f0f0f" }}>
      {/* TOP BAR */}
      <header
        className="flex items-center justify-between px-5 shrink-0"
        style={{
          height: 56,
          backgroundColor: "#111",
          borderBottom: "1px solid #1e1e1e",
          zIndex: 10,
        }}
      >
        {/* Left */}
        <div className="flex items-center gap-2">
          <a
            href="/"
            className="flex items-center gap-1.5 transition-opacity hover:opacity-80"
            aria-label="Back to home"
          >
            <ArrowLeft size={16} style={{ color: "#8fab8c" }} />
          </a>
          <span
            className="font-sans font-semibold text-white"
            style={{
              fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
              fontSize: 18,
              letterSpacing: "0.06em",
            }}
          >
            Europe Summer Trip
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2.5">
          {/* Progress pill */}
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full font-sans text-xs"
            style={{
              backgroundColor: "#0e1a0e",
              border: "1px solid rgba(143,171,140,0.2)",
              color: "#8fab8c",
            }}
          >
            <ChevronRight size={11} />
            Section {sectionIndex + 1} of {sections.length}
          </div>

          {/* Share */}
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-sans text-xs transition-opacity hover:opacity-80"
            style={{
              border: "1px solid #8fab8c",
              color: "#8fab8c",
              backgroundColor: "transparent",
            }}
          >
            <Share2 size={13} />
            Share
          </button>

          {/* Save */}
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-sans text-xs font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#8fab8c", color: "#0a1200" }}
          >
            <Save size={13} />
            Save
          </button>
        </div>
      </header>

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR */}
        <ItinerarySidebar
          sections={sections}
          activeSectionId={activeSectionId}
          onSelect={selectSection}
          onAddSection={handleAddSection}
        />

        {/* RIGHT PANEL */}
        <div
          className="flex-1 overflow-y-auto"
          style={{ backgroundColor: "#0f0f0f", padding: "2rem" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSectionId}
              initial={{ opacity: 0, x: direction * 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -24 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {/* Section header */}
              <div className="flex items-start justify-between mb-1 flex-wrap gap-3">
                <h1
                  className="font-sans text-white"
                  style={{
                    fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                    fontSize: 28,
                    letterSpacing: "0.05em",
                    lineHeight: 1.1,
                  }}
                >
                  Section {sectionIndex + 1} — {activeSection.city}
                </h1>

                <div className="flex items-center gap-3">
                  <span className="font-sans text-xs" style={{ color: "#555" }}>
                    {activeSection.dateFrom} – {activeSection.dateTo}
                  </span>
                  <span
                    className="font-sans text-xs px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: "#0e1a0e", color: "#8fab8c" }}
                  >
                    Budget: ₹{activeSection.budget.toLocaleString()}
                  </span>
                  <span
                    className="font-sans text-xs px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: totalCost > activeSection.budget ? "rgba(192,57,43,0.12)" : "#0e1a0e",
                      color: totalCost > activeSection.budget ? "#c0392b" : "#8fab8c",
                    }}
                  >
                    Spent: ₹{totalCost.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: 1, backgroundColor: "#1e1e1e", marginBottom: "1.5rem" }} />

              {/* Activities */}
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis]}
              >
                <SortableContext
                  items={activeSection.activities.map((a) => a.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div role="list" className="flex flex-col gap-2.5">
                    {activeSection.activities.map((activity) => (
                      <ActivityCard
                        key={activity.id}
                        activity={activity}
                        onEdit={(a) => {
                          setEditingActivity(a)
                          setModalOpen(true)
                        }}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>

              {/* Add Activity card */}
              <button
                onClick={() => {
                  setEditingActivity(null)
                  setModalOpen(true)
                }}
                className="mt-2.5 w-full flex items-center justify-center gap-2 rounded-xl py-3.5 font-sans text-sm transition-colors"
                style={{ border: "1.5px dashed rgba(143,171,140,0.3)", color: "#8fab8c" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#0e1a0e")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent")
                }
              >
                <Plus size={15} />
                Add Activity
              </button>

              {/* Add Another Section */}
              <button
                onClick={handleAddSection}
                className="mt-4 w-full py-3 rounded-xl font-sans text-sm transition-colors"
                style={{
                  border: "1px solid #8fab8c",
                  color: "#8fab8c",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#0e1a0e")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent")
                }
              >
                + Add Another Section
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Add / Edit Activity Modal */}
      <AddActivityModal
        open={modalOpen}
        initial={editingActivity}
        onClose={() => {
          setModalOpen(false)
          setEditingActivity(null)
        }}
        onSave={handleSaveActivity}
      />
    </div>
  )
}
