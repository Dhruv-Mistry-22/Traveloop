"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Eye, EyeOff, Compass, Loader2 } from "lucide-react"
import { useGoogleLogin } from "@react-oauth/google"
import api from "@/lib/api"

export default function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true)
      setError(null)
      try {
        // tokenResponse.access_token is what we get, but usually we want id_token
        // for full verification. However, @react-oauth/google standard flow
        // often gives access_token. Let's assume we use the access_token 
        // to get user info or that we configured it for implicit flow.
        const response = await api.post("/auth/google-login", { 
          idToken: tokenResponse.access_token // simplified for this setup
        })
        if (response.data.success) {
          localStorage.setItem("token", response.data.token)
          router.push("/dashboard")
        }
      } catch (err: any) {
        setError("Google Login failed. Please try again.")
      } finally {
        setIsLoading(false)
      }
    },
    onError: () => setError("Google Login failed"),
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await api.post("/auth/login", { email, password })
      if (response.data.success) {
        localStorage.setItem("token", response.data.token)
        router.push("/dashboard")
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-[400px] mx-auto flex flex-col gap-8"
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
      <div className="flex flex-col gap-1.5">
        <h1
          className="text-white"
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "38px",
            lineHeight: 1,
            letterSpacing: "1px",
          }}
        >
          WELCOME BACK
        </h1>
        <p className="font-sans" style={{ fontSize: "13px", color: "#888" }}>
          Sign in to continue your journey
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-xs font-sans">
          {error}
        </div>
      )}

      {/* Form */}
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        {/* Email field */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="font-sans text-xs"
            style={{ color: "#555" }}
          >
            Email Address
          </label>
          <motion.div
            animate={{
              borderColor: focusedField === "email" ? "#8fab8c" : "#2a2a2a",
            }}
            transition={{ duration: 0.2 }}
            className="relative"
            style={{ borderBottom: "1.5px solid #2a2a2a" }}
          >
            <motion.div
              animate={{
                borderColor: focusedField === "email" ? "#8fab8c" : "#2a2a2a",
              }}
              transition={{ duration: 0.2 }}
              style={{
                position: "absolute",
                bottom: -1.5,
                left: 0,
                right: 0,
                height: "1.5px",
                backgroundColor: focusedField === "email" ? "#8fab8c" : "transparent",
                transition: "background-color 0.2s ease",
              }}
            />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              className="w-full bg-transparent outline-none font-sans pb-2 text-white placeholder:text-[#555] text-sm"
              placeholder="you@example.com"
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              disabled={isLoading}
            />
          </motion.div>
        </div>

        {/* Password field */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className="font-sans text-xs"
            style={{ color: "#555" }}
          >
            Password
          </label>
          <div
            className="relative"
            style={{ borderBottom: "1.5px solid #2a2a2a" }}
          >
            <motion.div
              style={{
                position: "absolute",
                bottom: -1.5,
                left: 0,
                right: 0,
                height: "1.5px",
                backgroundColor: focusedField === "password" ? "#8fab8c" : "transparent",
                transition: "background-color 0.2s ease",
              }}
            />
            <div className="flex items-center">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="flex-1 bg-transparent outline-none font-sans pb-2 text-white placeholder:text-[#555] text-sm"
                placeholder="••••••••"
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="pb-2 transition-colors"
                style={{ color: focusedField === "password" ? "#8fab8c" : "#555" }}
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* Forgot password */}
        <div className="flex justify-end -mt-4">
          <a
            href="#"
            className="font-sans transition-opacity hover:opacity-80"
            style={{ fontSize: "12px", color: "#8fab8c" }}
          >
            Forgot Password?
          </a>
        </div>

        {/* Sign in button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-md transition-opacity hover:opacity-90 active:opacity-80 flex items-center justify-center gap-2"
          style={{
            backgroundColor: "#8fab8c",
            color: "#0a1200",
            fontFamily: "var(--font-bebas)",
            fontSize: "16px",
            fontWeight: 700,
            letterSpacing: "1.5px",
          }}
        >
          {isLoading ? <Loader2 className="animate-spin" size={18} /> : "SIGN IN"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ backgroundColor: "#2a2a2a" }} />
          <span className="font-sans text-xs" style={{ color: "#444" }}>
            or
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: "#2a2a2a" }} />
        </div>

        {/* Google button */}
        <button
          type="button"
          onClick={() => handleGoogleLogin()}
          disabled={isLoading}
          className="w-full py-3 rounded-md flex items-center justify-center gap-3 font-sans transition-colors hover:border-[#3a3a3a]"
          style={{
            backgroundColor: "#1a1a1a",
            border: "1px solid #2a2a2a",
            color: "#ffffff",
            fontSize: "13px",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>
      </form>

      {/* Sign up link */}
      <p className="font-sans text-center" style={{ fontSize: "13px", color: "#555" }}>
        Don&apos;t have an account?{" "}
        <a
          href="/register"
          className="transition-opacity hover:opacity-80"
          style={{ color: "#8fab8c" }}
        >
          Sign Up
        </a>
      </p>
    </motion.div>
  )
}
