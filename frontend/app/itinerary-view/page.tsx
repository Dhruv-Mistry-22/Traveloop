'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Hotel, Utensils, Plane, MapPin, 
  Wallet, PieChart as PieChartIcon, 
  BarChart3, Plus, ChevronDown 
} from 'lucide-react'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'
import AppSidebar from '@/components/app-sidebar'

const VIEWS = ['View 1', 'View 2', 'View 3']

const BAR_DATA = [
  { day: 'Day 1', amount: 4500 },
  { day: 'Day 2', amount: 3200 },
  { day: 'Day 3', amount: 2800 },
  { day: 'Day 4', amount: 1500 },
  { day: 'Day 5', amount: 4200 },
  { day: 'Day 6', amount: 1800 },
  { day: 'Day 7', amount: 0 },
]

const PIE_DATA = [
  { name: 'Flights', value: 8000 },
  { name: 'Hotels', value: 6500 },
  { name: 'Food', value: 2000 },
  { name: 'Activities', value: 1500 },
]

const COLORS = ['#8fab8c', '#3a3a3a', '#2a2a2a', '#1e1e1e']

interface ActivityCardProps {
  category: 'hotel' | 'food' | 'flight' | 'activity'
  name: string
  time: string
  duration: string
  location: string
}

function ActivityCard({ category, name, time, duration, location }: ActivityCardProps) {
  const icons: Record<string, React.ReactNode> = {
    hotel: <Hotel size={14} />,
    food: <Utensils size={14} />,
    flight: <Plane size={14} />,
    activity: <MapPin size={14} />
  }
  
  return (
    <div className="p-3.5 rounded-[10px] mb-2" style={{ backgroundColor: '#1a1a1a', border: '1px solid #222' }}>
      <div className="flex items-center gap-2.5 mb-1.5">
        <div style={{ color: '#8fab8c' }}>{icons[category]}</div>
        <span className="font-sans text-[14px] font-semibold text-white">{name}</span>
      </div>
      <div className="flex items-center gap-2 mb-1.5">
        <span className="font-sans text-[11px]" style={{ color: '#555' }}>{time}</span>
        <span className="px-1.5 py-0.5 rounded-[4px] font-sans text-[10px]" style={{ backgroundColor: '#1e1e1e', color: '#666' }}>
          {duration}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <MapPin size={11} style={{ color: '#8fab8c' }} />
        <span className="font-sans text-[11px]" style={{ color: '#555' }}>{location}</span>
      </div>
    </div>
  )
}

interface ExpenseItemProps {
  category: string
  desc: string
  amount: number
}

function ExpenseItem({ category, desc, amount }: ExpenseItemProps) {
  return (
    <div className="flex items-center justify-between py-2.5" style={{ borderBottom: '1px solid #1e1e1e' }}>
      <div className="flex items-center gap-2">
        <Wallet size={13} style={{ color: '#555' }} />
        <span className="font-sans text-[13px]" style={{ color: '#888' }}>{desc}</span>
      </div>
      <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '16px', color: '#8fab8c' }}>
        ${amount.toLocaleString()}
      </span>
    </div>
  )
}

