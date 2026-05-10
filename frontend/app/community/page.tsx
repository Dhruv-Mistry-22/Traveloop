'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Heart, MessageCircle, Share2, Bookmark, 
  MapPin, Search, ChevronDown, Plus 
} from 'lucide-react'
import AppSidebar from '@/components/app-sidebar'

const TRENDING = [
  { city: 'Bali', count: '2.4k posts', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=100&q=80' },
  { city: 'Paris', count: '1.8k posts', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=100&q=80' },
  { city: 'Tokyo', count: '1.5k posts', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&q=80' },
  { city: 'Kyoto', count: '1.2k posts', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=100&q=80' },
  { city: 'Iceland', count: '980 posts', image: 'https://images.unsplash.com/photo-1504109586055-75871d3ef3c8?w=100&q=80' },
]

interface PostCardProps {
  name: string
  avatar: string
  location: string
  date: string
  title: string
  body: string
  images?: string[]
}

function PostCard({ name, avatar, location, date, title, body, images }: PostCardProps) {
  return (
    <motion.div 
      whileHover={{ borderColor: 'rgba(143,171,140,0.2)' }}
      className="p-[18px] rounded-[12px] mb-3.5 transition-all"
      style={{ backgroundColor: '#1a1a1a', border: '1px solid #222' }}
    >
      {/* Top Row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div 
            className="w-[38px] h-[38px] rounded-full flex items-center justify-center font-sans font-semibold"
            style={{ backgroundColor: '#0e1a0e', color: '#8fab8c', fontSize: '14px' }}
          >
            {avatar}
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-[14px] font-semibold text-white leading-tight">{name}</span>
            <div className="flex items-center mt-1">
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1e1e1e]">
                <MapPin size={10} style={{ color: '#8fab8c' }} />
                <span className="font-sans text-[10px]" style={{ color: '#555' }}>{location}</span>
              </div>
            </div>
          </div>
        </div>
        <span className="font-sans text-[11px]" style={{ color: '#333' }}>{date}</span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <h3 className="font-sans text-[16px] font-semibold text-white">{title}</h3>
        <p className="font-sans text-[13px] leading-relaxed" style={{ color: '#666' }}>
          {body}
        </p>
        
        {images && (
          <div className="grid grid-cols-2 gap-1.5 mt-2">
            {images.map((img: string, i: number) => (
              <div key={i} className="aspect-[4/3] rounded-lg overflow-hidden">
                <img src={img} alt="Post content" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions Row */}
      <div className="mt-4 pt-3 flex items-center justify-between" style={{ borderTop: '1px solid #1e1e1e' }}>
        <div className="flex items-center gap-5">
          <button className="flex items-center gap-1.5 group">
            <Heart size={16} className="transition-colors group-hover:text-[#c0392b]" style={{ color: '#444' }} />
            <span className="font-sans text-[12px] transition-colors group-hover:text-[#c0392b]" style={{ color: '#555' }}>24</span>
          </button>
          <button className="flex items-center gap-1.5 group">
            <MessageCircle size={16} className="transition-colors group-hover:text-[#8fab8c]" style={{ color: '#444' }} />
            <span className="font-sans text-[12px] transition-colors group-hover:text-[#8fab8c]" style={{ color: '#555' }}>12</span>
          </button>
          <button className="flex items-center group">
            <Share2 size={16} className="transition-colors group-hover:text-[#8fab8c]" style={{ color: '#444' }} />
          </button>
        </div>
        <button className="flex items-center group">
          <Bookmark size={16} className="transition-colors group-hover:text-[#8fab8c]" style={{ color: '#444' }} />
        </button>
      </div>
    </motion.div>
  )
}

export default function CommunityPage() {
  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <AppSidebar />
      
      <main className="flex-1 p-10 flex gap-10 overflow-x-hidden">
        {/* Feed Column */}
        <div className="flex-1 max-w-[700px]">
          {/* Top Row */}
          <div className="flex items-center justify-between mb-8">
            <h1 
              className="text-white tracking-widest"
              style={{ fontFamily: 'var(--font-bebas)', fontSize: '32px' }}
            >
              COMMUNITY
            </h1>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#444' }} />
                <input 
                  type="text" 
                  placeholder="Search posts..." 
                  className="pl-9 pr-4 py-1.5 bg-[#1a1a1a] border border-[#222] rounded-full font-sans text-xs text-white outline-none focus:border-[#8fab8c] transition-all"
                />
              </div>
              <button className="flex items-center gap-1 font-sans text-[11px] text-[#555] hover:text-white transition-colors">
                Filter <ChevronDown size={12} />
              </button>
              <button className="flex items-center gap-1 font-sans text-[11px] text-[#555] hover:text-white transition-colors">
                Sort by <ChevronDown size={12} />
              </button>
            </div>
          </div>

          {/* Feed */}
          <div className="flex flex-col">
            <PostCard 
              name="Sarah Jenkins"
              avatar="SJ"
              location="Santorini, Greece"
              date="2 hours ago"
              title="Magical sunset at Oia"
              body="Finally crossed this off my bucket list! The white-washed buildings against the deep blue Aegean Sea is even more stunning in person. Highly recommend visiting in the shoulder season."
              images={[
                'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&q=80',
                'https://images.unsplash.com/photo-1516483642775-9a3c39972363?w=400&q=80',
                'https://images.unsplash.com/photo-1469041134994-5916204b4b29?w=400&q=80',
                'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&q=80',
              ]}
            />
            <PostCard 
              name="David Chen"
              avatar="DC"
              location="Tokyo, Japan"
              date="5 hours ago"
              title="Best Ramen in Shinjuku?"
              body="Found this hidden gem under the tracks. The broth is rich, creamy, and has just the right amount of spice. If you're in the area, look for the red lantern near the south exit!"
            />
            <PostCard 
              name="Elena Rodriguez"
              avatar="ER"
              location="Machu Picchu, Peru"
              date="1 day ago"
              title="The Salkantay Trek was worth every step"
              body="Four days of hiking through cloud forests and mountain passes culminated in this view. Words can't describe the feeling of standing where the Incas once lived."
              images={[
                'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=600&q=80',
                'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&q=80',
              ]}
            />
          </div>
        </div>

        {/* Trending Sidebar */}
        <aside className="w-[280px] hidden xl:block">
          <div 
            className="p-5 rounded-xl sticky top-28"
            style={{ backgroundColor: '#111', border: '1px solid #1e1e1e' }}
          >
            <h2 
              className="tracking-[0.15em] mb-6"
              style={{ fontFamily: 'var(--font-bebas)', fontSize: '16px', color: '#8fab8c' }}
            >
              TRENDING PLACES
            </h2>

            <div className="flex flex-col gap-2">
              {TRENDING.map((item) => (
                <div 
                  key={item.city}
                  className="flex items-center gap-3 py-2.5 transition-opacity hover:opacity-80 cursor-pointer"
                  style={{ borderBottom: '1px solid #1e1e1e' }}
                >
                  <img src={item.image} alt={item.city} className="w-11 h-11 rounded-md object-cover" />
                  <div className="flex flex-col">
                    <span className="font-sans text-[13px] font-semibold text-white leading-none mb-1">{item.city}</span>
                    <span className="font-sans text-[11px]" style={{ color: '#555' }}>{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* FAB */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-10 right-10 flex items-center gap-2.5 px-6 py-3 rounded-lg font-sans font-bold transition-opacity hover:opacity-90 active:opacity-80"
          style={{ backgroundColor: '#8fab8c', color: '#0a1200', fontSize: '13px' }}
        >
          <Plus size={16} strokeWidth={3} />
          Share Your Experience
        </motion.button>
      </main>
    </div>
  )
}
