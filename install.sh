#!/bin/bash

echo "🚀 Installing FantaGPT - AI Fantasy Football Assistant"
echo "=================================================="

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd server
npm install
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd client
npm install
cd ..

# Create environment file
echo "🔧 Setting up environment..."
if [ ! -f "server/.env" ]; then
    cp server/env.example server/.env
    echo "✅ Created server/.env file"
    echo "⚠️  Please edit server/.env and add your API keys:"
    echo "   - OPENAI_API_KEY"
    echo "   - ANTHROPIC_API_KEY"
else
    echo "✅ server/.env already exists"
fi

echo ""
echo "🎉 Installation complete!"
echo ""
echo "Next steps:"
echo "1. Edit server/.env and add your API keys"
echo "2. Run 'npm run dev' to start both servers"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "Happy fantasy football managing! ⚽" 