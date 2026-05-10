'use client'

import { Compass, Users, Globe, MapPin, DollarSign, LayoutDashboard, BarChart3, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const ADMIN_NAV = [
  { label: "Manage Users", icon: Users, href: "/dashboard" },
  { label: "Popular Cities", icon: Globe, href: "/dashboard" },
  { label: "Popular Activities", icon: MapPin, href: "/dashboard" },
  { label: "Analytics", icon: BarChart3, href: "/dashboard" },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="flex flex-col h-screen w-[240px] shrink-0 sticky top-0"
      style={{
        backgroundColor: "#111111",
        borderRight: "1px solid #1e1e1e",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5">
        <Compass size={20} style={{ color: "#8fab8c" }} strokeWidth={1.5} />
        <span
          className="tracking-widest"
          style={{
            fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
            fontSize: "20px",
            color: "#ffffff",
            letterSpacing: "0.15em",
          }}
        >
          TRAVELOOP
        </span>
      </div>

      <div style={{ height: "1px", backgroundColor: "#1e1e1e", margin: "0 20px" }} />

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 px-3 mt-4 flex-1">
        <p className="px-5 mb-2 font-sans text-[10px] font-bold text-[#444] tracking-[0.2em] uppercase">Admin Control</p>
        {ADMIN_NAV.map(({ label, icon: Icon, href }) => {
          const active = pathname === href
          return (
            <Link
              key={label}
              href={href}
              className="flex items-center gap-3 rounded-md px-3 py-2 transition-colors"
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: active ? "#8fab8c" : "#555555",
                borderLeft: active ? "2px solid #8fab8c" : "2px solid transparent",
                backgroundColor: active ? "rgba(14,26,14,0.03)" : "transparent",
                paddingLeft: active ? "10px" : "12px",
              }}
            >
              <Icon size={15} strokeWidth={active ? 2 : 1.5} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* User */}
      <div
        className="flex items-center gap-2.5 px-5 py-4"
        style={{ borderTop: "1px solid #1e1e1e" }}
      >
        <div
          className="flex items-center justify-center shrink-0 rounded-full"
          style={{ width: 36, height: 36, backgroundColor: "#0e1a0e", fontSize: "14px" }}
        >
          <span style={{ color: "#8fab8c" }}>AD</span>
        </div>
        <div className="flex flex-col min-w-0">
          <span
            className="font-sans font-medium truncate"
            style={{ fontSize: "13px", color: "#ffffff" }}
          >
            Admin Panel
          </span>
          <span
            className="font-sans truncate"
            style={{ fontSize: "11px", color: "#555555" }}
          >
            root@traveloop.app
          </span>
        </div>
      </div>
    </aside>
  )
}
