# TravelLoop - Personalized Travel Planning Platform

A comprehensive full-stack application for planning trips, managing budgets, creating itineraries, and sharing travel plans with friends.

## 🚀 Tech Stack

### Frontend
- **Next.js 16.x** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS styling
- **shadcn/ui** - Reusable component library
- **Framer Motion** - Smooth animations
- **Recharts** - Data visualization
- **Zustand** - State management
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type-safe backend development
- **Prisma ORM** - Database ORM
- **PostgreSQL** - Relational database
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Infrastructure
- **PostgreSQL (Neon)** - Cloud database
- **Vercel** - Frontend deployment
- **Render** - Backend deployment
- **GitHub** - Version control

### APIs
- **Mapbox API** - Maps and geolocation
- **GeoDB Cities API** - City search and data
- **OpenWeather API** - Weather information (optional)

## 📁 Project Structure

```
TraveLoop/
├── frontend/                # Next.js frontend application
│   ├── src/
│   │   ├── app/            # App router pages
│   │   │   ├── auth/       # Authentication pages
│   │   │   ├── dashboard/  # Dashboard page
│   │   │   ├── trips/      # Trip management
│   │   │   ├── itinerary/  # Itinerary builder
│   │   │   ├── shared/     # Shared itineraries
│   │   │   └── profile/    # User profile
│   │   ├── components/     # Reusable components
│   │   │   ├── auth/       # Auth components
│   │   │   ├── dashboard/  # Dashboard components
│   │   │   ├── trips/      # Trip components
│   │   │   ├── itinerary/  # Itinerary components
│   │   │   ├── budget/     # Budget tracking
│   │   │   ├── packing/    # Packing checklist
│   │   │   ├── notes/      # Notes/journal
│   │   │   └── shared/     # Shared components
│   │   ├── lib/
│   │   │   ├── api/        # API client
│   │   │   ├── hooks/      # Custom hooks
│   │   │   └── store/      # Zustand stores
│   │   └── types/          # TypeScript types
│   ├── public/             # Static assets
│   └── package.json
│
├── backend/                 # Express.js backend API
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Express middleware
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Utility functions
│   │   ├── types/          # TypeScript interfaces
│   │   └── index.ts        # Server entry point
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   ├── .env.example        # Environment variables template
│   └── package.json
│
├── .github/
│   ├── copilot-instructions.md  # Development instructions
│   └── COMMIT_STRATEGY.md       # Git commit guidelines
│
├── .gitignore
└── README.md
```

## 🎯 Core Modules

### 1. Authentication Module
- User registration and login
- JWT-based session management
- Password hashing with bcryptjs
- Protected routes

### 2. Dashboard Module
- Recent trips overview
- Recommended destinations
- Budget summary
- Quick trip statistics

### 3. Trip Management Module
- Create, read, update, delete trips
- Multi-city planning support
- Trip details and metadata

### 4. Itinerary Builder Module
- Add/manage stops (cities)
- Add/manage activities per stop
- Reorder stops and activities
- Date and time management

### 5. City Search Module
- Search cities by name/country
- Filter by cost index
- Show popular destinations
- Integration with GeoDB Cities API

### 6. Activity Management Module
- Create activities for each stop
- Categorize activities
- Estimate costs and duration
- Link to locations via Mapbox

### 7. Budget Management Module
- Track expenses per trip
- Categorize spending
- Real-time budget calculations
- Visual charts (pie/bar graphs)
- Daily budget overview

### 8. Packing Checklist Module
- Create trip-specific checklists
- Categorize items
- Mark items as packed
- Reusable templates

### 9. Notes & Journal Module
- Create day-wise notes
- Journal entries for each day
- Travel reminders
- Text formatting support

### 10. Shared Itinerary Module
- Generate public share links
- Read-only view for shared trips
- Copy trip feature
- Link expiration (optional)

### 11. User Profile Module
- Edit profile information
- Manage preferences
- View saved destinations
- Avatar upload

### 12. Admin Dashboard (Optional)
- User analytics
- Popular cities statistics
- Trip statistics
- User management

## 🗄️ Database Schema

**Users** → **Trips** → **Stops** → **Activities**
- User has many Trips
- Trip has many Stops
- Stop has many Activities
- Trip has Expenses, Packing Checklists, Notes, Shared Links

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL (via Neon)
- Git

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend Setup

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

Backend runs on [http://localhost:5000](http://localhost:5000)

### Environment Variables

**Frontend (.env.local)**
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_MAPBOX_TOKEN=your-token
NEXT_PUBLIC_GEODB_API_KEY=your-key
NEXT_PUBLIC_OPENWEATHER_API_KEY=your-key
```

**Backend (.env)**
```
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your-secret-key
PORT=5000
NODE_ENV=development
```

## 📝 Git Commit Strategy

See [COMMIT_STRATEGY.md](.github/COMMIT_STRATEGY.md) for detailed commit guidelines and workflow.

### Quick Commit Types
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions
- `chore:` Build/dependencies

## 🔄 Development Workflow

1. Create feature branches from `main`
2. Follow commit strategy for clear history
3. Create pull requests for code review
4. Test thoroughly before merging
5. Deploy to staging before production

## 🚀 Deployment

### Frontend (Vercel)
```bash
vercel deploy --prod
```

### Backend (Render)
- Connect GitHub repository
- Auto-deploy on main branch push
- Environment variables configured in Render dashboard

## 📚 API Documentation

API endpoints follow RESTful conventions:
- `GET /api/trips` - List user trips
- `POST /api/trips` - Create trip
- `GET /api/trips/:id` - Get trip details
- `PUT /api/trips/:id` - Update trip
- `DELETE /api/trips/:id` - Delete trip
- `GET /api/auth/me` - Get current user
- `POST /api/expenses` - Track expense
- `GET /api/cities` - Search cities

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🎉 Features in Development

- [ ] Authentication module (Login/Signup)
- [ ] Trip creation and management
- [ ] Itinerary builder with map integration
- [ ] Budget tracking and analytics
- [ ] Packing checklist
- [ ] Notes and journal
- [ ] Shared itineraries
- [ ] User profiles
- [ ] Admin dashboard
- [ ] Mobile responsive design
- [ ] Offline support
- [ ] Real-time collaboration

## 📞 Support

For support, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ by the TravelLoop Team**
