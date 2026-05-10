"use client"

import { useState, useEffect } from "react"
import { Compass, Search } from "lucide-react"
import Link from "next/link"

const NAV_LINKS = [
  { label: "Adventure", href: "/explore" },
  { label: "About", href: "/" },
  { label: "Blogs", href: "/community" },
  { label: "Book Now", href: "/explore" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(15,15,15,0.97)" : "rgba(15,15,15,0.90)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid #1e1e1e",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Traveloop home">
          <Compass size={20} style={{ color: "#8fab8c" }} strokeWidth={1.5} />
          <span
            className="tracking-widest"
            style={{ fontFamily: "var(--font-bebas)", fontSize: 20, color: "#fff", letterSpacing: 3 }}
          >
            TRAVELOOP
          </span>
        </Link>

        {/* Search bar */}
        <div className="flex-1 max-w-sm mx-auto relative">
          <div
            className="flex items-center gap-2 px-4 h-9 rounded-full"
            style={{ backgroundColor: "#1a1a1a", border: "1px solid #222" }}
          >
            <Search size={14} style={{ color: "#8fab8c" }} strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search destinations..."
              className="flex-1 bg-transparent outline-none"
              style={{ fontSize: 13, color: "#ccc", fontFamily: "var(--font-sans)" }}
              aria-label="Search destinations"
            />
          </div>
        </div>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-colors duration-200"
              style={{ fontSize: 13, color: "#888", fontFamily: "var(--font-sans)", textDecoration: "none" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#fff")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#888")}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Login button */}
        <Link
          href="/login"
          className="shrink-0 px-4 h-9 flex items-center rounded-md transition-colors duration-200"
          style={{
            border: "1.5px solid #8fab8c",
            color: "#8fab8c",
            fontSize: 13,
            fontFamily: "var(--font-bebas)",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLElement).style.backgroundColor = "#8fab8c18"
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLElement).style.backgroundColor = "transparent"
          }}
        >
          Login
        </Link>
      </div>
    </header>
  )
}
