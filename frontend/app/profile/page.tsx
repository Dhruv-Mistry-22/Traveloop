'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Pencil, MapPin } from 'lucide-react'
import AppSidebar from '@/components/app-sidebar'

interface ProfileTrip {
  id: string
  name: string
  date: string
  cities: number
  image: string
  status: 'preplanned' | 'previous'
}

const TRIPS: ProfileTrip[] = [
  {
    id: 'p1',
    name: 'Winter in Iceland',
    date: 'Dec 2026',
    cities: 2,
    image: 'https://images.unsplash.com/photo-1504109586055-75871d3ef3c8?w=800&q=80',
    status: 'preplanned',
  },
  {
    id: 'p2',
    name: 'Santorini Sunset',
    date: 'Aug 2026',
    cities: 1,
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80',
    status: 'preplanned',
  },
  {
    id: 'p3',
    name: 'Bali Wellness',
    date: 'Oct 2026',
    cities: 3,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
    status: 'preplanned',
  },
  {
    id: 'v1',
    name: 'Parisian Nights',
    date: 'Jan 2025',
    cities: 1,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    status: 'previous',
  },
  {
    id: 'v2',
    name: 'Grand Canyon Hike',
    date: 'May 2024',
    cities: 2,
    image: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=800&q=80',
    status: 'previous',
  },
  {
    id: 'v3',
    name: 'Tokyo Food Tour',
    date: 'Nov 2024',
    cities: 1,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
    status: 'previous',
  },
]

function TripCard({ trip }: { trip: ProfileTrip }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="group rounded-xl transition-all"
      style={{ 
        backgroundColor: '#1a1a1a', 
        border: '1px solid #222',
        opacity: trip.status === 'previous' ? 0.75 : 1
      }}
    >
      <div className="h-[130px] w-full overflow-hidden rounded-t-xl">
        <img
          src={trip.image}
          alt={trip.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-3.5 flex flex-col gap-1.5">
        <h3 className="font-sans text-[14px] font-semibold text-white truncate">
          {trip.name}
        </h3>
        <div className="flex items-center gap-1.5">
          <MapPin size={11} style={{ color: '#8fab8c' }} />
          <span className="font-sans text-[11px]" style={{ color: '#555' }}>
            {trip.date} • {trip.cities} {trip.cities === 1 ? 'city' : 'cities'}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

function ProfileInput({ label, id, placeholder, type = 'text' }: { label: string, id: string, placeholder: string, type?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-sans text-xs" style={{ color: '#555' }}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none font-sans pb-2 text-white placeholder:text-[#333] text-sm"
        style={{ borderBottom: '1.5px solid #2a2a2a' }}
        onFocus={(e) => e.currentTarget.style.borderColor = '#8fab8c'}
        onBlur={(e) => e.currentTarget.style.borderColor = '#2a2a2a'}
      />
    </div>
  )
}

export default function UserProfilePage() {
  const preplanned = TRIPS.filter(t => t.status === 'preplanned')
  const previous = TRIPS.filter(t => t.status === 'previous')

  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <AppSidebar />
      
      <main className="flex-1 p-10 overflow-x-hidden">
        {/* TOP SECTION */}
        <section 
          className="p-7 rounded-[12px] flex flex-col gap-8"
          style={{ backgroundColor: '#1a1a1a', border: '1px solid #222' }}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <div className="relative group cursor-pointer">
                <div 
                  className="w-[110px] h-[110px] rounded-full flex items-center justify-center overflow-hidden"
                  style={{ backgroundColor: '#0e1a0e' }}
                >
                  <span 
                    className="tracking-widest"
                    style={{ fontFamily: 'var(--font-bebas)', fontSize: '32px', color: '#8fab8c' }}
                  >
                    RS
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Pencil size={24} style={{ color: '#8fab8c' }} />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <h1 
                  className="text-white tracking-wide"
                  style={{ fontFamily: 'var(--font-bebas)', fontSize: '34px', lineHeight: 1 }}
                >
                  Rahul Sharma
                </h1>
                <p className="font-sans text-[13px]" style={{ color: '#555' }}>
                  rahul@traveloop.app
                </p>
              </div>
            </div>

            <button 
              className="px-5 py-2 rounded-md font-sans text-[13px] font-medium transition-opacity hover:opacity-80"
              style={{ border: '1.5px solid #8fab8c', color: '#8fab8c' }}
            >
              Edit Profile
            </button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-5">
            {[
              { label: 'Total Trips', value: '12' },
              { label: 'Cities Visited', value: '48' },
              { label: 'Total Spent', value: '₹3.2L' },
            ].map((stat) => (
              <div 
                key={stat.label}
                className="p-4 px-6 rounded-lg flex flex-col gap-1"
                style={{ backgroundColor: '#111', border: '1px solid #1e1e1e' }}
              >
                <span 
                  className="tracking-wider"
                  style={{ fontFamily: 'var(--font-bebas)', fontSize: '28px', color: '#8fab8c', lineHeight: 1 }}
                >
                  {stat.value}
                </span>
                <span className="font-sans text-[11px]" style={{ color: '#555' }}>
                  {stat.label.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* PERSONAL DETAILS CARD */}
        <section 
          className="mt-6 p-6 rounded-[12px] flex flex-col gap-6"
          style={{ backgroundColor: '#1a1a1a', border: '1px solid #222' }}
        >
          <h2 
            className="tracking-wider"
            style={{ fontFamily: 'var(--font-bebas)', fontSize: '18px', color: '#8fab8c' }}
          >
            PERSONAL DETAILS
          </h2>

          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              <ProfileInput label="First Name" id="firstName" placeholder="Rahul" />
              <ProfileInput label="Last Name" id="lastName" placeholder="Sharma" />
              <ProfileInput label="Email Address" id="email" type="email" placeholder="rahul@traveloop.app" />
              <ProfileInput label="Phone Number" id="phone" type="tel" placeholder="+91 98765 43210" />
              <ProfileInput label="City" id="city" placeholder="Mumbai" />
              <ProfileInput label="Country" id="country" placeholder="India" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="bio" className="font-sans text-xs" style={{ color: '#555' }}>
                Additional Information
              </label>
              <textarea
                id="bio"
                rows={3}
                placeholder="Adventurer at heart, looking for the next mountain to climb."
                className="w-full bg-transparent outline-none font-sans pb-2 text-white placeholder:text-[#333] text-sm resize-none"
                style={{ borderBottom: '1.5px solid #2a2a2a' }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#8fab8c'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#2a2a2a'}
              />
            </div>

            <button 
              type="submit"
              className="w-fit px-8 py-2.5 rounded-md font-sans text-sm font-bold transition-opacity hover:opacity-90 active:opacity-80 mt-2"
              style={{ backgroundColor: '#8fab8c', color: '#0a1200' }}
            >
              SAVE CHANGES
            </button>
          </form>
        </section>

        {/* PREPLANNED TRIPS */}
        <section className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 
              className="text-white tracking-wider"
              style={{ fontFamily: 'var(--font-bebas)', fontSize: '20px' }}
            >
              PREPLANNED TRIPS
            </h2>
            <button className="font-sans text-[12px]" style={{ color: '#8fab8c' }}>
              View All →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {preplanned.map(trip => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </section>

        {/* PREVIOUS TRIPS */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 
              className="text-white tracking-wider"
              style={{ fontFamily: 'var(--font-bebas)', fontSize: '20px' }}
            >
              PREVIOUS TRIPS
            </h2>
            <button className="font-sans text-[12px]" style={{ color: '#8fab8c' }}>
              View All →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {previous.map(trip => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
