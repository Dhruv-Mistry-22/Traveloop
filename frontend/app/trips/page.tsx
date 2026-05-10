'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, MapPin, SlidersHorizontal, ChevronDown, Loader2 } from 'lucide-react'
import AppSidebar from '@/components/app-sidebar'
import Link from 'next/link'
import api from '@/lib/api'

interface Trip {
  id: string
  name: string
  dateRange: string
  cityCount: number
  description: string
  status: 'ongoing' | 'upcoming' | 'completed'
  image: string
}

function TripCard({ trip }: { trip: Trip }) {
  const badgeColors = {
    ongoing: { bg: '#0e1a0e', text: '#6ab04c', label: 'Ongoing' },
    upcoming: { bg: '#0e1220', text: '#5b8dee', label: 'Upcoming' },
    completed: { bg: '#222', text: '#666', label: 'Completed' },
  }

  const { bg, text, label } = badgeColors[trip.status]

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="group w-[240px] shrink-0 rounded-xl transition-all"
      style={{ 
        backgroundColor: '#1a1a1a', 
        border: '1px solid #222',
        opacity: trip.status === 'completed' ? 0.8 : 1
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#8fab8c'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#222'
      }}
    >
      <div className="h-[130px] w-full overflow-hidden rounded-t-xl">
        <img
          src={trip.image || 'https://images.unsplash.com/photo-1493246507139-91e8bef99c02?w=800&q=80'}
          alt={trip.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          style={{ opacity: trip.status === 'completed' ? 0.8 : 1 }}
        />
      </div>
      <div className="flex flex-col gap-1.5 p-3.5">
        <h3 className="font-sans text-[15px] font-semibold text-white leading-tight">
          {trip.name}
        </h3>
        
        <div className="flex items-center gap-1.5">
          <MapPin size={12} style={{ color: '#8fab8c' }} />
          <span className="font-sans text-[11px]" style={{ color: '#555' }}>
            {trip.dateRange} • {trip.cityCount} {trip.cityCount === 1 ? 'city' : 'cities'}
          </span>
        </div>

        <p className="font-sans text-[12px] line-clamp-2" style={{ color: '#666' }}>
          {trip.description}
        </p>

        <div className="mt-1">
          <span
            className="inline-flex px-2 py-0.5 rounded-full font-sans text-[10px] font-semibold tracking-wide"
            style={{ backgroundColor: bg, color: text }}
          >
            {label.toUpperCase()}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

function SectionHeader({ title, color, count }: { title: string, color: string, count: number }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <h2 
        className="font-sans tracking-wider" 
        style={{ fontFamily: 'var(--font-bebas)', fontSize: '16px', color }}
      >
        {title}
      </h2>
      <span 
        className="px-2 py-0.5 rounded-full font-sans text-[10px] font-bold"
        style={{ backgroundColor: `${color}15`, color }}
      >
        {count}
      </span>
    </div>
  )
}

export default function TripsListingPage() {
  const [trips, setTrips] = useState<Trip[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await api.get('/trips')
        if (response.data.success) {
          const mappedTrips: Trip[] = response.data.trips.map((t: any) => ({
            id: t.id,
            name: t.title,
            dateRange: `${new Date(t.startsOn).toLocaleDateString()} - ${t.endsOn ? new Date(t.endsOn).toLocaleDateString() : 'TBD'}`,
            cityCount: t._count?.stops || 0,
            description: t.description || 'No description provided.',
            status: (t.status || 'draft').toLowerCase(), 
            image: t.imageUrl || 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=800&q=80',
          }))
          setTrips(mappedTrips)
        }
      } catch (error) {
        console.error('Error fetching trips:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrips()
  }, [])

  const ongoing = trips.filter(t => t.status === 'ongoing' || t.status === 'active')
  const upcoming = trips.filter(t => t.status === 'upcoming' || t.status === 'planned' || t.status === 'draft')
  const completed = trips.filter(t => t.status === 'completed')

  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <AppSidebar />
      
      <main className="flex-1 p-10 overflow-x-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 
            className="text-white tracking-widest"
            style={{ fontFamily: 'var(--font-bebas)', fontSize: '32px' }}
          >
            MY TRIPS
          </h1>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative group">
              <Search 
                size={14} 
                className="absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-[#8fab8c]" 
                style={{ color: '#555' }}
              />
              <input
                type="text"
                placeholder="Search trips..."
                className="pl-9 pr-4 py-2 bg-[#1a1a1a] border border-[#222] rounded-full text-white font-sans text-[13px] outline-none transition-all focus:border-[#8fab8c] w-64"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3.5 py-2 bg-[#1a1a1a] border border-[#222] rounded-md font-sans text-[12px] text-[#555] transition-colors hover:text-white">
                <SlidersHorizontal size={13} />
                Filter
              </button>
              <button className="flex items-center gap-2 px-3.5 py-2 bg-[#1a1a1a] border border-[#222] rounded-md font-sans text-[12px] text-[#555] transition-colors hover:text-white">
                Sort by
                <ChevronDown size={13} />
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-[300px]">
            <Loader2 className="animate-spin text-[#8fab8c]" size={40} />
          </div>
        ) : trips.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[300px] gap-4">
            <p className="text-[#555] font-sans">You haven&apos;t created any trips yet.</p>
            <Link href="/create-trip">
              <button className="px-6 py-2 bg-[#8fab8c] text-dark font-sans font-bold rounded-md">Create Your First Trip</button>
            </Link>
          </div>
        ) : (
          <>
            {/* Ongoing Section */}
            {(ongoing.length > 0) && (
              <div className="mb-12">
                <SectionHeader title="ONGOING" color="#6ab04c" count={ongoing.length} />
                <div className="flex gap-5 overflow-x-auto pb-4 no-scrollbar">
                  {ongoing.map(trip => (
                    <TripCard key={trip.id} trip={trip} />
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Section */}
            {(upcoming.length > 0) && (
              <div className="mb-12">
                <SectionHeader title="UPCOMING" color="#5b8dee" count={upcoming.length} />
                <div className="flex gap-5 overflow-x-auto pb-4 no-scrollbar">
                  {upcoming.map(trip => (
                    <TripCard key={trip.id} trip={trip} />
                  ))}
                </div>
              </div>
            )}

            {/* Completed Section */}
            {(completed.length > 0) && (
              <div className="mb-12">
                <SectionHeader title="COMPLETED" color="#666666" count={completed.length} />
                <div className="flex gap-5 overflow-x-auto pb-4 no-scrollbar">
                  {completed.map(trip => (
                    <TripCard key={trip.id} trip={trip} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* FAB */}
        <Link href="/create-trip">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-10 right-10 w-[52px] h-[52px] rounded-full flex items-center justify-center transition-opacity hover:opacity-90 active:opacity-80"
            style={{ backgroundColor: '#8fab8c', color: '#0a1200' }}
            aria-label="Create new trip"
          >
            <Plus size={24} strokeWidth={2.5} />
          </motion.button>
        </Link>
      </main>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
