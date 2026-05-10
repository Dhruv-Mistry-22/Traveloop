# 🌍 Traveloop

> Plan Your Journey, Discover The World.

Traveloop is a comprehensive, full-stack travel planning platform designed to help you organize multi-city itineraries, track your budget, manage packing checklists, and discover popular global destinations all in one beautiful, unified interface.

## 🚀 Tech Stack

**Frontend:**
- [Next.js](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/) (Animations)
- Google OAuth Integration

**Backend:**
- [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- Custom JWT Authentication
- RESTful API Architecture

**Database:**
- [PostgreSQL](https://www.postgresql.org/) (Hosted on [Neon](https://neon.tech/))
- [Prisma ORM](https://www.prisma.io/)

## ✨ Key Features

- **Authentication:** Secure custom JWT login alongside one-click Google OAuth.
- **Trip Management:** Plan single or complex multi-city trips with ease.
- **Itinerary Builder:** Visually organize your daily activities, stops, and schedules.
- **Budget Ledger:** Track your travel expenses, categorize costs, and view analytics.
- **Packing Checklists:** Create and check off items so you never forget an essential.
- **City Exploration:** Search and discover popular, budget-friendly, or luxury destinations globally.

## 👨‍💻 Team

- **Dhruv Mistry** - Team Leader & Backend Developer
- **Harsh Verma** - Git Manager & Integrations Lead
- **Chaitanay Thakkar** - Frontend Developer
- **Bhushan Patil** - Database Architect

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- A local PostgreSQL database or Neon Cloud connection string.

### 1. Database & Backend Setup
```bash
cd backend
npm install

# Create your .env file with DATABASE_URL, DIRECT_URL, and JWT_SECRET

# Push the schema and seed dummy data
npx prisma db push
npm run db:seed

# Start the Express server (Runs on port 5000)
npm run dev
```

### 2. Frontend Setup
```bash
# In a new terminal window
cd frontend
npm install

# Create your .env.local file with NEXT_PUBLIC_GOOGLE_CLIENT_ID and NEXT_PUBLIC_API_URL

# Start the Next.js server (Runs on port 3000)
npm run dev
```

### 3. Run the App
Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to start planning your next journey!

---

