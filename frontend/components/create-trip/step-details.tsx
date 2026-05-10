"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Calendar, UploadCloud } from "lucide-react"

type FocusedField = "tripName" | "startDate" | "endDate" | null

function BottomInput({
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  focusedField,
  fieldName,
  onFocus,
  onBlur,
  icon,
}: {
  id: string
  type?: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  focusedField: FocusedField
  fieldName: FocusedField
  onFocus: () => void
  onBlur: () => void
  icon?: React.ReactNode
}) {
  const isActive = focusedField === fieldName
  return (
    <div className="relative" style={{ borderBottom: "1.5px solid #2a2a2a" }}>
      <motion.div
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{
          position: "absolute",
          bottom: -1.5,
          left: 0,
          right: 0,
          height: "1.5px",
          backgroundColor: "#8fab8c",
          zIndex: 1,
        }}
      />
      <div className="flex items-center gap-2">
        {icon && <span className="shrink-0" style={{ color: "#8fab8c" }}>{icon}</span>}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent outline-none font-sans pb-2 text-white placeholder:text-[#555] text-sm"
          style={type === "date" ? { colorScheme: "dark" } : {}}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
    </div>
  )
}

const TRIP_TYPES = ["Solo", "Couple", "Family", "Group"]
const TRIP_STYLES = ["Adventure", "Relaxation", "Cultural", "Business"]

function ChipGroup({
  options,
  value,
  onChange,
}: {
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value === opt
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(active ? "" : opt)}
            className="font-sans text-xs px-3 py-1.5 rounded-full transition-all"
            style={{
              border: `1px solid ${active ? "#8fab8c" : "#2a2a2a"}`,
              backgroundColor: active ? "#0e1a0e" : "transparent",
              color: active ? "#8fab8c" : "#888",
            }}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}

export interface TripDetailsData {
  tripName: string
  startDate: string
  endDate: string
  tripType: string
  tripStyle: string
  coverPhoto: File | null
}

export default function StepDetails({
  data,
  onChange,
}: {
  data: TripDetailsData
  onChange: (d: TripDetailsData) => void
}) {
  const [focusedField, setFocusedField] = useState<FocusedField>(null)
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const set = <K extends keyof TripDetailsData>(key: K, val: TripDetailsData[K]) =>
    onChange({ ...data, [key]: val })

  function handleFile(file: File | undefined | null) {
    if (file) set("coverPhoto", file)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Trip Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="tripName" className="font-sans text-xs" style={{ color: "#555" }}>
          Trip Name
        </label>
        <BottomInput
          id="tripName"
          placeholder="e.g. Summer in Southeast Asia"
          value={data.tripName}
          onChange={(v) => set("tripName", v)}
          focusedField={focusedField}
          fieldName="tripName"
          onFocus={() => setFocusedField("tripName")}
          onBlur={() => setFocusedField(null)}
        />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="startDate" className="font-sans text-xs" style={{ color: "#555" }}>
            Start Date
          </label>
          <BottomInput
            id="startDate"
            type="date"
            placeholder="Start date"
            value={data.startDate}
            onChange={(v) => set("startDate", v)}
            focusedField={focusedField}
            fieldName="startDate"
            onFocus={() => setFocusedField("startDate")}
            onBlur={() => setFocusedField(null)}
            icon={<Calendar size={15} strokeWidth={1.5} />}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="endDate" className="font-sans text-xs" style={{ color: "#555" }}>
            End Date
          </label>
          <BottomInput
            id="endDate"
            type="date"
            placeholder="End date"
            value={data.endDate}
            onChange={(v) => set("endDate", v)}
            focusedField={focusedField}
            fieldName="endDate"
            onFocus={() => setFocusedField("endDate")}
            onBlur={() => setFocusedField(null)}
            icon={<Calendar size={15} strokeWidth={1.5} />}
          />
        </div>
      </div>

      {/* Trip Type */}
      <div className="flex flex-col gap-2">
        <span className="font-sans text-xs" style={{ color: "#555" }}>Trip Type</span>
        <ChipGroup options={TRIP_TYPES} value={data.tripType} onChange={(v) => set("tripType", v)} />
      </div>

      {/* Trip Style */}
      <div className="flex flex-col gap-2">
        <span className="font-sans text-xs" style={{ color: "#555" }}>Trip Style</span>
        <ChipGroup options={TRIP_STYLES} value={data.tripStyle} onChange={(v) => set("tripStyle", v)} />
      </div>

      {/* Cover Photo */}
      <div className="flex flex-col gap-2">
        <span className="font-sans text-xs" style={{ color: "#555" }}>Cover Photo</span>
        <div
          role="button"
          tabIndex={0}
          aria-label="Upload cover photo"
          onClick={() => fileRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && fileRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragOver(false)
            handleFile(e.dataTransfer.files[0])
          }}
          className="flex flex-col items-center justify-center gap-2 py-8 rounded-[10px] cursor-pointer transition-colors"
          style={{
            border: `1.5px dashed ${dragOver ? "#8fab8c" : "rgba(143,171,140,0.19)"}`,
            backgroundColor: dragOver ? "#0e1a0e" : "transparent",
          }}
        >
          <UploadCloud size={26} strokeWidth={1.5} style={{ color: "#8fab8c" }} />
          {data.coverPhoto ? (
            <span className="font-sans text-xs" style={{ color: "#8fab8c" }}>
              {data.coverPhoto.name}
            </span>
          ) : (
            <span className="font-sans text-xs" style={{ color: "#555" }}>
              Drag &amp; drop or click to upload
            </span>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>
    </div>
  )
}
