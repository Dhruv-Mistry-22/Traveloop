'use client'

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Compass, Eye, EyeOff, Loader2 } from "lucide-react"
import api from "@/lib/api"

type FocusedField =
  | "firstName"
  | "lastName"
  | "email"
  | "password"
  | "phone"
  | "city"
  | "country"
  | "additionalInfo"
  | null

function BottomBorderInput({
  id,
  type = "text",
  placeholder,
  autoComplete,
  focusedField,
  fieldName,
  value,
  onChange,
  onFocus,
  onBlur,
  disabled,
}: {
  id: string
  type?: string
  placeholder: string
  autoComplete?: string
  focusedField: FocusedField
  fieldName: FocusedField
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFocus: () => void
  onBlur: () => void
  disabled?: boolean
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
        }}
      />
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        placeholder={placeholder}
        disabled={disabled}
        required
        className="w-full bg-transparent outline-none font-sans pb-2 text-white placeholder:text-[#555] text-sm"
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  )
}

export default function RegisterForm() {
  const router = useRouter()
  const [focusedField, setFocusedField] = useState<FocusedField>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    country: "",
    additionalInfo: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const focus = (field: FocusedField) => () => setFocusedField(field)
  const blur = () => setFocusedField(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await api.post("/auth/signup", {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        password: formData.password,
        // The mock backend currently only takes name, email, password
        // but we could send the rest too
        phone: formData.phone,
        city: formData.city,
        country: formData.country,
        additionalInfo: formData.additionalInfo,
      })

      if (response.data.success) {
        router.push("/login")
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-[520px] mx-auto flex flex-col gap-7 py-10"
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Compass size={22} style={{ color: "#8fab8c" }} strokeWidth={1.5} />
        <span
          className="text-white"
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "24px",
            letterSpacing: "3px",
            lineHeight: 1,
          }}
        >
          TRAVELOOP
        </span>
      </div>

      {/* Heading */}
      <div className="flex flex-col gap-1">
        <h1
          className="text-white"
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "34px",
            lineHeight: 1,
            letterSpacing: "1px",
          }}
        >
          CREATE ACCOUNT
        </h1>
        <p className="font-sans" style={{ fontSize: "13px", color: "#888" }}>
          Start your journey today
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-xs font-sans">
          {error}
        </div>
      )}

      {/* Form */}
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {/* Row 1: First Name | Last Name */}
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="firstName" className="font-sans text-xs" style={{ color: "#555" }}>
              First Name
            </label>
            <BottomBorderInput
              id="firstName"
              placeholder="Jane"
              autoComplete="given-name"
              focusedField={focusedField}
              fieldName="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onFocus={focus("firstName")}
              onBlur={blur}
              disabled={isLoading}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="lastName" className="font-sans text-xs" style={{ color: "#555" }}>
              Last Name
            </label>
            <BottomBorderInput
              id="lastName"
              placeholder="Doe"
              autoComplete="family-name"
              focusedField={focusedField}
              fieldName="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onFocus={focus("lastName")}
              onBlur={blur}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Row 2: Email | Phone */}
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="font-sans text-xs" style={{ color: "#555" }}>
              Email Address
            </label>
            <BottomBorderInput
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              focusedField={focusedField}
              fieldName="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={focus("email")}
              onBlur={blur}
              disabled={isLoading}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="phone" className="font-sans text-xs" style={{ color: "#555" }}>
              Phone Number
            </label>
            <BottomBorderInput
              id="phone"
              type="tel"
              placeholder="+91 98765 43210"
              autoComplete="tel"
              focusedField={focusedField}
              fieldName="phone"
              value={formData.phone}
              onChange={handleChange}
              onFocus={focus("phone")}
              onBlur={blur}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Password field */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" title="Password" className="font-sans text-xs" style={{ color: "#555" }}>
            Password
          </label>
          <div className="relative" style={{ borderBottom: "1.5px solid #2a2a2a" }}>
            <motion.div
              animate={{ opacity: focusedField === "password" ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "absolute",
                bottom: -1.5,
                left: 0,
                right: 0,
                height: "1.5px",
                backgroundColor: "#8fab8c",
              }}
            />
            <div className="flex items-center">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                placeholder="••••••••"
                required
                className="flex-1 bg-transparent outline-none font-sans pb-2 text-white placeholder:text-[#555] text-sm"
                onFocus={focus("password")}
                onBlur={blur}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="pb-2 transition-colors"
                style={{ color: focusedField === "password" ? "#8fab8c" : "#555" }}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* Row 3: City | Country */}
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="city" className="font-sans text-xs" style={{ color: "#555" }}>
              City
            </label>
            <BottomBorderInput
              id="city"
              placeholder="New York"
              autoComplete="address-level2"
              focusedField={focusedField}
              fieldName="city"
              value={formData.city}
              onChange={handleChange}
              onFocus={focus("city")}
              onBlur={blur}
              disabled={isLoading}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="country" className="font-sans text-xs" style={{ color: "#555" }}>
              Country
            </label>
            <BottomBorderInput
              id="country"
              placeholder="United States"
              autoComplete="country-name"
              focusedField={focusedField}
              fieldName="country"
              value={formData.country}
              onChange={handleChange}
              onFocus={focus("country")}
              onBlur={blur}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Row 4: Additional Information */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="additionalInfo" className="font-sans text-xs" style={{ color: "#555" }}>
            Additional Information
          </label>
          <div
            className="relative"
            style={{ borderBottom: "1.5px solid #2a2a2a" }}
          >
            <motion.div
              animate={{ opacity: focusedField === "additionalInfo" ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "absolute",
                bottom: -1.5,
                left: 0,
                right: 0,
                height: "1.5px",
                backgroundColor: "#8fab8c",
              }}
            />
            <textarea
              id="additionalInfo"
              rows={3}
              placeholder="Tell us a bit about your travel interests..."
              value={formData.additionalInfo}
              onChange={handleChange}
              className="w-full bg-transparent outline-none font-sans pb-2 text-white placeholder:text-[#555] text-sm resize-none leading-relaxed"
              onFocus={focus("additionalInfo")}
              onBlur={blur}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Create Account button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-md transition-opacity hover:opacity-90 active:opacity-80 mt-1 flex items-center justify-center gap-2"
          style={{
            backgroundColor: "#8fab8c",
            color: "#0a1200",
            fontFamily: "var(--font-bebas)",
            fontSize: "16px",
            fontWeight: 700,
            letterSpacing: "1.5px",
          }}
        >
          {isLoading ? <Loader2 className="animate-spin" size={18} /> : "CREATE ACCOUNT"}
        </button>
      </form>

      {/* Sign in link */}
      <p className="font-sans text-center" style={{ fontSize: "13px", color: "#555" }}>
        Already have an account?{" "}
        <Link
          href="/login"
          className="transition-opacity hover:opacity-80"
          style={{ color: "#8fab8c" }}
        >
          Sign In
        </Link>
      </p>
    </motion.div>
  )
}
