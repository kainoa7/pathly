# Jarvus Backend

## Overview

This is the Node.js/Express.js backend for Jarvus with TypeScript.

### Tech Stack
- **Node.js** with **Express.js**
- **TypeScript** for type safety
- **Prisma** ORM with SQLite database
- **CORS**, **Helmet**, **Morgan** for middleware
- **ts-node-dev** for development

### Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file with:
   ```
   PORT=3001
   NODE_ENV=development
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your-super-secret-key-change-this-in-production"
   
   # AI API Keys (for JARVUS AI Assistant - Premium Feature)
   OPENAI_API_KEY="your-openai-api-key-here"
   ELEVENLABS_API_KEY="your-elevenlabs-api-key-here" 
   ELEVENLABS_VOICE_ID="ErXwobaYiN019PkySvjV"
   ```
   
   **Note**: AI keys are optional - features work in fallback mode without them.

3. **Database Setup**
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

### Available Endpoints

#### **Core Endpoints**
- **GET** `/health` - Health check
- **GET** `/api/test-db` - Database connection test
- **POST** `/api/test-user` - Create test user

#### **Authentication**
- **POST** `/api/auth/signup` - User registration
- **POST** `/api/auth/signin` - User login
- **GET** `/api/auth/me` - Get current user

#### **AI Assistant (Premium Feature)**
- **POST** `/api/ai/chat` - Chat with JARVUS AI
- **POST** `/api/ai/tts` - Text-to-speech conversion
- **GET** `/api/ai/health` - AI services health check

#### **User Management**
- **GET** `/api/users` - Get all users (Admin)
- **PUT** `/api/users/:id` - Update user
- **DELETE** `/api/users/:id` - Delete user

#### **Quiz & Careers**
- **POST** `/api/quiz/submit` - Submit quiz responses
- **GET** `/api/careers` - Get career recommendations

### Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts     # Prisma client setup
│   ├── api/                # API routes (future)
│   ├── models/             # Database models (future)
│   ├── services/           # Business logic (future)
│   ├── middleware/         # Custom middleware (future)
│   ├── utils/              # Utility functions (future)
│   ├── types/              # TypeScript types (future)
│   ├── app.ts              # Express app setup
│   └── server.ts           # Server entry point
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Database migrations
└── package.json
```

### Next Steps (Phase 2)
- [ ] Authentication system (JWT + GitHub OAuth)
- [ ] User management APIs
- [ ] Quiz and career path APIs
- [ ] Admin panel setup

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run tests
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations 