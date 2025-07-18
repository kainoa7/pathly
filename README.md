# 🚀 Kaiyl - AI-Powered Career Guidance Platform (BETA)

<div align="center">

[![Website](https://img.shields.io/badge/Visit-Kaiyl.com-71ADBA?style=for-the-badge)](https://kaiyl.com)
[![Contact](https://img.shields.io/badge/Contact-kaiyl.help%40gmail.com-9C71BA?style=for-the-badge)](mailto:kaiyl.help@gmail.com)
[![Status](https://img.shields.io/badge/Status-BETA-emerald?style=for-the-badge)]()

**Comprehensive SaaS Platform for Career Development with AI-Powered Guidance & Social Features**

[🎯 Features](#-key-features) • [🏗️ Architecture](#️-architecture) • [🚀 Quick Start](#-quick-start) • [📊 Database](#-database-schema) • [📈 Stats](#-codebase-statistics)

---

</div>

## 🎯 About Kaiyl

Kaiyl is a modern, full-stack SaaS platform that revolutionizes career development through AI-powered guidance, personalized assessments, social features, and comprehensive analytics. Currently in BETA, the platform serves students and professionals with tailored experiences based on their account tier and career goals.

### ✨ What Makes Kaiyl Special

- **🤖 AI-Powered Career Matching** - Smart assessments with personalized career recommendations
- **📰 Social News Hub** - Professional news feed with voting, commenting, and bookmarking (Pro)
- **📊 Career Analytics Dashboard** - Major salary comparisons with 10-year projections (Pro)
- **👑 Founding Member Community** - Exclusive co-creator community with special access (Pro)
- **👥 Tiered Access Control** - Explorer (Free), Pro (Currently Free), and Premium (Coming Soon)
- **📈 Comprehensive Analytics** - User activity tracking, engagement metrics, and admin insights
- **🎨 Modern UI/UX** - Fully responsive design with glassmorphism effects and smooth animations
- **🔧 Admin Management** - Complete CMS for content, user analytics, and founding member management

## 🏗️ Architecture

### **Full-Stack Monorepo Structure**
```
kaiyl/
├── frontend/                    # React + TypeScript SPA
│   ├── src/
│   │   ├── components/          # 80+ React components (fully mobile responsive)
│   │   │   ├── admin/          # Admin dashboard components
│   │   │   ├── services/       # Service-specific pages
│   │   │   └── ...             # Core UI components
│   │   ├── context/            # React Context providers
│   │   ├── data/               # Static data & configurations
│   │   ├── types/              # TypeScript definitions
│   │   └── utils/              # Helper functions & analytics
│   └── public/                 # Static assets & company logos
├── backend/                    # Node.js + Express API
│   ├── src/
│   │   ├── api/
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── news/          # News hub API with social features
│   │   │   ├── majors/        # Major information API
│   │   │   ├── salary-projections/ # Career analytics API
│   │   │   ├── founding-members/ # Community management API
│   │   │   ├── feedback/      # Platform feedback system
│   │   │   └── features/      # Feature voting API
│   │   ├── config/            # Database & app configuration
│   │   ├── middleware/        # Auth & validation middleware
│   │   └── types/             # Backend type definitions
│   └── prisma/                # Database schema & migrations
└── docs/                      # Project documentation
```

### **Tech Stack**

#### **Frontend Technologies**
- **React 18** - Modern UI with concurrent features and hooks
- **TypeScript** - Full type safety across 80+ components
- **Vite** - Lightning-fast development with HMR
- **Tailwind CSS** - Utility-first styling with custom design system
- **Framer Motion** - 60fps animations and micro-interactions
- **FontAwesome** - Professional icon library
- **React Router** - SPA routing with protected routes
- **Recharts** - Interactive data visualization for analytics

#### **Backend Technologies**
- **Node.js** - JavaScript runtime with Express.js framework
- **Prisma ORM** - Type-safe database client with migrations
- **SQLite** - Development database (PostgreSQL production-ready)
- **JWT + bcrypt** - Secure authentication and password hashing
- **RESTful APIs** - 30+ endpoints for all platform features

#### **Database & Infrastructure**
- **Prisma Schema** - 15+ models with complex relationships
- **Database Migrations** - Version-controlled schema changes
- **Environment Config** - Secure configuration management
- **Health Monitoring** - API health checks and error handling

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ and npm
- Git for version control

### **1. Clone & Setup**
```bash
git clone https://github.com/kainoa7/pathly.git
cd pathly

# Install dependencies for both frontend and backend
cd frontend && npm install
cd ../backend && npm install
```

### **2. Database Setup**
```bash
cd backend
npx prisma generate
npx prisma db push
```

### **3. Environment Configuration**
```bash
# Backend (.env)
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
PORT=5000

# Frontend (.env)
VITE_API_BASE_URL=http://localhost:5000
```

### **4. Development Servers**
```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend  
cd frontend && npm run dev
```

🎉 **Access at:** http://localhost:5173

## 🎯 Key Features

### **🏠 Core Platform Features**

#### **Explorer (Free Tier)**
- **Career Assessment Quiz** - Comprehensive personality and skill-based career matching
- **Major Selection Tool** - Interactive major exploration with career paths
- **Basic Career Insights** - General career information and guidance
- **Account Management** - Profile creation and basic dashboard

#### **Pro Tier (Currently Free)**
- **📰 Daily News Hub** - Curated professional news across Tech, Business, Finance, Sports & AI
  - Upvote/downvote articles and comments
  - Save and bookmark favorite articles
  - Comment and engage with community
  - Personalized saved articles page
- **📊 Career Analytics Dashboard** - Advanced career insights and data analysis
  - Major salary comparison tool with 10-year projections
  - Interactive data visualizations using Recharts
  - Career path analysis and insights
  - Data transparency modal for methodology
- **👑 Founding Member Community** - Exclusive access to co-creator features
  - Special community status and recognition
  - Early access to new features
  - Direct input on platform development
- **🎯 Advanced Career Features** - Enhanced assessment and guidance tools

#### **Premium Tier (Coming Soon)**
- **🤖 AI-Powered Study Schedules** - Personalized learning paths
- **🎮 Custom Career Path Simulator** - Interactive career scenario planning
- **📈 Advanced Analytics Dashboard** - Comprehensive performance metrics
- **🔔 Real-time Industry Alerts** - Personalized opportunity notifications
- **👨‍💼 1-on-1 Career Coaching** - Professional mentorship sessions

### **🛠️ Admin Features**

#### **Comprehensive Admin Dashboard**
- **👥 User Management** - Complete user lifecycle management
  - View all user signups and account types
  - Filter and search users by criteria
  - Account type management (Explorer → Pro → Premium)
  - User activity tracking and analytics

#### **📰 News Hub Management**
- **Content Management System** - Full control over news articles
  - Create, edit, and delete articles
  - Category management (Tech, Business, Finance, Sports, AI)
  - Real-time content publishing
- **Social Features Analytics** - Engagement tracking and insights
  - Article voting statistics
  - Comment moderation and management
  - User engagement metrics

#### **👑 Founding Member Management**
- **Dedicated Founding Members Page** - Professional community management
  - View all founding members with join dates
  - Search and sort functionality
  - Export member lists to CSV
  - Real-time member count tracking
  - IP address tracking for security

#### **📊 Platform Analytics**
- **User Activity Tracking** - Comprehensive engagement metrics
- **Platform Feedback Analytics** - Real-time sentiment analysis
- **Feature Usage Statistics** - Popular features and user behavior
- **Growth Metrics** - User acquisition and retention analytics

### **🔒 Security & Authentication**

#### **Multi-Tier Authentication System**
- **JWT-based Authentication** - Secure token-based auth
- **Role-based Access Control** - Explorer, Pro, Premium, Admin tiers
- **Protected Routes** - Frontend and backend route protection
- **Admin Security** - Separate admin authentication with time-based sessions
- **Password Security** - bcrypt hashing with salt rounds

#### **Data Protection**
- **Input Validation** - Comprehensive data sanitization
- **SQL Injection Protection** - Prisma ORM parameterized queries
- **XSS Prevention** - Content sanitization and validation
- **CORS Configuration** - Secure cross-origin resource sharing

## 📊 Database Schema

### **Core Models**
```prisma
model User {
  id              String    @id @default(cuid())
  email           String    @unique
  password        String
  firstName       String
  lastName        String
  accountType     AccountType @default(EXPLORER)
  university      String?
  graduationYear  String?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  // Relations
  newsVotes       NewsVote[]
  newsComments    NewsComment[]
  savedArticles   SavedArticle[]
  platformFeedback PlatformFeedback[]
  mobileAppVotes  MobileAppVote[]
}

model NewsArticle {
  id              String    @id @default(cuid())
  title           String
  content         String
  excerpt         String?
  category        String
  author          String?
  publishedAt     DateTime  @default(now())
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  // Relations
  votes           NewsVote[]
  comments        NewsComment[]
  savedBy         SavedArticle[]
}

model FoundingMember {
  id              String    @id @default(cuid())
  email           String    @unique
  ipAddress       String
  joinedAt        DateTime  @default(now())
}

enum AccountType {
  EXPLORER
  PRO
  PREMIUM
  ADMIN
}
```

### **Social Features Models**
```prisma
model NewsVote {
  id        String    @id @default(cuid())
  userId    String?
  articleId String
  voteType  VoteType
  ipAddress String?
  createdAt DateTime  @default(now())
  
  user      User?     @relation(fields: [userId], references: [id])
  article   NewsArticle @relation(fields: [articleId], references: [id])
}

model NewsComment {
  id        String    @id @default(cuid())
  content   String
  userId    String?
  articleId String
  parentId  String?
  ipAddress String?
  createdAt DateTime  @default(now())
  
  user      User?     @relation(fields: [userId], references: [id])
  article   NewsArticle @relation(fields: [articleId], references: [id])
  parent    NewsComment? @relation("CommentReplies", fields: [parentId], references: [id])
  replies   NewsComment[] @relation("CommentReplies")
}
```

## 🌐 API Documentation

### **Authentication Endpoints**
```
POST /api/auth/login          # User login
POST /api/auth/register       # User registration  
POST /api/auth/logout         # User logout
GET  /api/auth/me            # Get current user
PUT  /api/auth/profile       # Update user profile
```

### **News Hub API**
```
GET  /api/news               # Get paginated news articles
GET  /api/news/:id           # Get specific article with comments
POST /api/news/:id/vote      # Vote on article (Pro)
POST /api/news/:id/comments  # Add comment (Pro)
POST /api/news/:id/save      # Save article (Pro)
GET  /api/news/user/saved    # Get user's saved articles (Pro)
GET  /api/news/user/activity # User engagement analytics (Pro)
```

### **Career Analytics API**
```
GET  /api/majors             # Get available majors list
GET  /api/salary-projections # Get salary comparison data
```

### **Founding Members API**
```
POST /api/founding-members/signup    # Join founding members
GET  /api/founding-members/count     # Get member count
GET  /api/founding-members/admin/list # Admin: Get all members
```

### **Admin APIs**
```
GET  /api/users/admin        # Admin: Get all users
GET  /api/news/admin/analytics # Admin: Content analytics
GET  /api/feedback/admin     # Admin: Platform feedback
POST /api/news/admin         # Admin: Create article
PUT  /api/news/admin/:id     # Admin: Update article
DELETE /api/news/admin/:id   # Admin: Delete article
```

## 📱 Mobile Responsiveness

### **Fully Responsive Design**
- **Mobile-First Approach** - Optimized for phones and tablets
- **Responsive Grid Layouts** - Adaptive grid systems using Tailwind CSS
- **Touch-Friendly Interface** - Optimized button sizes and touch targets
- **Progressive Text Scaling** - `text-sm sm:text-base md:text-lg` patterns throughout
- **Adaptive Navigation** - Mobile hamburger menus and collapsible sections
- **Optimized Images** - Responsive image sizing and loading

### **Component Responsiveness Examples**
```typescript
// Responsive grid patterns used throughout
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"

// Progressive text sizing
className="text-3xl sm:text-4xl md:text-5xl font-bold"

// Mobile-optimized spacing
className="px-4 sm:px-6 lg:px-8 py-8"
```

## 🚀 Deployment & Production

### **Environment Setup**
- **Development** - SQLite database with hot reloading
- **Production** - PostgreSQL database with optimized builds
- **Environment Variables** - Secure configuration management
- **CORS Configuration** - Production-ready security settings

### **Build Commands**
```bash
# Frontend production build
cd frontend && npm run build

# Backend production start
cd backend && npm start

# Database deployment
npx prisma migrate deploy
```

## 📈 Codebase Statistics

- **📁 Total Files:** 150+ source files
- **⚛️ React Components:** 80+ components (all mobile responsive)
- **🔌 API Endpoints:** 30+ RESTful endpoints
- **📊 Database Models:** 15+ Prisma models
- **🎨 UI Components:** Custom design system with Tailwind CSS
- **🔒 Authentication:** Multi-tier role-based access control
- **📱 Mobile Support:** 100% responsive design
- **🧪 TypeScript Coverage:** Full type safety across frontend and backend

## 🎯 Current Status & Roadmap

### **✅ Completed Features (BETA)**
- ✅ Complete user authentication system with role-based access
- ✅ AI-powered career assessment and matching
- ✅ Professional news hub with social features (voting, comments, bookmarking)
- ✅ Career analytics dashboard with salary comparison tool
- ✅ Founding member community system
- ✅ Comprehensive admin dashboard with user and content management
- ✅ Fully responsive mobile design
- ✅ Real-time analytics and engagement tracking

### **🚧 In Development**
- 🚧 University directory with student marketplace
- 🚧 Advanced AI recommendations
- 🚧 Enhanced analytics visualizations
- 🚧 Mobile app companion

### **🔮 Planned Features (Premium)**
- 🔮 AI-powered study schedules
- 🔮 Custom career path simulator
- 🔮 1-on-1 career coaching
- 🔮 Advanced industry alerts
- 🔮 Community features expansion

## 🤝 Contributing

We welcome contributions! Please check our [DEVELOPMENT.md](docs/DEVELOPMENT.md) for detailed development guidelines.

## 📞 Contact & Support

- **Website:** [kaiyl.com](https://kaiyl.com)
- **Email:** kaiyl.help@gmail.com
- **Status:** BETA - Actively seeking feedback and early adopters

---

<div align="center">

**Built with ❤️ for the next generation of career developers**

[⭐ Star this repo](https://github.com/kainoa7/pathly) • [🐛 Report Bug](https://github.com/kainoa7/pathly/issues) • [💡 Request Feature](https://github.com/kainoa7/pathly/issues)

</div>
