"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Check, ArrowLeft, ArrowRight } from "lucide-react"
import StepDetails, { type TripDetailsData } from "./step-details"
import StepCities, { type CityItem } from "./step-cities"
import StepBudget, { type BudgetData } from "./step-budget"

const STEPS = ["Trip Details", "Add Cities", "Set Budget"] as const

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 w-full max-w-xs mx-auto mb-10">
      {STEPS.map((label, i) => {
        const done = i < current
        const active = i === current

        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            {/* Dot */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className="flex items-center justify-center rounded-full transition-all"
                style={{
                  width: 28,
                  height: 28,
                  backgroundColor: done ? "#0e1a0e" : active ? "#8fab8c" : "#1e1e1e",
                  border: done
                    ? "1.5px solid #8fab8c"
                    : active
                    ? "none"
                    : "1.5px solid #2a2a2a",
                }}
              >
                {done ? (
                  <Check size={13} strokeWidth={2.5} style={{ color: "#8fab8c" }} />
                ) : (
                  <span
                    className="font-sans font-semibold"
                    style={{
                      fontSize: "11px",
                      color: active ? "#0a1200" : "#444",
                      lineHeight: 1,
                    }}
                  >
                    {i + 1}
                  </span>
                )}
              </div>
              <span
                className="font-sans whitespace-nowrap"
                style={{
                  fontSize: "11px",
                  color: active || done ? "#8fab8c" : "#444",
                }}
              >
                {label}
              </span>
            </div>

            {/* Connector */}
            {i < STEPS.length - 1 && (
              <div
                className="flex-1 h-px mx-1.5 mt-[-18px]"
                style={{ backgroundColor: done ? "#8fab8c" : "#2a2a2a" }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

const slideVariants = {
  enter: { x: 40, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -40, opacity: 0 },
}

export default function CreateTripWizard() {
  const [step, setStep] = useState(0)

  const [details, setDetails] = useState<TripDetailsData>({
    tripName: "",
    startDate: "",
    endDate: "",
    tripType: "",
    tripStyle: "",
    coverPhoto: null,
  })

  const [cities, setCities] = useState<CityItem[]>([])

  const [budget, setBudget] = useState<BudgetData>({
    total: "",
    currency: "INR",
    flights: 0,
    hotels: 0,
    food: 0,
    activities: 0,
    shopping: 0,
  })

  function handleCreate() {
    window.location.href = "/itinerary"
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#0f0f0f" }}
    >
      <div className="max-w-[720px] mx-auto px-8 py-10">
        {/* Back link */}
        <a
          href="/"
          className="inline-flex items-center gap-1 font-sans mb-6 transition-opacity hover:opacity-80"
          style={{ fontSize: "13px", color: "#8fab8c" }}
        >
          <ArrowLeft size={13} strokeWidth={2} />
          My Trips
        </a>

        {/* Heading */}
        <h1
          className="text-white mb-8"
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "34px",
            letterSpacing: "1.5px",
            lineHeight: 1,
          }}
        >
          PLAN A NEW TRIP
        </h1>

        {/* Step indicator */}
        <StepIndicator current={step} />

        {/* Card */}
        <div
          className="rounded-[12px] p-7 overflow-hidden"
          style={{ backgroundColor: "#1a1a1a", border: "1px solid #222" }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {step === 0 && (
                <StepDetails data={details} onChange={setDetails} />
              )}
              {step === 1 && (
                <StepCities cities={cities} onChange={setCities} />
              )}
              {step === 2 && (
                <StepBudget data={budget} onChange={setBudget} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="inline-flex items-center gap-1.5 font-sans text-sm px-5 py-2.5 rounded-md transition-opacity hover:opacity-80"
              style={{
                border: "1px solid #2a2a2a",
                color: "#888",
                backgroundColor: "transparent",
              }}
            >
              <ArrowLeft size={14} strokeWidth={2} />
              Previous
            </button>
          ) : (
            <span />
          )}

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className="inline-flex items-center gap-1.5 font-sans text-sm px-5 py-2.5 rounded-md transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "#8fab8c",
                color: "#0a1200",
                fontWeight: 600,
              }}
            >
              Next Step
              <ArrowRight size={14} strokeWidth={2} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleCreate}
              className="w-full font-sans font-bold rounded-md py-3 transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "#8fab8c",
                color: "#0a1200",
                fontFamily: "var(--font-bebas)",
                fontSize: "18px",
                letterSpacing: "1.5px",
              }}
            >
              CREATE TRIP
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
