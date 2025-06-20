# FantaGPT - AI Fantasy Football Assistant

An intelligent AI-powered assistant to help you build the perfect fantasy football team using data from the Fantasy Premier League (FPL) API and AI recommendations.

## 🏗️ Architecture

```
User Inputs Team + Budget → Backend Calls FPL API → Process Player Data & Stats →
Feed into GPT-4/Claude → AI Generates Suggestions → React Frontend Shows Recommendations
```

## 🚀 Features

- **Real-time FPL Data**: Live player statistics and performance data
- **AI-Powered Recommendations**: GPT-4/Claude integration for intelligent team suggestions
- **Budget Management**: Smart budget allocation across positions
- **Player Analysis**: Detailed player statistics and form analysis
- **Team Optimization**: AI-driven team composition recommendations
- **Modern UI**: Beautiful React frontend with responsive design

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **AI**: OpenAI GPT-4 / Anthropic Claude
- **Data**: Fantasy Premier League API
- **Database**: SQLite (for caching)

## 📦 Quick Installation

1. **Clone and install**

   ```bash
   git clone <repository-url>
   cd fantaGPT
   chmod +x install.sh
   ./install.sh
   ```

2. **Set up environment variables**

   ```bash
   # Edit server/.env and add your API keys:
   OPENAI_API_KEY=your_openai_api_key
   ANTHROPIC_API_KEY=your_anthropic_api_key
   PORT=5000
   ```

3. **Start the application**

   ```bash
   npm run dev
   ```

   This will start:

   - Backend server on http://localhost:5000
   - Frontend on http://localhost:3000

## 🔧 Manual Installation

If you prefer to install manually:

1. **Install root dependencies**

   ```bash
   npm install
   ```

2. **Install backend dependencies**

   ```bash
   cd server
   npm install
   cd ..
   ```

3. **Install frontend dependencies**

   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Set up environment**

   ```bash
   cp server/env.example server/.env
   # Edit server/.env with your API keys
   ```

5. **Start development servers**
   ```bash
   npm run dev
   ```

## 🔑 API Keys Required

You'll need to obtain API keys for:

- **OpenAI API**: Get from [OpenAI Platform](https://platform.openai.com/api-keys)
- **Anthropic API**: Get from [Anthropic Console](https://console.anthropic.com/)

## 🎯 Usage

1. **Team Builder**: Enter your budget and preferences to get AI-powered team recommendations
2. **Player Analysis**: Search for specific players and get detailed analysis
3. **Team Analysis**: Upload your existing team for optimization suggestions

## 📁 Project Structure

```
fantaGPT/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── types/         # TypeScript types
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── services/      # Business logic
│   │   ├── routes/        # API routes
│   │   └── utils/         # Utility functions
├── install.sh             # Installation script
└── package.json
```

## 🚀 Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run server` - Start only the backend server
- `npm run client` - Start only the frontend
- `npm run build` - Build the frontend for production
- `npm run install-all` - Install all dependencies

## 🔍 API Endpoints

### Players

- `GET /api/players` - Get all players with filters
- `GET /api/players/:id` - Get specific player
- `GET /api/players/:id/stats` - Get player statistics

### Teams

- `POST /api/teams` - Create new fantasy team
- `GET /api/teams/:id` - Get team by ID
- `PUT /api/teams/:id` - Update team
- `DELETE /api/teams/:id` - Delete team
- `POST /api/teams/:id/optimize` - Optimize team with AI

### AI

- `POST /api/ai/recommendations` - Get AI team recommendations
- `POST /api/ai/analyze` - Analyze existing team
- `GET /api/ai/player/:id/analysis` - Get player analysis
- `POST /api/ai/formations` - Get formation suggestions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## ⚠️ Disclaimer

This application is for educational and entertainment purposes. Fantasy Premier League decisions should be made based on your own research and judgment. The AI recommendations are suggestions only and do not guarantee success.
