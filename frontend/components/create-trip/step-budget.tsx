"use client"

import { useState } from "react"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

export interface BudgetData {
  total: string
  currency: string
  flights: number
  hotels: number
  food: number
  activities: number
  shopping: number
}

const CURRENCIES = ["INR", "USD", "EUR", "GBP", "AED", "SGD", "JPY"]

const CATEGORY_COLORS: Record<string, string> = {
  Flights: "#8fab8c",
  Hotels: "#6d8f6e",
  Food: "#4e6b4f",
  Activities: "#324f33",
  Shopping: "#2a2a2a",
}

const CATEGORIES: { key: keyof Omit<BudgetData, "total" | "currency">; label: string }[] = [
  { key: "flights", label: "Flights" },
  { key: "hotels", label: "Hotels" },
  { key: "food", label: "Food" },
  { key: "activities", label: "Activities" },
  { key: "shopping", label: "Shopping" },
]

function CategorySlider({
  label,
  value,
  max,
  currency,
  onChange,
}: {
  label: string
  value: number
  max: number
  currency: string
  onChange: (v: number) => void
}) {
  const pct = max > 0 ? (value / max) * 100 : 0
  return (
    <div className="flex items-center gap-3">
      <span className="font-sans text-sm text-white w-20 shrink-0">{label}</span>
      <div className="flex-1 relative h-1.5 rounded-full" style={{ backgroundColor: "#1e1e1e" }}>
        <div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{ width: `${pct}%`, backgroundColor: "#8fab8c" }}
        />
        <input
          type="range"
          min={0}
          max={max || 100000}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label={`${label} budget`}
        />
      </div>
      <span
        className="w-20 text-right shrink-0"
        style={{ fontFamily: "var(--font-bebas)", fontSize: "16px", color: "#8fab8c" }}
      >
        {currency} {value.toLocaleString()}
      </span>
    </div>
  )
}

const RADIAN = Math.PI / 180
function CustomLabel({
  cx,
  cy,
}: {
  cx: number
  cy: number
  midAngle?: number
  innerRadius?: number
  outerRadius?: number
  percent?: number
}) {
  return (
    <>
      <text x={cx} y={cy - 6} textAnchor="middle" fill="#ffffff" fontFamily="var(--font-bebas)" fontSize={18}>
        Total
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" fill="#8fab8c" fontFamily="var(--font-bebas)" fontSize={13}>
        Budget
      </text>
    </>
  )
}

export default function StepBudget({
  data,
  onChange,
}: {
  data: BudgetData
  onChange: (d: BudgetData) => void
}) {
  const [totalFocused, setTotalFocused] = useState(false)

  const set = <K extends keyof BudgetData>(key: K, val: BudgetData[K]) =>
    onChange({ ...data, [key]: val })

  const totalNum = Number(data.total.replace(/[^0-9]/g, "")) || 0

  const chartData = CATEGORIES.map((c) => ({
    name: c.label,
    value: data[c.key] || 1,
  }))

  const totalAllocated = CATEGORIES.reduce((s, c) => s + data[c.key], 0)

  return (
    <div className="flex flex-col gap-6">
      <span
        className="text-white"
        style={{ fontFamily: "var(--font-bebas)", fontSize: "24px", letterSpacing: "1px" }}
      >
        SET YOUR BUDGET
      </span>

      {/* Total + Currency */}
      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="totalBudget" className="font-sans text-xs" style={{ color: "#555" }}>
            Total Budget
          </label>
          <div className="relative" style={{ borderBottom: "1.5px solid #2a2a2a" }}>
            <div
              className="absolute bottom-0 left-0 right-0 transition-opacity duration-200"
              style={{
                height: "1.5px",
                backgroundColor: "#8fab8c",
                opacity: totalFocused ? 1 : 0,
                bottom: "-1.5px",
              }}
            />
            <input
              id="totalBudget"
              type="number"
              placeholder="e.g. 150000"
              value={data.total}
              onChange={(e) => set("total", e.target.value)}
              onFocus={() => setTotalFocused(true)}
              onBlur={() => setTotalFocused(false)}
              className="w-full bg-transparent outline-none font-sans pb-2 text-white placeholder:text-[#555] text-sm"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="currency" className="font-sans text-xs" style={{ color: "#555" }}>
            Currency
          </label>
          <div className="relative" style={{ borderBottom: "1.5px solid #2a2a2a" }}>
            <select
              id="currency"
              value={data.currency}
              onChange={(e) => set("currency", e.target.value)}
              className="w-full bg-transparent outline-none font-sans pb-2 text-white text-sm appearance-none cursor-pointer"
              style={{ colorScheme: "dark" }}
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c} style={{ backgroundColor: "#1a1a1a" }}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Sliders + Donut */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Sliders */}
        <div className="flex flex-col gap-5">
          {CATEGORIES.map((c) => (
            <CategorySlider
              key={c.key}
              label={c.label}
              value={data[c.key]}
              max={totalNum || 100000}
              currency={data.currency}
              onChange={(v) => set(c.key, v)}
            />
          ))}
        </div>

        {/* Donut chart */}
        <div className="flex flex-col items-center gap-2">
          <div style={{ width: "100%", height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={2}
                  dataKey="value"
                  labelLine={false}
                  label={CustomLabel}
                >
                  {chartData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={CATEGORY_COLORS[entry.name] ?? "#2a2a2a"}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e1e1e",
                    border: "1px solid #2a2a2a",
                    borderRadius: "6px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12px",
                    color: "#fff",
                  }}
                  formatter={(value: number, name: string) => [
                    `${data.currency} ${value.toLocaleString()}`,
                    name,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center">
            {CATEGORIES.map((c) => (
              <div key={c.key} className="flex items-center gap-1.5">
                <div
                  className="w-2.5 h-2.5 rounded-sm"
                  style={{ backgroundColor: CATEGORY_COLORS[c.label] }}
                />
                <span className="font-sans text-xs" style={{ color: "#888" }}>{c.label}</span>
              </div>
            ))}
          </div>
          {totalNum > 0 && (
            <p className="font-sans text-xs mt-1" style={{ color: totalAllocated > totalNum ? "#e05252" : "#555" }}>
              Allocated: {data.currency} {totalAllocated.toLocaleString()} / {totalNum.toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
