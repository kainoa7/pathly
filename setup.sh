#!/bin/bash

# PATHLY/JARVUS Quick Setup Script
# Run with: chmod +x setup.sh && ./setup.sh

echo "🚀 Setting up PATHLY/JARVUS on your machine..."

# Check Node.js version
echo "📋 Checking Node.js version..."
node_version=$(node --version 2>/dev/null | sed 's/v//')
if [[ -z "$node_version" ]]; then
    echo "❌ Node.js not found. Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

major_version=$(echo $node_version | cut -d. -f1)
if [[ $major_version -lt 18 ]]; then
    echo "❌ Node.js version $node_version found. Please upgrade to 18+"
    exit 1
fi

echo "✅ Node.js $node_version detected"

# Install dependencies
echo "📦 Installing dependencies..."
echo "  📱 Frontend dependencies..."
cd frontend && npm install --silent

echo "  🔧 Backend dependencies..."
cd ../backend && npm install --silent
cd ..

# Setup environment files
echo "🔧 Creating environment files..."

# Backend .env
cat > backend/.env << EOF
PORT=3001
NODE_ENV=development
DATABASE_URL="file:./dev.db"
JWT_SECRET="pathly-dev-secret-$(date +%s)"

# AI API Keys (optional - for JARVUS AI features)
# Get these from:
# OpenAI: https://platform.openai.com/api-keys
# ElevenLabs: https://elevenlabs.io/app/settings/api-keys
OPENAI_API_KEY=""
ELEVENLABS_API_KEY=""
ELEVENLABS_VOICE_ID="ErXwobaYiN019PkySvjV"
EOF

# Frontend .env
cat > frontend/.env << EOF
VITE_API_BASE_URL=http://localhost:3001
EOF

echo "✅ Environment files created"

# Setup database
echo "🗃️  Setting up database..."
cd backend
npx prisma generate --silent
npx prisma db push --silent
cd ..

echo "✅ Database setup complete"

# Health check
echo "🏥 Running health checks..."
echo "Starting backend temporarily for health check..."
cd backend
npm run dev > /dev/null 2>&1 &
BACKEND_PID=$!
cd ..

sleep 3

# Check if backend is responding
if curl -s http://localhost:3001/health > /dev/null; then
    echo "✅ Backend health check passed"
else
    echo "⚠️  Backend health check failed (this might be normal)"
fi

# Stop temporary backend
kill $BACKEND_PID 2>/dev/null

echo ""
echo "🎉 Setup complete! To start development:"
echo ""
echo "Terminal 1 (Backend):"
echo "  cd backend && npm run dev"
echo ""
echo "Terminal 2 (Frontend):"
echo "  cd frontend && npm run dev"
echo ""
echo "Then visit: http://localhost:5173"
echo ""
echo "📝 To add AI features, edit backend/.env and add your API keys"
echo "🔗 OpenAI: https://platform.openai.com/api-keys"
echo "🔗 ElevenLabs: https://elevenlabs.io/app/settings/api-keys"
echo ""
echo "Happy coding! 🚀" 