'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronDown, Check, Trash2, Plus, 
  RotateCcw, Share2 
} from 'lucide-react'
import AppSidebar from '@/components/app-sidebar'

interface ChecklistItem {
  id: string
  label: string
  packed: boolean
}

interface Category {
  id: string
  name: string
  items: ChecklistItem[]
  isOpen: boolean
}

const INITIAL_DATA: Category[] = [
  {
    id: 'c1',
    name: 'DOCUMENTS',
    isOpen: true,
    items: [
      { id: 'i1', label: 'Passport', packed: true },
      { id: 'i2', label: 'Flight Tickets', packed: true },
      { id: 'i3', label: 'Travel Insurance', packed: true },
      { id: 'i4', label: 'Hotel confirmation', packed: false },
    ]
  },
  {
    id: 'c2',
    name: 'CLOTHING',
    isOpen: true,
    items: [
      { id: 'i5', label: 'Casual Shirts', packed: true },
      { id: 'i6', label: 'Trousers', packed: false },
      { id: 'i7', label: 'Walking shoes', packed: false },
      { id: 'i8', label: 'Light jacket', packed: false },
    ]
  },
  {
    id: 'c3',
    name: 'ELECTRONICS',
    isOpen: true,
    items: [
      { id: 'i9', label: 'Phone charger', packed: true },
      { id: 'i10', label: 'Power adapter', packed: false },
      { id: 'i11', label: 'Earphones', packed: false },
    ]
  }
]

export default function ChecklistPage() {
  const [categories, setCategories] = useState<Category[]>(INITIAL_DATA)

  const toggleItem = (catId: string, itemId: string) => {
    setCategories(categories.map(cat => {
      if (cat.id === catId) {
        return {
          ...cat,
          items: cat.items.map(item => 
            item.id === itemId ? { ...item, packed: !item.packed } : item
          )
        }
      }
      return cat
    }))
  }

  const toggleCategory = (catId: string) => {
    setCategories(categories.map(cat => 
      cat.id === catId ? { ...cat, isOpen: !cat.isOpen } : cat
    ))
  }

  const totalItems = categories.reduce((acc, cat) => acc + cat.items.length, 0)
  const totalPacked = categories.reduce((acc, cat) => acc + cat.items.filter(i => i.packed).length, 0)
  const overallProgress = Math.round((totalPacked / totalItems) * 100) || 0

  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <AppSidebar />
      
      <main className="flex-1 p-10 flex justify-center overflow-x-hidden">
        <div className="w-full max-w-[760px]">
          {/* TOP SECTION */}
          <header className="mb-10">
            <h1 
              className="text-white tracking-widest leading-none mb-2"
              style={{ fontFamily: 'var(--font-bebas)', fontSize: '34px' }}
            >
              PACKING CHECKLIST
            </h1>
            <p className="font-sans text-[14px]" style={{ color: '#555' }}>
              Paris & Rome Adventure
            </p>

            {/* Overall Progress */}
            <div className="mt-8">
              <div className="flex justify-between items-end mb-2.5">
                <span className="font-sans text-[12px]" style={{ color: '#888' }}>
                  {totalPacked} of {totalItems} items packed
                </span>
                <span 
                  className="font-sans text-[12px] font-bold" 
                  style={{ color: '#8fab8c' }}
                >
                  {overallProgress}%
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full" style={{ backgroundColor: '#1e1e1e' }}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${overallProgress}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full rounded-full" 
                  style={{ backgroundColor: '#8fab8c' }} 
                />
              </div>
            </div>
          </header>

          {/* CATEGORIES */}
          <div className="flex flex-col gap-6">
            {categories.map((category) => {
              const packedCount = category.items.filter(i => i.packed).length
              const isAllPacked = packedCount === category.items.length

              return (
                <div key={category.id} className="flex flex-col">
                  {/* Category Header */}
                  <div 
                    onClick={() => toggleCategory(category.id)}
                    className="flex items-center justify-between p-4 px-[16px] rounded-[10px] cursor-pointer transition-all z-10"
                    style={{ 
                      backgroundColor: '#1a1a1a', 
                      border: '1px solid #222',
                      borderRadius: category.isOpen ? '10px 10px 0 0' : '10px'
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{ rotate: category.isOpen ? 0 : -90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={18} style={{ color: '#555' }} />
                      </motion.div>
                      <h2 
                        className="tracking-widest"
                        style={{ fontFamily: 'var(--font-bebas)', fontSize: '18px', color: '#fff' }}
                      >
                        {category.name}
                      </h2>
                    </div>
                    
                    <div 
                      className="px-2.5 py-0.5 rounded-full font-sans text-[11px] font-bold tracking-wide"
                      style={{ 
                        backgroundColor: '#0e1a0e', 
                        color: '#8fab8c', 
                        border: '1px solid rgba(143,171,140,0.3)' 
                      }}
                    >
                      {packedCount}/{category.items.length}
                    </div>
                  </div>

                  {/* Expanded Items List */}
                  <AnimatePresence>
                    {category.isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-[#111] rounded-b-[10px]"
                        style={{ borderLeft: '1px solid #222', borderRight: '1px solid #222', borderBottom: '1px solid #222' }}
                      >
                        <div className="flex flex-col">
                          {category.items.map((item) => (
                            <div 
                              key={item.id}
                              className="group flex items-center justify-between p-3.5 px-[16px] transition-colors hover:bg-[#1a1a1a50]"
                              style={{ borderBottom: '1px solid #1e1e1e' }}
                            >
                              <div 
                                className="flex items-center gap-3.5 cursor-pointer"
                                onClick={() => toggleItem(category.id, item.id)}
                              >
                                {/* Checkbox */}
                                <div 
                                  className="w-[18px] h-[18px] rounded-[4px] flex items-center justify-center transition-all"
                                  style={{ 
                                    border: item.packed ? 'none' : '1.5px solid #2a2a2a',
                                    backgroundColor: item.packed ? '#8fab8c' : 'transparent'
                                  }}
                                >
                                  {item.packed && <Check size={12} strokeWidth={4} style={{ color: '#0a1200' }} />}
                                </div>
                                <span 
                                  className="font-sans text-[13px] transition-all"
                                  style={{ 
                                    color: item.packed ? '#444' : '#fff',
                                    textDecoration: item.packed ? 'line-through' : 'none'
                                  }}
                                >
                                  {item.label}
                                </span>
                              </div>
                              <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-[#c0392b]">
                                <Trash2 size={14} style={{ color: '#444' }} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

          {/* BOTTOM ACTIONS ROW */}
          <div className="mt-10 flex flex-col gap-3">
            <button 
              className="w-full py-3.5 rounded-[8px] flex items-center justify-center gap-2 font-sans text-[13px] font-medium transition-all hover:bg-[#0e1a0e]"
              style={{ border: '1.5px dashed rgba(143,171,140,0.3)', color: '#8fab8c' }}
            >
              <Plus size={16} />
              Add item
            </button>
            
            <div className="flex gap-3">
              <button 
                className="flex-1 py-2.5 rounded-md flex items-center justify-center gap-2 font-sans text-[13px] font-medium transition-opacity hover:opacity-80"
                style={{ border: '1px solid #c0392b', color: '#c0392b' }}
              >
                <RotateCcw size={14} />
                Reset All
              </button>
              <button 
                className="flex-1 py-2.5 rounded-md flex items-center justify-center gap-2 font-sans text-[13px] font-medium transition-opacity hover:opacity-80"
                style={{ border: '1px solid #8fab8c', color: '#8fab8c' }}
              >
                <Share2 size={14} />
                Share Checklist
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
