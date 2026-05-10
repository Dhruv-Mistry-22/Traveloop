'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, MapPin, Globe, DollarSign, 
  Search, Filter, Eye, Ban, Trash2,
  ChevronDown
} from 'lucide-react'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts'
import AdminSidebar from '@/components/admin-sidebar'

const TABS = ['Manage Users', 'Popular Cities', 'Popular Activities', 'User Trends']

const USERS_DATA = [
  { id: 1, name: 'Arjun Mehra', initial: 'AM', email: 'arjun@example.com', trips: 12, joined: '12 Jan 2025', status: 'Active' },
  { id: 2, name: 'James Wilson', initial: 'JW', email: 'james@example.com', trips: 8, joined: '15 Feb 2025', status: 'Active' },
  { id: 3, name: 'Jerry Smith', initial: 'JS', email: 'jerry@example.com', trips: 0, joined: '02 Mar 2025', status: 'Suspended' },
  { id: 4, name: 'Cristina V.', initial: 'CV', email: 'cristina@example.com', trips: 24, joined: '20 Dec 2024', status: 'Active' },
]

const CITIES_DATA = [
  { name: 'Paris', trips: 420 },
  { name: 'Tokyo', trips: 380 },
  { name: 'Rome', trips: 310 },
  { name: 'Bali', trips: 290 },
  { name: 'London', trips: 250 },
  { name: 'New York', trips: 210 },
]

const ACTIVITY_DATA = [
  { name: 'Adventure', value: 45 },
  { name: 'Food', value: 25 },
  { name: 'Cultural', value: 15 },
  { name: 'Sports', value: 10 },
  { name: 'Nature', value: 5 },
]

const SAGE_SHADES = ['#8fab8c', '#2d4a2d', '#3d5e3d', '#4a6e4a', '#5a7e5a']

