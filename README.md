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
- **📊 Platform Feedback System** - Real-time user sentiment analysis and engagement scoring
- **🗞️ Social News Hub** - Professional news feed with voting, commenting, and bookmarking
- **👥 Tiered Access Control** - Explorer (Free), Pro, and Premium with progressive feature unlocks
- **📈 Comprehensive Analytics** - User activity tracking, engagement metrics, and admin insights
- **🎨 Modern UI/UX** - Responsive design with glassmorphism effects and smooth animations
- **🔧 Admin Management** - Complete CMS for content, user analytics, and platform monitoring

## 🏗️ Architecture

### **Full-Stack Monorepo Structure**
```
kaiyl/
├── frontend/                    # React + TypeScript SPA
│   ├── src/
│   │   ├── components/          # 80+ React components
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
│   │   │   ├── news/          # News hub API
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

#### **Backend Technologies**
- **Node.js** - JavaScript runtime with Express.js framework
- **Prisma ORM** - Type-safe database client with migrations
- **SQLite** - Development database (PostgreSQL production-ready)
- **JWT + bcrypt** - Secure authentication and password hashing
- **RESTful APIs** - 25+ endpoints for all platform features

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

### **2. Environment Configuration**
```bash
# Backend environment
cd backend
cp .env.example .env

# Configure your environment variables:
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-jwt-key"
PORT=3001
```

### **3. Database Setup & Migrations**
```bash
cd backend

# Generate Prisma client
npx prisma generate

# Run all migrations (includes latest features)
npx prisma migrate dev

# Optional: View database
npx prisma studio  # http://localhost:5555
```

### **4. Start Development Servers**
```bash
# Terminal 1: Backend API
cd backend
npm run dev  # http://localhost:3001

# Terminal 2: Frontend React App
cd frontend
npm run dev  # http://localhost:5173
```

### **5. Access the Platform**
- **Main App**: http://localhost:5173
- **Admin Panel**: http://localhost:5173/admin/login (`admin` / `kaiyl2024`)
- **API Health**: http://localhost:3001/health
- **Database GUI**: http://localhost:5555

## 🎯 Key Features

### **🔐 Advanced Authentication System**
- **Multi-Tier Access** - Explorer (Free), Pro, Premium account types
- **JWT Security** - Secure token-based authentication
- **Protected Routes** - Conditional access based on account tier
- **User Profiles** - Comprehensive user data with university info

### **💬 Platform Feedback System**
- **User Sentiment Analysis** - "Love it", "Would use", "Not interested" voting
- **Anonymous Voting** - IP-based tracking for non-authenticated users
- **Real-Time Analytics** - Engagement scoring and recommendation engine
- **Admin Dashboard** - Comprehensive feedback analytics and user comments
- **Local Storage Fallback** - Offline functionality with seamless sync

### **🗞️ Social News Hub (Pro Feature)**
- **Curated News Feed** - Tech, Business, Finance, Sports, AI categories
- **Social Interactions** - Upvote/downvote articles and comments
- **Article Bookmarking** - Save articles for later reading
- **Comment System** - Threaded discussions on articles
- **User Activity Tracking** - Comprehensive engagement analytics

### **👨‍💼 Admin Management System**
- **Content Management** - Create, edit, delete news articles with images
- **User Analytics** - Monitor signups, engagement, account types
- **Platform Feedback Analytics** - Real-time sentiment analysis
- **Feature Voting Insights** - Track user-requested features
- **Admin Authentication** - Secure admin-only access

### **🎓 Career Development Tools**
- **AI Career Assessment** - Personalized career matching algorithms
- **University Directory** - Campus life features with voting system
- **Major Recommendations** - Data-driven college major suggestions
- **Career Roadmaps** - Professional development planning

### **📊 Analytics & Insights**
- **User Activity Dashboard** - Personal engagement metrics
- **Platform Statistics** - Real-time usage analytics
- **Engagement Scoring** - Data-driven development decisions
- **Feature Voting** - Community-driven development priorities

### **🎨 Premium UI/UX Design**
- **Glassmorphism Effects** - Modern frosted glass aesthetics
- **Responsive Design** - Mobile-first approach (9:16 ratio compatible)
- **Dark/Light Themes** - Seamless theme switching
- **Gradient Design System** - Consistent teal → purple → cream branding
- **Smooth Animations** - 60fps interactions with Framer Motion

## 📊 Database Schema

### **Core User Management**
```prisma
model User {
  id              String        @id @default(cuid())
  email           String        @unique
  firstName       String
  lastName        String
  accountType     AccountType   @default(EXPLORER)
  university      String?
  graduationYear  String?
  createdAt       DateTime      @default(now())
  
  // Feature Relationships
  careerQuizResults     CareerQuizResult[]
  majorRecommendations  MajorRecommendation[]
  newsComments         NewsComment[]
  newsVotes           NewsVote[]
  savedArticles       SavedArticle[]
  featureVotes        FeatureVote[]
  platformFeedback    PlatformFeedback[]
}

