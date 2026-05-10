'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Star, ChevronDown } from 'lucide-react'
import AppSidebar from '@/components/app-sidebar'

const FILTERS = ['All', 'Adventure', 'Cultural', 'Food', 'Nature', 'Sports']

interface SearchResult {
  id: string
  name: string
  category: string
  description: string
  location: string
  price: string
  duration: string
  rating: number
  image: string
}

const RESULTS: SearchResult[] = [
  {
    id: '1',
    name: 'Tandem Paragliding Adventure',
    category: 'Adventure',
    description: 'Experience the thrill of flying over the breathtaking Interlaken valley.',
    location: 'Interlaken, Switzerland',
    price: '₹12,499',
    duration: '2-3 hours',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1596720426673-e483d73ee44d?w=200&q=80',
  },
  {
    id: '2',
    name: 'Traditional Sushi Workshop',
    category: 'Food',
    description: 'Learn the art of sushi making from a master chef in the heart of Tsukiji.',
    location: 'Tokyo, Japan',
    price: '₹6,800',
    duration: '4 hours',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=200&q=80',
  },
  {
    id: '3',
    name: 'Vatican Museums Guided Tour',
    category: 'Cultural',
    description: 'Skip the line and explore the masterpieces of the Renaissance.',
    location: 'Vatican City, Rome',
    price: '₹4,500',
    duration: '3 hours',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1543485641-c3b54c32bc01?w=200&q=80',
  },
]

const CITIES = [
  { name: 'Kyoto', country: 'Japan', cost: 'Mid-Range', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80' },
  { name: 'Santorini', country: 'Greece', cost: 'Luxury', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80' },
  { name: 'Marrakech', country: 'Morocco', cost: 'Budget-Friendly', image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=80' },
]

export default function ExplorePage() {
  const [activeFilter, setActiveFilter] = useState('All')

  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <AppSidebar />
      
      <main className="flex-1 p-10 overflow-x-hidden">
        {/* Search Bar */}
        <div className="max-w-[600px] mx-auto mb-10">
          <div 
            className="flex items-center gap-3.5 px-5 py-3.5 rounded-[10px] transition-all group"
            style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }}
          >
            <Search 
              size={18} 
              className="transition-colors group-focus-within:text-[#8fab8c]" 
              style={{ color: '#8fab8c' }} 
            />
            <input
              type="text"
              placeholder="Search Paragliding, Cities, Activities..."
              className="flex-1 bg-transparent outline-none text-white font-sans text-sm placeholder:text-[#555]"
            />
          </div>

          {/* Filter Chips */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className="px-4 py-1.5 rounded-full font-sans text-[12px] transition-all"
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
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1.5 font-sans text-[12px] text-[#555] hover:text-white transition-colors">
                Group by <ChevronDown size={12} />
              </button>
              <button className="flex items-center gap-1.5 font-sans text-[12px] text-[#555] hover:text-white transition-colors">
                Sort by <ChevronDown size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <h2 
              className="text-white tracking-wide"
              style={{ fontFamily: 'var(--font-bebas)', fontSize: '20px' }}
            >
              RESULTS
            </h2>
            <span className="font-sans text-[12px]" style={{ color: '#555' }}>(24 found)</span>
          </div>

          <div className="flex flex-col gap-2.5">
            {RESULTS.map((res) => (
              <motion.div
                key={res.id}
                whileHover={{ backgroundColor: '#1e1e1e' }}
                className="group flex items-center gap-5 p-4 rounded-[10px] transition-all"
                style={{ backgroundColor: '#1a1a1a', border: '1px solid #222' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderLeft = '2px solid #8fab8c'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderLeft = '1px solid #222'
                }}
              >
                <img 
                  src={res.image} 
                  alt={res.name} 
                  className="w-20 h-20 rounded-lg object-cover flex-shrink-0" 
                />
                
                <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-sans text-[15px] font-semibold text-white truncate">
                      {res.name}
                    </h3>
                    <span 
                      className="px-2 py-0.5 rounded-full font-sans text-[10px] tracking-wide"
                      style={{ backgroundColor: '#8fab8c18', color: '#8fab8c', border: '1px solid rgba(143,171,140,0.3)' }}
                    >
                      {res.category.toUpperCase()}
                    </span>
                  </div>
                  <p className="font-sans text-[12px] truncate" style={{ color: '#555' }}>
                    {res.description}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={12} style={{ color: '#8fab8c' }} />
                    <span className="font-sans text-[11px]" style={{ color: '#555' }}>
                      {res.location}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5 px-4">
                  <div 
                    className="tracking-wider"
                    style={{ fontFamily: 'var(--font-bebas)', fontSize: '20px', color: '#8fab8c', lineHeight: 1 }}
                  >
                    {res.price}
                  </div>
                  <span className="font-sans text-[11px]" style={{ color: '#555' }}>{res.duration}</span>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star 
                        key={s} 
                        size={12} 
                        fill={s <= res.rating ? '#8fab8c' : 'none'} 
                        style={{ color: '#8fab8c' }} 
                      />
                    ))}
                  </div>
                  <button 
                    className="mt-1 px-4 py-1 rounded-[5px] font-sans text-[12px] font-medium transition-opacity hover:opacity-80"
                    style={{ border: '1px solid #8fab8c', color: '#8fab8c' }}
                  >
                    VIEW
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <button 
              className="px-8 py-2 rounded-md font-sans text-sm font-medium transition-all hover:bg-[#8fab8c10]"
              style={{ border: '1.5px solid #8fab8c', color: '#8fab8c' }}
            >
              Load More
            </button>
          </div>
        </section>

        {/* City Cards Grid */}
        <section>
          <h2 
            className="text-white tracking-wider mb-6"
            style={{ fontFamily: 'var(--font-bebas)', fontSize: '24px' }}
          >
            EXPLORE CITIES
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CITIES.map((city) => (
              <motion.div
                key={city.name}
                whileHover={{ 
                  scale: 1.02,
                  rotateX: 4,
                  perspective: 800
                }}
                className="group rounded-xl overflow-hidden transition-all"
                style={{ backgroundColor: '#1a1a1a', border: '1px solid #222' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#8fab8c'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#222'
                }}
              >
                <div className="h-[160px] w-full overflow-hidden">
                  <img 
                    src={city.image} 
                    alt={city.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <div className="flex flex-col">
                    <h3 className="font-sans text-white tracking-wide" style={{ fontFamily: 'var(--font-bebas)', fontSize: '18px' }}>
                      {city.name}
                    </h3>
                    <span className="font-sans text-[12px]" style={{ color: '#555' }}>{city.country}</span>
                  </div>
                  <div>
                    <span 
                      className="px-3 py-1 rounded-full font-sans text-[10px] font-semibold tracking-wide"
                      style={{ backgroundColor: '#0e1a0e', color: '#8fab8c', border: '1px solid rgba(143,171,140,0.3)' }}
                    >
                      {city.cost.toUpperCase()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