const TRENDS_DATA = [
  { month: 'Jan', signups: 400, active: 2400 },
  { month: 'Feb', signups: 600, active: 2800 },
  { month: 'Mar', signups: 800, active: 3200 },
  { month: 'Apr', signups: 1100, active: 4100 },
  { month: 'May', signups: 1400, active: 4800 },
  { month: 'Jun', signups: 1800, active: 5600 },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Manage Users')

  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <AdminSidebar />
      
      <main className="flex-1 p-10 overflow-x-hidden">
        <h1 
          className="text-white tracking-widest mb-10"
          style={{ fontFamily: 'var(--font-bebas)', fontSize: '32px' }}
        >
          ADMIN DASHBOARD
        </h1>

        {/* TOP STATS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Total Users', value: '12,840', icon: Users },
            { label: 'Total Trips', value: '3,210', icon: MapPin },
            { label: 'Popular City', value: 'Paris', icon: Globe },
            { label: 'Revenue', value: '$48.5K', icon: DollarSign },
          ].map((stat: { label: string, value: string, icon: any }) => (
            <div 
              key={stat.label}
              className="p-5 px-6 rounded-[12px] flex flex-col gap-3"
              style={{ backgroundColor: '#1a1a1a', border: '1px solid #222' }}
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#0e1a0e' }}
              >
                <stat.icon size={20} style={{ color: '#8fab8c' }} />
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-[11px]" style={{ color: '#555' }}>{stat.label.toUpperCase()}</span>
                <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '28px', color: '#fff', lineHeight: 1 }}>{stat.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* TAB NAVIGATION */}
        <div className="flex items-center gap-10 mb-8 border-b border-[#1e1e1e]">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="pb-3 px-1 font-sans font-bold tracking-wider transition-all"
              style={{ 
                fontFamily: 'var(--font-bebas)', 
                fontSize: '16px',
                color: activeTab === tab ? '#8fab8c' : '#555',
                borderBottom: activeTab === tab ? '2px solid #8fab8c' : '2px solid transparent'
              }}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        <div className="min-h-[400px]">
          {activeTab === 'Manage Users' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                  <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#555' }} />
                  <input 
                    type="text" 
                    placeholder="Search users..." 
                    className="w-full pl-10 pr-4 py-2 bg-[#1a1a1a] border border-[#222] rounded-md font-sans text-xs text-white outline-none focus:border-[#8fab8c] transition-all"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-[#222] rounded-md font-sans text-[11px] text-[#555] hover:text-white transition-colors">
                  Filter <ChevronDown size={14} />
                </button>
              </div>

              <div className="rounded-[12px] overflow-hidden" style={{ backgroundColor: '#1a1a1a', border: '1px solid #222' }}>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#111]" style={{ borderBottom: '1px solid #2a2a2a' }}>
                      {['#', 'Avatar+Name', 'Email', 'Trips', 'Joined', 'Status', 'Actions'].map(h => (
                        <th key={h} className="p-4 font-sans text-[11px] font-bold tracking-widest text-[#8fab8c] uppercase">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {USERS_DATA.map((user) => (
                      <tr key={user.id} className="transition-colors hover:bg-[#1e1e1e]" style={{ borderBottom: '1px solid #1e1e1e' }}>
                        <td className="p-4 font-sans text-[13px] text-white opacity-50">{user.id}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-8 h-8 rounded-full flex items-center justify-center font-sans font-semibold"
                              style={{ backgroundColor: '#0e1a0e', color: '#8fab8c', fontSize: '11px' }}
                            >
                              {user.initial}
                            </div>
                            <span className="font-sans text-[13px] font-medium text-white">{user.name}</span>
                          </div>
                        </td>
                        <td className="p-4 font-sans text-[13px] text-white opacity-80">{user.email}</td>
                        <td className="p-4 font-sans text-[13px] text-white">{user.trips}</td>
                        <td className="p-4 font-sans text-[13px] text-white opacity-60">{user.joined}</td>
                        <td className="p-4">
                          <span 
                            className="px-2.5 py-0.5 rounded-full font-sans text-[10px] font-bold"
                            style={{ 
                              backgroundColor: user.status === 'Active' ? '#0e1a0e' : '#1e0a0a',
                              color: user.status === 'Active' ? '#6ab04c' : '#c0392b'
                            }}
                          >
                            {user.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <button className="text-[#555] hover:text-[#8fab8c] transition-colors"><Eye size={16} /></button>
                            <button className="text-[#555] hover:text-[#c9a227] transition-colors"><Ban size={16} /></button>
                            <button className="text-[#555] hover:text-[#c0392b] transition-colors"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'Popular Cities' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-[12px] bg-[#1a1a1a] border border-[#222]">
              <h3 className="tracking-wider mb-8" style={{ fontFamily: 'var(--font-bebas)', fontSize: '20px', color: '#fff' }}>TOP 10 CITIES</h3>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={CITIES_DATA} layout="vertical" margin={{ left: 40, right: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#1e1e1e" />
                    <XAxis type="number" hide />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#555', fontSize: 12, fontFamily: 'Inter' }} 
                    />
                    <Tooltip 
                      cursor={{ fill: '#1e1e1e' }}
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #222', borderRadius: 8 }}
                      itemStyle={{ color: '#8fab8c', fontSize: 12 }}
                    />
                    <Bar dataKey="trips" fill="#8fab8c" radius={[0, 4, 4, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {activeTab === 'Popular Activities' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-10 rounded-[12px] bg-[#1a1a1a] border border-[#222] flex items-center">
              <div className="h-[300px] flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ACTIVITY_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={110}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {ACTIVITY_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={SAGE_SHADES[index % SAGE_SHADES.length]} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 flex flex-col gap-5 px-10">
                {ACTIVITY_DATA.map((item, i) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: SAGE_SHADES[i] }} />
                      <span className="font-sans text-[13px] text-white">{item.name}</span>
                    </div>
                    <span className="font-sans text-[13px] font-bold text-[#8fab8c]">{item.value}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'User Trends' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-10">
              <div className="p-6 rounded-[12px] bg-[#1a1a1a] border border-[#222]">
                <h3 className="tracking-wider mb-6" style={{ fontFamily: 'var(--font-bebas)', fontSize: '18px', color: '#fff' }}>SIGNUPS LAST 12 MONTHS</h3>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={TRENDS_DATA}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e1e1e" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#555', fontSize: 11 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#555', fontSize: 11 }} />
                      <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #222' }} />
                      <Line type="monotone" dataKey="signups" stroke="#8fab8c" strokeWidth={2} dot={{ r: 4, fill: '#8fab8c' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="p-6 rounded-[12px] bg-[#1a1a1a] border border-[#222]">
                <h3 className="tracking-wider mb-6" style={{ fontFamily: 'var(--font-bebas)', fontSize: '18px', color: '#fff' }}>ACTIVE USERS OVER TIME</h3>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={TRENDS_DATA}>
                      <defs>
                        <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8fab8c" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#8fab8c" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e1e1e" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#555', fontSize: 11 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#555', fontSize: 11 }} />
                      <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #222' }} />
                      <Area type="monotone" dataKey="active" stroke="#8fab8c" fillOpacity={1} fill="url(#colorActive)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}