export default function ItineraryViewPage() {
  const [activeView, setActiveView] = useState('View 1')

  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <AppSidebar />
      
      <main className="flex-1 p-10 overflow-x-hidden">
        {/* Top Tab Row */}
        <div className="flex gap-2.5 mb-10">
          {VIEWS.map(v => (
            <button
              key={v}
              onClick={() => setActiveView(v)}
              className="px-6 py-2 rounded-full font-sans text-[13px] font-semibold transition-all"
              style={{
                backgroundColor: activeView === v ? '#8fab8c' : '#1a1a1a',
                color: activeView === v ? '#0a1200' : '#555',
                border: activeView === v ? 'none' : '1px solid #222'
              }}
            >
              {v}
            </button>
          ))}
        </div>

        {/* Day Section */}
        <section className="mb-12">
          {/* Day Header */}
          <div className="flex items-center gap-3 mb-6">
            <div 
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#8fab8c', color: '#0a1200' }}
            >
              <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '14px' }}>01</span>
            </div>
            <h2 className="tracking-wide" style={{ fontFamily: 'var(--font-bebas)', fontSize: '22px', color: '#fff' }}>
              Day 1 — Paris
            </h2>
            <span className="font-sans text-[12px] ml-1" style={{ color: '#555' }}>Jun 10, 2026</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left — Activities */}
            <div>
              <ActivityCard 
                category="hotel"
                name="Check-in — Hotel Le Marais"
                time="3:00 PM"
                duration="4 nights"
                location="7 Rue des Francs Bourgeois, Paris"
              />
              <ActivityCard 
                category="activity"
                name="Eiffel Tower Sunset"
                time="7:30 PM"
                duration="2 hrs"
                location="Champ de Mars, 5 Av. Anatole France"
              />
              <ActivityCard 
                category="food"
                name="Dinner at Le Jules Verne"
                time="9:30 PM"
                duration="1.5 hrs"
                location="Eiffel Tower, 2nd Floor"
              />
            </div>

            {/* Right — Expenses */}
            <div className="flex flex-col">
              <ExpenseItem category="hotel" desc="Accommodation Deposit" amount={500} />
              <ExpenseItem category="food" desc="Lunch at Local Bakery" amount={45} />
              <ExpenseItem category="activity" desc="Tower Access Pass" amount={30} />
              <ExpenseItem category="food" desc="Gourmet Dinner" amount={180} />

              <div className="mt-4 flex items-center justify-between pt-3" style={{ borderTop: '1px solid #2a2a2a' }}>
                <span className="font-sans text-[12px]" style={{ color: '#555' }}>DAY TOTAL</span>
                <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '18px', color: '#8fab8c' }}>
                  $755
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Budget Summary Panel */}
        <section 
          className="p-7 rounded-[12px]"
          style={{ backgroundColor: '#1a1a1a', border: '1px solid #222' }}
        >
          <h2 
            className="tracking-wider mb-6"
            style={{ fontFamily: 'var(--font-bebas)', fontSize: '20px', color: '#8fab8c' }}
          >
            BUDGET SUMMARY
          </h2>

          {/* Progress Bar */}
          <div className="mb-10">
            <div className="flex justify-between items-end mb-2.5">
              <span className="font-sans text-[12px] text-white">Spent $18,000</span>
              <span className="font-sans text-[12px]" style={{ color: '#555' }}>Budget $20,000</span>
            </div>
            <div className="h-1.5 w-full rounded-full" style={{ backgroundColor: '#1e1e1e' }}>
              <div 
                className="h-full rounded-full" 
                style={{ width: '90%', backgroundColor: '#8fab8c' }} 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Bar Chart */}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={BAR_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e1e1e" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#555', fontSize: 11, fontFamily: 'Inter' }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#555', fontSize: 11, fontFamily: 'Inter' }}
                    tickFormatter={(v) => `$${v}`}
                  />
                  <Tooltip 
                    cursor={{ fill: '#1e1e1e' }}
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #222', borderRadius: 8 }}
                    itemStyle={{ color: '#8fab8c', fontSize: 12 }}
                  />
                  <Bar dataKey="amount" fill="#8fab8c" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="h-64 flex flex-col items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={PIE_DATA}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {PIE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend 
                    verticalAlign="middle" 
                    align="right" 
                    layout="vertical"
                    formatter={(v) => <span className="font-sans text-[12px]" style={{ color: '#555' }}>{v}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Add Expense Form */}
          <div 
            className="mt-8 p-6 rounded-[10px]"
            style={{ backgroundColor: '#111', border: '1px solid #1e1e1e' }}
          >
            <form className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-[11px]" style={{ color: '#555' }}>DATE</label>
                <input type="date" className="bg-transparent border-b border-[#2a2a2a] pb-1.5 outline-none font-sans text-sm text-white" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-[11px]" style={{ color: '#555' }}>CATEGORY</label>
                <div className="relative">
                  <select className="w-full bg-transparent border-b border-[#2a2a2a] pb-1.5 outline-none font-sans text-sm text-white appearance-none">
                    <option>Food</option>
                    <option>Flights</option>
                    <option>Transport</option>
                    <option>Hotels</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-0 bottom-2" style={{ color: '#555' }} />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-[11px]" style={{ color: '#555' }}>DESCRIPTION</label>
                <input type="text" placeholder="e.g. Train to Lyon" className="bg-transparent border-b border-[#2a2a2a] pb-1.5 outline-none font-sans text-sm text-white placeholder:text-[#333]" />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="font-sans text-[11px]" style={{ color: '#555' }}>AMOUNT</label>
                  <input type="number" placeholder="0.00" className="bg-transparent border-b border-[#2a2a2a] pb-1.5 outline-none font-sans text-sm text-white placeholder:text-[#333]" />
                </div>
                <button 
                  className="px-6 py-2 rounded-md font-sans text-sm font-bold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#8fab8c', color: '#0a1200' }}
                >
                  + Add
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}
