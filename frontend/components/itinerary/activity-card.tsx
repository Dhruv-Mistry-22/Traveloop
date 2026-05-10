"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, Pencil, Trash2, Bed, UtensilsCrossed, Plane, MapPin } from "lucide-react"
import type { Activity, ActivityCategory } from "@/lib/itinerary-types"

const CATEGORY_META: Record<
  ActivityCategory,
  { icon: React.ReactNode; bg: string; color: string }
> = {
  hotel: {
    icon: <Bed size={16} />,
    bg: "rgba(59,130,246,0.15)",
    color: "#3b82f6",
  },
  food: {
    icon: <UtensilsCrossed size={16} />,
    bg: "rgba(249,115,22,0.15)",
    color: "#f97316",
  },
  flight: {
    icon: <Plane size={16} />,
    bg: "rgba(143,171,140,0.15)",
    color: "#8fab8c",
  },
  activity: {
    icon: <MapPin size={16} />,
    bg: "rgba(168,85,247,0.15)",
    color: "#a855f7",
  },
}

interface Props {
  activity: Activity
  onEdit: (activity: Activity) => void
  onDelete: (id: string) => void
}

export default function ActivityCard({ activity, onEdit, onDelete }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: activity.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const meta = CATEGORY_META[activity.category]

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 rounded-xl px-4 py-3.5 transition-colors"
      {...attributes}
      aria-label={activity.name}
      role="listitem"
      data-dragging={isDragging}
      {...{
        style: {
          ...style,
          backgroundColor: isDragging ? "#1e1e1e" : "#1a1a1a",
          border: isDragging ? "1px solid #8fab8c" : "1px solid #222",
          borderRadius: 10,
          opacity: isDragging ? 0.85 : 1,
        },
      }}
    >
      {/* Drag handle */}
      <button
        className="cursor-grab active:cursor-grabbing shrink-0 touch-none"
        style={{ color: "#333" }}
        aria-label="Drag to reorder"
        {...listeners}
      >
        <GripVertical size={16} />
      </button>

      {/* Category icon */}
      <div
        className="shrink-0 flex items-center justify-center rounded-full"
        style={{
          width: 36,
          height: 36,
          backgroundColor: meta.bg,
          color: meta.color,
        }}
      >
        {meta.icon}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="font-sans text-sm font-semibold text-white truncate leading-snug">
          {activity.name}
        </p>
        <p className="font-sans mt-0.5" style={{ fontSize: "11px", color: "#555" }}>
          {activity.time} &middot; {activity.duration}
        </p>
      </div>

      {/* Cost */}
      <span
        className="shrink-0 font-sans"
        style={{
          fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
          fontSize: "16px",
          color: "#8fab8c",
          letterSpacing: "0.03em",
        }}
      >
        ₹{activity.cost.toLocaleString()}
      </span>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0 ml-1">
        <button
          onClick={() => onEdit(activity)}
          aria-label={`Edit ${activity.name}`}
          className="transition-colors p-1 rounded"
          style={{ color: "#444" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#8fab8c")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#444")}
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={() => onDelete(activity.id)}
          aria-label={`Delete ${activity.name}`}
          className="transition-colors p-1 rounded"
          style={{ color: "#444" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#c0392b")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#444")}
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  )
}
