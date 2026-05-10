'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, Edit2, Trash2, StickyNote, 
  Search, ChevronDown, Filter 
} from 'lucide-react'
import AppSidebar from '@/components/app-sidebar'

const FILTERS = ['All', 'By Day', 'By Stop']

interface Note {
  id: string
  title: string
  body: string
  day: string
  date: string
}

const INITIAL_NOTES: Note[] = [
  {
    id: '1',
    title: 'Hotel check-in details — Rome stop',
    body: 'Check in after 2pm, room 302, breakfast included 7–10am. Remember to ask for the Wi-Fi password at the desk.',
    day: 'Day 3',
    date: 'June 14 2025',
  },
  {
    id: '2',
    title: 'Colosseum tickets — pre-book required',
    body: 'Skip-the-line tickets booked for 10am entry. Print PDF from email or ensure the QR code is saved to the phone wallet.',
    day: 'Day 4',
    date: 'June 15 2025',
  },
  {
    id: '3',
    title: 'Restaurant recommendation — Trastevere',
    body: 'Da Enzo al 29 — local trattoria, book ahead, cash only, try cacio e pepe. They don\'t take reservations via email.',
    day: 'Day 4',
    date: 'June 15 2025',
  },
]

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES)
  const [activeFilter, setActiveFilter] = useState('All')

  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id))
  }

  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <AppSidebar />
      
      <main className="flex-1 p-10 flex justify-center overflow-x-hidden">
        <div className="w-full max-w-[800px]">
          {/* TOP ROW */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col">
              <h1 
                className="text-white tracking-widest leading-none mb-2"
                style={{ fontFamily: 'var(--font-bebas)', fontSize: '34px' }}
              >
                TRIP NOTES
              </h1>
              <p className="font-sans text-[13px]" style={{ color: '#555' }}>
                Paris & Rome Adventure
              </p>
            </div>
            <button 
              className="px-5 py-2.5 rounded-md font-sans text-[13px] font-bold transition-opacity hover:opacity-90 active:opacity-80"
              style={{ backgroundColor: '#8fab8c', color: '#0a1200' }}
            >
              + ADD NOTE
            </button>
          </div>

          {/* FILTER TABS */}
          <div className="flex items-center gap-2.5 mb-8">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="px-5 py-1.5 rounded-full font-sans text-[13px] font-semibold transition-all"
                style={{
                  backgroundColor: activeFilter === f ? '#8fab8c' : '#1a1a1a',
                  color: activeFilter === f ? '#0a1200' : '#555',
                  border: activeFilter === f ? 'none' : '1px solid #222'
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* NOTES LIST */}
          <div className="flex flex-col gap-3">
            <AnimatePresence initial={false}>
              {notes.length > 0 ? (
                notes.map((note) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    whileHover={{ borderLeftColor: '#8fab8c', backgroundColor: '#1e1e1e' }}
                    className="p-4 px-[18px] transition-all"
                    style={{ 
                      backgroundColor: '#1a1a1a', 
                      borderRight: '1px solid #222',
                      borderTop: '1px solid #222',
                      borderBottom: '1px solid #222',
                      borderLeft: '3px solid transparent',
                      borderRadius: '0 10px 10px 0'
                    }}
                  >
                    <h3 className="font-sans text-[15px] font-semibold text-white mb-1.5">{note.title}</h3>
                    <p className="font-sans text-[13px] leading-relaxed line-clamp-2 mb-4" style={{ color: '#666' }}>
                      {note.body}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="px-2.5 py-0.5 rounded-full font-sans text-[11px] font-bold tracking-wide"
                          style={{ 
                            backgroundColor: '#0e1a0e', 
                            color: '#8fab8c', 
                            border: '1px solid rgba(143,171,140,0.3)' 
                          }}
                        >
                          {note.day.toUpperCase()}
                        </div>
                        <span className="font-sans text-[11px]" style={{ color: '#444' }}>{note.date}</span>
                      </div>
                      
                      <div className="flex items-center gap-3.5">
                        <button className="transition-colors hover:text-[#8fab8c]">
                          <Edit2 size={15} style={{ color: '#444' }} />
                        </button>
                        <button 
                          onClick={() => deleteNote(note.id)}
                          className="transition-colors hover:text-[#c0392b]"
                        >
                          <Trash2 size={15} style={{ color: '#444' }} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                /* EMPTY STATE */
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: '#1a1a1a' }}>
                    <StickyNote size={32} style={{ color: '#2a2a2a' }} />
                  </div>
                  <h2 
                    className="tracking-widest mb-1"
                    style={{ fontFamily: 'var(--font-bebas)', fontSize: '24px', color: '#444' }}
                  >
                    No notes yet
                  </h2>
                  <p className="font-sans text-[13px] mb-8" style={{ color: '#333' }}>
                    Start journaling your adventure!
                  </p>
                  <button 
                    onClick={() => setNotes(INITIAL_NOTES)}
                    className="px-6 py-2 rounded-md font-sans text-sm font-medium transition-all hover:bg-[#8fab8c10]"
                    style={{ border: '1.5px solid #8fab8c', color: '#8fab8c' }}
                  >
                    + Add First Note
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  )
}
