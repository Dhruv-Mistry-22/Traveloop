'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, Download, FileText, 
  CheckCircle2, AlertCircle 
} from 'lucide-react'
import { 
  PieChart, Pie, Cell, ResponsiveContainer 
} from 'recharts'
import AppSidebar from '@/components/app-sidebar'
import Link from 'next/link'

const TRAVELERS = [
  { name: 'James', initial: 'J' },
  { name: 'Arjun', initial: 'A' },
  { name: 'Jerry', initial: 'J' },
  { name: 'Cristina', initial: 'C' },
]

const LINE_ITEMS = [
  { id: 1, category: 'Hotel', desc: 'Hotel booking Paris', details: '3 nights', unit: '$3,000', amount: '$9,000' },
  { id: 2, category: 'Travel', desc: 'Flight DEL → PAR', details: '1 ticket', unit: '$12,000', amount: '$12,000' },
]

const PIE_DATA = [
  { name: 'Spent', value: 22000 },
]

export default function BillingPage() {
  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <AppSidebar />
      
      <main className="flex-1 p-10 overflow-x-hidden">
        {/* TOP */}
        <header className="mb-8">
          <Link href="/trips" className="flex items-center gap-2 mb-4 font-sans text-[13px] hover:opacity-80" style={{ color: '#8fab8c' }}>
            <ArrowLeft size={14} />
            Back to My Trips
          </Link>
          <h1 
            className="text-white tracking-widest leading-none mb-1.5"
            style={{ fontFamily: 'var(--font-bebas)', fontSize: '28px' }}
          >
            TRIP TO EUROPE ADVENTURE
          </h1>
          <p className="font-sans text-[13px]" style={{ color: '#555' }}>
            May 25 – Jun 05, 2025 · 4 cities · Created by James
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT COLUMN — Invoice */}
          <div className="flex-1">
            <section 
              className="p-6 rounded-[12px]"
              style={{ backgroundColor: '#1a1a1a', border: '1px solid #222' }}
            >
              {/* Invoice Header */}
              <div className="flex items-start justify-between mb-8">
                <div className="flex flex-col gap-1">
                  <h2 
                    className="tracking-wider"
                    style={{ fontFamily: 'var(--font-bebas)', fontSize: '20px', color: '#8fab8c' }}
                  >
                    INV-xyz-30290
                  </h2>
                  <span className="font-sans text-[12px]" style={{ color: '#555' }}>Generated: May 20, 2025</span>
                </div>
                <div 
                  className="px-3 py-1 rounded-full font-sans text-[11px] font-bold tracking-wide"
                  style={{ backgroundColor: '#1e1500', color: '#c9a227', border: '1px solid rgba(201,162,39,0.3)' }}
                >
                  PENDING
                </div>
              </div>

              {/* Travelers */}
              <div className="flex items-center gap-4 mb-8">
                <span className="font-sans text-[12px]" style={{ color: '#555' }}>Travelers:</span>
                <div className="flex items-center -space-x-3">
                  {TRAVELERS.map((t, i) => (
                    <div 
                      key={i}
                      title={t.name}
                      className="w-7 h-7 rounded-full flex items-center justify-center font-sans font-semibold border-2 border-[#1a1a1a]"
                      style={{ backgroundColor: '#0e1a0e', color: '#8fab8c', fontSize: '11px' }}
                    >
                      {t.initial}
                    </div>
                  ))}
                </div>
              </div>

              {/* Line Items Table */}
              <div className="flex flex-col mb-6 overflow-hidden rounded-lg">
                <div className="grid grid-cols-[40px_100px_1fr_100px_100px_100px] p-4 py-2.5 bg-[#111]" style={{ borderBottom: '1px solid #2a2a2a' }}>
                  {['#', 'Category', 'Description', 'Qty/Details', 'Unit Cost', 'Amount'].map(h => (
                    <span key={h} className="font-sans text-[11px] font-bold tracking-widest text-[#8fab8c] uppercase">
                      {h}
                    </span>
                  ))}
                </div>
                {LINE_ITEMS.map((item) => (
                  <div 
                    key={item.id} 
                    className="grid grid-cols-[40px_100px_1fr_100px_100px_100px] p-4 py-3.5 transition-colors hover:bg-[#1e1e1e]" 
                    style={{ borderBottom: '1px solid #1e1e1e' }}
                  >
                    <span className="font-sans text-[13px] text-white">{item.id}</span>
                    <span className="font-sans text-[13px] text-white">{item.category}</span>
                    <span className="font-sans text-[13px] text-white">{item.desc}</span>
                    <span className="font-sans text-[13px] text-white">{item.details}</span>
                    <span className="font-sans text-[13px] text-[#8fab8c]">{item.unit}</span>
                    <span className="font-sans text-[13px] text-[#8fab8c]">{item.amount}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="flex flex-col items-end gap-2.5 pt-4" style={{ borderTop: '1px solid #2a2a2a' }}>
                <div className="flex items-center gap-10">
                  <span className="font-sans text-[13px]" style={{ color: '#555' }}>Subtotal:</span>
                  <span className="font-sans text-[13px] text-white">$21,000</span>
                </div>
                <div className="flex items-center gap-10">
                  <span className="font-sans text-[13px]" style={{ color: '#555' }}>Tax (5%):</span>
                  <span className="font-sans text-[13px] text-white">$1,050</span>
                </div>
                <div className="flex items-center gap-10">
                  <span className="font-sans text-[13px]" style={{ color: '#555' }}>Discount:</span>
                  <span className="font-sans text-[13px]" style={{ color: '#6ab04c' }}>-$50</span>
                </div>
                <div className="w-48 h-px my-1" style={{ backgroundColor: '#2a2a2a' }} />
                <div className="flex items-center gap-10">
                  <span className="font-sans text-[13px]" style={{ color: '#555' }}>Grand Total:</span>
                  <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '26px', color: '#fff' }}>$22,000</span>
                </div>
              </div>

              {/* Actions Row */}
              <div className="mt-8 flex gap-3">
                <button 
                  className="flex items-center gap-2 px-4 py-2 rounded-md font-sans text-[12px] font-medium transition-opacity hover:opacity-80"
                  style={{ border: '1px solid #8fab8c', color: '#8fab8c' }}
                >
                  <Download size={14} />
                  Download Invoice
                </button>
                <button 
                  className="flex items-center gap-2 px-4 py-2 rounded-md font-sans text-[12px] font-medium transition-opacity hover:opacity-80"
                  style={{ border: '1px solid #8fab8c', color: '#8fab8c' }}
                >
                  <FileText size={14} />
                  Export as PDF
                </button>
                <button 
                  className="ml-auto px-6 py-2 rounded-md font-sans text-[13px] font-bold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#8fab8c', color: '#0a1200' }}
                >
                  Mark as Paid
                </button>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN — Insights */}
          <div className="w-full lg:w-[320px]">
            <section 
              className="p-6 rounded-[12px]"
              style={{ backgroundColor: '#1a1a1a', border: '1px solid #222' }}
            >
              <h2 
                className="tracking-wider mb-8"
                style={{ fontFamily: 'var(--font-bebas)', fontSize: '18px', color: '#8fab8c' }}
              >
                BUDGET INSIGHTS
              </h2>

              <div className="flex flex-col gap-6 mb-8">
                <div className="flex flex-col gap-1">
                  <span className="font-sans text-[13px]" style={{ color: '#555' }}>Total Budget</span>
                  <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '20px', color: '#fff' }}>$20,000</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-sans text-[13px]" style={{ color: '#555' }}>Total Spent</span>
                  <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '20px', color: '#c0392b' }}>$22,000</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-sans text-[13px]" style={{ color: '#555' }}>Remaining</span>
                  <span className="font-bold" style={{ fontFamily: 'var(--font-bebas)', fontSize: '20px', color: '#c0392b' }}>-$2,000</span>
                </div>
              </div>

              {/* Mini Donut Chart */}
              <div className="h-48 w-full flex items-center justify-center relative mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={PIE_DATA}
                      innerRadius={55}
                      outerRadius={70}
                      paddingAngle={0}
                      dataKey="value"
                      stroke="none"
                    >
                      <Cell fill="#c0392b" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-sans text-[14px] font-bold" style={{ color: '#c0392b' }}>110%</span>
                  <span className="font-sans text-[10px]" style={{ color: '#555' }}>SPENT</span>
                </div>
              </div>

              <Link href="/itinerary-view" className="inline-block font-sans text-[12px] hover:opacity-80" style={{ color: '#8fab8c' }}>
                View Full Budget →
              </Link>

              {/* Warning Badge */}
              <div 
                className="mt-6 flex items-center gap-2.5 p-3 rounded-full justify-center"
                style={{ backgroundColor: '#1e0a0a', border: '1px solid rgba(192,57,43,0.3)' }}
              >
                <AlertCircle size={14} style={{ color: '#c0392b' }} />
                <span className="font-sans text-[11px] font-bold tracking-tight" style={{ color: '#c0392b' }}>
                  ⚠ OVER BUDGET BY $2,000
                </span>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