enum AccountType {
  EXPLORER  // Free tier
  PRO       // Premium features
  PREMIUM   // Future premium tier
}
```

### **Platform Feedback System**
```prisma
model PlatformFeedback {
  id          String            @id @default(cuid())
  userId      String?           // Optional for anonymous
  user        User?             @relation(fields: [userId], references: [id])
  ipAddress   String            // Anonymous user tracking
  voteType    PlatformVoteType  // LOVE_IT, WOULD_USE, NOT_INTERESTED
  feedback    String?           // Optional text feedback
  createdAt   DateTime          @default(now())
}
```

### **News & Social Features**
```prisma
model NewsArticle {
  id          String        @id @default(cuid())
  title       String
  content     String
  summary     String
  category    NewsCategory  // TECH, BUSINESS, FINANCE, SPORTS, AI
  imageUrl    String?
  comments    NewsComment[]
  votes       NewsVote[]
  savedBy     SavedArticle[]
}

model NewsComment {
  id        String   @id @default(cuid())
  articleId String
  userId    String
  content   String
  createdAt DateTime @default(now())
  votes     NewsVote[]
}
```

## 🛠️ API Endpoints

### **Authentication & Users**
```bash
POST /api/auth/signup         # User registration
POST /api/auth/login          # Authentication
GET  /api/auth/users          # Admin: List all users
DELETE /api/auth/users/:id    # Admin: Delete user
```

### **Platform Feedback System**
```bash
POST /api/feedback/vote       # Submit platform feedback
GET  /api/feedback/stats      # Get engagement statistics
GET  /api/feedback/my-vote    # Get user's votes
GET  /api/feedback/recent     # Admin: Recent feedback comments
```

### **News Hub (Pro Features)**
```bash
GET  /api/news                # Get news articles with pagination
POST /api/news/:id/vote       # Vote on article/comment
POST /api/news/:id/save       # Bookmark article
POST /api/news/:id/comments   # Add comment
GET  /api/news/user/activity  # User engagement analytics
```

### **Admin Content Management**
```bash
POST /api/news/admin/create   # Create news article
PUT  /api/news/admin/:id      # Update article
DELETE /api/news/admin/:id    # Delete article
GET  /api/news/admin/analytics # Content analytics
```

### **Feature Voting**
```bash
POST /api/features/vote       # Vote on features
GET  /api/features/:name/votes # Get feature vote counts
```

## 📈 Codebase Statistics

### **Project Scale**
- **Total Files**: 120+ TypeScript/React files
- **React Components**: 80+ UI components
- **API Endpoints**: 25+ RESTful endpoints
- **Database Models**: 15+ Prisma models
- **Database Migrations**: 4 major feature migrations

### **Feature Distribution**
| Feature Category | Components | API Routes | Description |
|-----------------|------------|------------|-------------|
| **Authentication** | 8 | 6 | User management & security |
| **Platform Feedback** | 2 | 4 | Sentiment analysis system |
| **News Hub** | 12 | 8 | Social news features |
| **Admin Dashboard** | 15 | 7 | Management interface |
| **Career Tools** | 25 | 3 | Core career development |
| **UI Components** | 18 | - | Reusable interface elements |

### **Key Component Metrics**
| Component | Purpose | Complexity |
|-----------|---------|------------|
| `PlatformFeedbackWidget.tsx` | User sentiment collection | High |
| `AdminPlatformFeedback.tsx` | Analytics dashboard | High |
| `NewsPage.tsx` | Social news interface | High |
| `UserActivityDashboard.tsx` | Personal analytics | Medium |
| `AdminNewsManagement.tsx` | Content management | High |

## 🔒 Security & Performance

### **Security Features**
- **JWT Authentication** - Stateless, secure sessions
- **Password Hashing** - bcrypt with salt rounds
- **Input Validation** - Server-side sanitization
- **Protected Routes** - Middleware-based access control
- **IP Tracking** - Anonymous user monitoring
- **Admin Authentication** - Secure admin panel access

### **Performance Optimizations**
- **Code Splitting** - Lazy loading for better performance
- **Database Indexing** - Optimized queries with Prisma
- **Responsive Design** - Mobile-first responsive breakpoints
- **Error Boundaries** - Graceful error handling
- **Local Storage Fallback** - Offline functionality

## 🚀 Deployment Ready

### **Production Checklist**
- ✅ Environment variables configured
- ✅ Database migrations applied
- ✅ TypeScript compilation ready
- ✅ Admin authentication secure
- ✅ API rate limiting configured
- ✅ Error logging implemented

### **Recommended Infrastructure**
- **Frontend**: Vercel, Netlify (optimized for React)
- **Backend**: Railway, Render, AWS (Node.js ready)
- **Database**: PostgreSQL on Railway, AWS RDS
- **Monitoring**: Built-in health checks, Sentry integration ready

## 📞 Contact & Support

- **Email**: [kaiyl.help@gmail.com](mailto:kaiyl.help@gmail.com)
- **GitHub**: [github.com/kainoa7/pathly](https://github.com/kainoa7/pathly)
- **Platform**: Currently in BETA - user feedback welcome!

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

**🚀 BETA Platform - Ready for User Testing**

**Comprehensive career guidance platform with real-time feedback systems**

[💬 Submit Platform Feedback](https://kaiyl.com) • [👨‍💼 Admin Dashboard](https://kaiyl.com/admin) • [📰 News Hub](https://kaiyl.com/news)

Built with ❤️ using React, Node.js, TypeScript, and modern web technologies

</div>
