"use client"

import { useState } from "react"
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { MapPin, GripVertical, X, Plus } from "lucide-react"
import { searchPlaces } from "@/lib/city-data"

export interface CityItem {
  id: string
  name: string
  country: string
  flag: string
  arrival: string
  departure: string
}

const SUGGESTED = [
  { name: "Tokyo", country: "Japan", flag: "🇯🇵" },
  { name: "Paris", country: "France", flag: "🇫🇷" },
  { name: "Bali", country: "Indonesia", flag: "🇮🇩" },
  { name: "New York", country: "USA", flag: "🇺🇸" },
  { name: "Goa", country: "India", flag: "🇮🇳" },
  { name: "Dubai", country: "UAE", flag: "🇦🇪" },
]

function SortableCity({
  city,
  onRemove,
  onDateChange,
}: {
  city: CityItem
  onRemove: (id: string) => void
  onDateChange: (id: string, field: "arrival" | "departure", val: string) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: city.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-start gap-3 p-3 rounded-lg"
      css-border={isDragging ? "#8fab8c" : "#222"}
      {...{
        style: {
          ...style,
          backgroundColor: "#111",
          border: `1px solid ${isDragging ? "#8fab8c" : "#222"}`,
          borderRadius: "8px",
        },
      }}
    >
      {/* Drag handle */}
      <button
        type="button"
        aria-label="Drag to reorder"
        className="mt-0.5 cursor-grab active:cursor-grabbing shrink-0"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={16} style={{ color: "#444" }} />
      </button>

      {/* Flag + Name + Country */}
      <div className="flex flex-col gap-3 flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-base leading-none">{city.flag}</span>
          <div className="flex flex-col">
            <span className="font-sans font-semibold text-white" style={{ fontSize: "14px" }}>
              {city.name}
            </span>
            <span className="font-sans" style={{ fontSize: "12px", color: "#555" }}>
              {city.country}
            </span>
          </div>
        </div>
        {/* Dates */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="font-sans text-xs" style={{ color: "#555" }}>Arrival</label>
            <input
              type="date"
              value={city.arrival}
              onChange={(e) => onDateChange(city.id, "arrival", e.target.value)}
              className="bg-transparent outline-none font-sans text-xs text-white border-b pb-1"
              style={{ borderColor: "#2a2a2a", colorScheme: "dark" }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-sans text-xs" style={{ color: "#555" }}>Departure</label>
            <input
              type="date"
              value={city.departure}
              onChange={(e) => onDateChange(city.id, "departure", e.target.value)}
              className="bg-transparent outline-none font-sans text-xs text-white border-b pb-1"
              style={{ borderColor: "#2a2a2a", colorScheme: "dark" }}
            />
          </div>
        </div>
      </div>

      {/* Remove */}
      <button
        type="button"
        aria-label={`Remove ${city.name}`}
        onClick={() => onRemove(city.id)}
        className="shrink-0 mt-0.5 transition-opacity hover:opacity-70"
      >
        <X size={15} style={{ color: "#555" }} />
      </button>
    </div>
  )
}

export default function StepCities({
  cities,
  onChange,
}: {
  cities: CityItem[]
  onChange: (c: CityItem[]) => void
}) {
  const [query, setQuery] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const filtered = searchPlaces(query, 8)

  function addCity(c: { name: string; country: string; flag: string }) {
    const already = cities.find((x) => x.name === c.name)
    if (already) return
    onChange([
      ...cities,
      { id: `${c.name}-${Date.now()}`, name: c.name, country: c.country, flag: c.flag, arrival: "", departure: "" },
    ])
    setQuery("")
    setShowDropdown(false)
  }

  function removeCity(id: string) {
    onChange(cities.filter((c) => c.id !== id))
  }

  function handleDateChange(id: string, field: "arrival" | "departure", val: string) {
    onChange(cities.map((c) => (c.id === id ? { ...c, [field]: val } : c)))
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = cities.findIndex((c) => c.id === active.id)
      const newIndex = cities.findIndex((c) => c.id === over.id)
      onChange(arrayMove(cities, oldIndex, newIndex))
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <span
        className="text-white"
        style={{ fontFamily: "var(--font-bebas)", fontSize: "24px", letterSpacing: "1px" }}
      >
        SELECT PLACES
      </span>

      {/* Search */}
      <div className="relative">
        <div
          className="flex items-center gap-2 px-3 py-2.5 rounded-lg"
          style={{ backgroundColor: "#1e1e1e", border: "1px solid #2a2a2a" }}
        >
          <MapPin size={15} strokeWidth={1.5} style={{ color: "#8fab8c" }} />
          <input
            type="text"
            placeholder="Search city or country..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setShowDropdown(true) }}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
            className="flex-1 bg-transparent outline-none font-sans text-sm text-white placeholder:text-[#555]"
          />
        </div>
        {showDropdown && (filtered.length > 0 || query.trim() === "") && (
          <ul
            className="absolute left-0 right-0 z-20 mt-1 rounded-lg overflow-hidden"
            style={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #2a2a2a",
              maxHeight: "260px",
              overflowY: "auto",
            }}
          >
            {query.trim() === "" && (
              <li
                className="px-3 py-1.5 font-sans text-xs"
                style={{ color: "#555", borderBottom: "1px solid #222" }}
              >
                Popular destinations
              </li>
            )}
            {(filtered.length > 0 ? filtered : SUGGESTED).map((c) => (
              <li key={`${c.name}-${c.country}`}>
                <button
                  type="button"
                  onMouseDown={() => addCity(c)}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left transition-colors hover:bg-[#0e1a0e]"
                >
                  <span className="text-base leading-none shrink-0">{c.flag}</span>
                  <div className="flex flex-col min-w-0">
                    <span className="font-sans text-sm text-white font-medium truncate">{c.name}</span>
                    <span className="font-sans text-xs" style={{ color: "#555" }}>{c.country}</span>
                  </div>
                  {"type" in c && (c as { type: string }).type === "country" && (
                    <span
                      className="ml-auto font-sans text-xs px-1.5 py-0.5 rounded shrink-0"
                      style={{ backgroundColor: "#0e1a0e", color: "#8fab8c" }}
                    >
                      Country
                    </span>
                  )}
                </button>
              </li>
            ))}
            {query.trim().length > 0 && filtered.length === 0 && (
              <li className="px-3 py-3 font-sans text-sm text-center" style={{ color: "#555" }}>
                No results for &quot;{query}&quot;
              </li>
            )}
          </ul>
        )}
      </div>

      {/* Sortable list */}
      {cities.length > 0 && (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={cities.map((c) => c.id)} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-2">
              {cities.map((city) => (
                <SortableCity
                  key={city.id}
                  city={city}
                  onRemove={removeCity}
                  onDateChange={handleDateChange}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {/* Add another city */}
      <button
        type="button"
        onClick={() => {
          setQuery("")
          setShowDropdown(false)
          const el = document.querySelector<HTMLInputElement>('input[placeholder="Search a city..."]')
          el?.focus()
        }}
        className="w-full py-3 font-sans text-sm rounded-lg transition-colors hover:bg-[#0e1a0e]"
        style={{
          border: "1.5px dashed rgba(143,171,140,0.19)",
          color: "#8fab8c",
        }}
      >
        <span className="flex items-center justify-center gap-1.5">
          <Plus size={14} strokeWidth={2} />
          Add Another City
        </span>
      </button>

      {/* Suggested places */}
      <div className="flex flex-col gap-2">
        <span className="font-sans text-xs" style={{ color: "#555" }}>Suggested Places</span>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED.map((s) => (
            <button
              key={s.name}
              type="button"
              onClick={() => addCity(s)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-sans text-xs transition-colors"
              style={{
                backgroundColor: "#1a1a1a",
                border: "1px solid #222",
                color: "#ccc",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#8fab8c")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#222")}
            >
              <span>{s.flag}</span>
              {s.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
