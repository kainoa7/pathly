# Pathly Backend

## Phase 1 Setup Complete ✅

This is the Node.js/Express.js backend for Pathly with TypeScript.

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
   ```

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

- **GET** `/health` - Health check
- **GET** `/api/test-db` - Database connection test
- **POST** `/api/test-user` - Create test user

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