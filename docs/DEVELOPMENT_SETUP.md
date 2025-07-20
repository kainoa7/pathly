# JARVUS Development Setup Guide

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **npm** or **yarn**
- **Git**
- **Code Editor** (VS Code recommended)

### 1. Clone Repository
```bash
git clone <repository-url>
cd pathly
```

### 2. Backend Setup
```bash
cd backend
npm install
```

**Create `.env` file:**
```env
# Gmail OAuth (Optional - Mock mode works without)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# OpenAI (Optional - Preview mode works without)
OPENAI_API_KEY=your_openai_api_key_here

# ElevenLabs (Future - Not required yet)
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here

# Database
DATABASE_URL="file:./prisma/dev.db"
```

**Initialize Database:**
```bash
npx prisma migrate dev
npx prisma generate
```

**Start Backend:**
```bash
npm run dev
# Backend runs on http://localhost:3001
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

## 🧪 Mock vs Real Mode

### Mock Mode (Default)
- **Gmail**: Uses fake career emails from `backend/src/data/mockEmails.ts`
- **AI Analysis**: Simulated responses with realistic content
- **Calendar**: Mock scheduling conflicts and recommendations
- **Resume**: Fake enhancement demos
- **No API keys required**

### Real Mode (Future)
- **Gmail**: Requires Google OAuth setup
- **AI**: Requires OpenAI API key
- **Voice**: Requires ElevenLabs API key
- **Full functionality with real data**

## 🔧 Current Architecture

### File Structure
```
pathly/
├── backend/
│   ├── src/
│   │   ├── api/
│   │   │   └── gmail/
│   │   │       └── routes.ts        # Mock Gmail API
│   │   ├── data/
│   │   │   └── mockEmails.ts        # Mock email data
│   │   ├── app.ts                   # Express app
│   │   └── server.ts                # Server entry
│   ├── prisma/
│   │   └── schema.prisma            # Database schema
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── AIAssistantInterface.tsx  # Main JARVUS UI
│   │   ├── context/
│   │   ├── utils/
│   │   └── main.tsx
│   └── package.json
└── docs/                            # Documentation
```

### Key Components

#### AIAssistantInterface.tsx (~2,154 lines)
- **Mail Section**: Mock Gmail integration with career emails
- **Calendar Section**: AI scheduling assistant with conflict detection
- **Resume Section**: Live AI enhancement and ATS scoring
- **Brain Section**: Career intelligence and salary insights  
- **Settings Section**: Voice, privacy, and interview prep controls

#### Mock Data Files
- `backend/src/data/mockEmails.ts`: Realistic career emails
- `backend/src/api/gmail/routes.ts`: Mock API endpoints

## 🎯 Testing the Setup

### 1. Verify Backend
```bash
curl http://localhost:3001/api/gmail/init
# Should return mock authentication URL
```

### 2. Verify Frontend
- Navigate to `http://localhost:5173`
- Click through all 5 JARVUS sections
- Test mock Gmail connection

### 3. Expected Behavior
- **Mail**: Shows career emails from Meta, Netflix, OpenAI, Tesla, Google
- **Calendar**: Displays scheduling conflicts and AI recommendations
- **Resume**: Demonstrates real-time AI enhancement
- **Brain**: Shows career intelligence dashboard
- **Settings**: Comprehensive configuration options

## 🔍 Troubleshooting

### Common Issues

#### Backend Won't Start
```bash
# Kill existing processes
pkill -f "ts-node-dev"

# Restart
npm run dev
```

#### Frontend Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

#### Database Issues
```bash
# Reset database
npx prisma migrate reset
npx prisma generate
```

#### CSP (Content Security Policy) Errors
- We've added CSP headers for inline scripts
- If popup issues persist, the frontend uses direct mock connection

### Port Conflicts
- **Backend**: Default port 3001
- **Frontend**: Default port 5173
- Update in respective config files if needed

## 📝 Development Workflow

### 1. Mock Development (Current)
- All features work with mock data
- No API keys required
- Fast iteration and testing

### 2. Real Implementation (Future)
- Add real API keys to `.env`
- Replace mock endpoints with real integrations
- Test with actual data

### 3. Feature Development
- Start with mock implementation
- Validate UX and functionality
- Replace with real integration
- Keep mock as fallback

## 🛡️ Security Notes

### Environment Variables
- Never commit `.env` files
- Use different keys for dev/staging/production
- Mock mode is safe for development

### OAuth Setup (When Ready)
1. **Google Cloud Console**
   - Create OAuth 2.0 credentials
   - Add authorized origins: `http://localhost:5173`
   - Add redirect URIs: `http://localhost:3001/api/gmail/callback`

2. **Gmail API**
   - Enable Gmail API
   - Set up consent screen
   - Add test users for development

## 🚀 Deployment Notes

### Current Status
- **Development**: Full mock implementation working
- **Staging**: Not set up yet
- **Production**: Not deployed yet

### Future Deployment Strategy
- Environment-specific configurations
- Real API keys for production
- Mock fallbacks for development
- Progressive feature rollout

## 📊 Performance

### Current Metrics
- **Frontend Bundle**: ~2MB (with animations)
- **Load Time**: <2 seconds on local
- **Memory Usage**: ~50MB for backend
- **Animations**: 60fps with Framer Motion

### Optimization Opportunities
- Code splitting for large components
- Lazy loading for sections
- API response caching
- Image optimization

## 🎯 Next Steps

1. **Complete OAuth setup** for real Gmail integration
2. **Add OpenAI integration** for real AI analysis
3. **Implement ElevenLabs** for voice features
4. **Add real calendar APIs**
5. **Set up deployment pipeline**

## 📞 Getting Help

- Check existing documentation in `docs/`
- Review mock implementations for patterns
- Test with mock data first
- Document any new features or fixes 