# 🚀 Kaiyl - AI-Powered Career Guidance Platform

<div align="center">

[![Website](https://img.shields.io/badge/Visit-Kaiyl.com-71ADBA?style=for-the-badge)](https://kaiyl.com)
[![Contact](https://img.shields.io/badge/Contact-kaiyl.help%40gmail.com-9C71BA?style=for-the-badge)](mailto:kaiyl.help@gmail.com)

**Full-Stack SaaS Platform for Career Development & Professional Growth**

[🎯 Features](#-key-features) • [🏗️ Architecture](#️-architecture) • [🚀 Quick Start](#-quick-start) • [📊 Database](#-database-schema)

---

</div>

## 🎯 About Kaiyl

Kaiyl is a modern, full-stack SaaS platform that revolutionizes career development through AI-powered guidance, personalized assessments, and professional development tools. Built with React, Node.js, and modern web technologies, Kaiyl provides a seamless experience for students and professionals navigating their career journeys.

### ✨ What Makes Kaiyl Special

- **🎓 Smart Career Assessment** - AI-driven career matching based on interests, skills, and goals
- **👥 Role-Based Access Control** - Explorer, Pro, and Premium tiers with tailored experiences
- **🔐 Secure Authentication** - JWT-based authentication with bcrypt password hashing
- **📊 Comprehensive Analytics** - User behavior tracking with Mixpanel integration
- **🎨 Modern UI/UX** - Beautiful gradients, animations, and responsive design
- **⚡ Performance Optimized** - Fast loading with Vite, code splitting, and modern build tools

## 🏗️ Architecture

### **Full-Stack Monorepo Structure**
```
kaiyl/
├── frontend/          # React + TypeScript frontend
│   ├── src/
│   │   ├── components/    # 60+ React components
│   │   ├── context/       # Auth & Theme contexts
│   │   ├── pages/         # Service pages
│   │   ├── utils/         # Helper functions
│   │   └── data/          # Static data & types
│   └── public/            # Static assets
├── backend/           # Node.js + Express API
│   ├── src/
│   │   ├── api/           # REST API routes
│   │   ├── config/        # Database configuration
│   │   ├── middleware/    # Authentication middleware
│   │   └── types/         # TypeScript definitions
│   └── prisma/            # Database schema & migrations
└── docs/              # Documentation
```

### **Tech Stack**

#### **Frontend**
- **React 18** - Modern UI library with hooks and concurrent features
- **TypeScript** - Type-safe development with compile-time error checking
- **Vite** - Lightning-fast build tool with HMR
- **Tailwind CSS** - Utility-first CSS framework with custom design system
- **Framer Motion** - Smooth animations and micro-interactions
- **Material UI** - Component library for icons and theming
- **React Router** - Client-side routing with protected routes

#### **Backend**
- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Fast, minimalist web framework
- **Prisma ORM** - Type-safe database client with migrations
- **SQLite** - Lightweight database for development (PostgreSQL ready)
- **JWT** - Secure authentication tokens
- **bcryptjs** - Password hashing and security

#### **Development & Tools**
- **TypeScript** - Full-stack type safety
- **ESLint** - Code quality and style enforcement
- **Prisma Studio** - Visual database management
- **Git & GitHub** - Version control and collaboration
- **Hot Reloading** - Instant development feedback

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ and npm
- Git for version control

### **1. Clone & Setup**
```bash
git clone https://github.com/yourusername/kaiyl.git
cd kaiyl

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### **2. Environment Configuration**
```bash
# Backend environment
cd backend
cp .env.example .env

# Configure your environment variables:
# DATABASE_URL="file:./dev.db"
# JWT_SECRET="your-super-secret-jwt-key"
# PORT=3001
```

### **3. Database Setup**
```bash
# Generate Prisma client and run migrations
cd backend
npx prisma generate
npx prisma migrate dev
npx prisma db seed  # Optional: seed with sample data

# Launch Prisma Studio (database GUI)
npx prisma studio  # Available at http://localhost:5555
```

### **4. Start Development Servers**
```bash
# Terminal 1: Backend (API server)
cd backend
npm run dev  # Runs on http://localhost:3001

# Terminal 2: Frontend (React app)
cd frontend
npm run dev  # Runs on http://localhost:5173
```

### **5. Access the Application**
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **Database Studio**: http://localhost:5555
- **Health Check**: http://localhost:3001/health

## 🎯 Key Features

### **🔐 Authentication System**
- **Secure Signup/Login** - JWT-based authentication with password hashing
- **Role-Based Access** - Explorer (Free), Pro, and Premium account types
- **Protected Routes** - Dashboard access based on authentication status
- **User Profiles** - Comprehensive user data with preferences

### **📊 User Dashboards**
- **Explorer Dashboard** - Free tier with upgrade prompts and basic features
- **Pro Dashboard** - Premium features for paid users
- **Smart Routing** - Automatic redirection based on account type
- **Profile Management** - User info display with account type indicators

### **🎓 Career Assessment**
- **Personalized Quizzes** - AI-driven career matching algorithms
- **Major Recommendations** - Data-driven college major suggestions
- **Skills Analysis** - Gap analysis and learning recommendations
- **Career Timelines** - Roadmaps for professional development

### **🎨 Modern UI/UX**
- **Gradient Design System** - Beautiful teal → purple → cream gradients
- **Responsive Design** - Mobile-first approach with Tailwind breakpoints
- **Interactive Elements** - Hover states, animations, and user feedback
- **Dark/Light Themes** - Seamless theme switching
- **Performance Optimized** - Code splitting and lazy loading

## 📊 Database Schema

### **Core Models**
```prisma
model User {
  id              String        @id @default(cuid())
  email           String        @unique
  firstName       String
  lastName        String
  accountType     AccountType   @default(EXPLORER)
  university      String?
  major           String?
  graduationYear  Int?
  careerGoals     String?
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
  
  // Relationships
  quizResults            CareerQuizResult[]
  majorRecommendations   MajorRecommendation[]
  careerTimelines        CareerTimeline[]
  notificationSettings  NotificationSettings?
  weeklyUpdates         WeeklyUpdate[]
}

enum AccountType {
  EXPLORER  // Free tier
  PRO       // Paid tier
  PREMIUM   // Premium tier
}
```

### **Extended Features**
- **CareerQuizResult** - Store quiz responses and career matches
- **MajorRecommendation** - College major suggestions with confidence scores
- **SkillDemand** - Industry skill requirements and trends
- **AIImpactAnalysis** - Future career outlook with AI impact
- **NotificationSettings** - User communication preferences
- **SalaryTrend** - Compensation data by career and location

## 🛠️ API Endpoints

### **Authentication**
```bash
POST /api/auth/signup     # User registration
POST /api/auth/login      # User authentication
POST /api/auth/logout     # Session termination
GET  /api/auth/profile    # Get user profile
```

### **Health & Monitoring**
```bash
GET  /health              # API health check
GET  /api/test-db         # Database connection test
```

### **User Management**
```bash
GET  /api/users/profile   # Protected: Get user data
PUT  /api/users/profile   # Protected: Update user info
```

## 📈 Project Statistics

### **Codebase Metrics**
- **~20,000 Lines of Code** across frontend and backend
- **68 React Components** - Comprehensive UI component library
- **58+ TypeScript Files** - Type-safe development
- **120-line Database Schema** - Comprehensive user data model
- **Production-Ready** - Full authentication and user management

### **Key Components**
| Component | Lines | Purpose |
|-----------|-------|---------|
| `LandingPage.tsx` | 848 | Marketing landing page |
| `WebsiteServicePage.tsx` | 838 | Website building services |
| `Header.tsx` | 540 | Navigation with user profiles |
| `MajorSelectionPage.tsx` | 452 | College major selection tool |
| `SignupPro.tsx` | 358 | Pro account registration |
| `PricingPage.tsx` | 334 | Subscription pricing |

### **Database Features**
- **User Authentication** - Secure login with role-based access
- **Career Data** - Comprehensive career assessment storage
- **Analytics Tracking** - User behavior and engagement metrics
- **Scalable Schema** - Ready for production deployment

## 🔒 Security Features

- **Password Hashing** - bcrypt with salt rounds for secure storage
- **JWT Authentication** - Stateless, secure token-based sessions
- **Input Validation** - Server-side validation and sanitization
- **Protected Routes** - Middleware-based access control
- **Environment Security** - Secure configuration management

## 🚀 Deployment

### **Production Checklist**
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Frontend build optimized
- [ ] SSL certificates installed
- [ ] Monitoring and logging setup

### **Recommended Stack**
- **Frontend**: Vercel, Netlify, or AWS S3 + CloudFront
- **Backend**: Railway, Heroku, or AWS EC2
- **Database**: PostgreSQL on AWS RDS or Railway
- **Monitoring**: Sentry for error tracking

## 📞 Contact & Support

- **Email**: [kaiyl.help@gmail.com](mailto:kaiyl.help@gmail.com)
- **GitHub**: [github.com/yourusername/kaiyl](https://github.com/yourusername/kaiyl)
- **Website**: [kaiyl.com](https://kaiyl.com)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Ready to transform career guidance with modern technology?**

[🚀 Get Started with Kaiyl →](https://kaiyl.com)

Built with ❤️ using React, Node.js, and modern web technologies

</div>
