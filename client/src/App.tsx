import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import TeamBuilder from "./pages/TeamBuilder"
import PlayerAnalysis from "./pages/PlayerAnalysis"
import TeamAnalysis from "./pages/TeamAnalysis"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/team-builder" element={<TeamBuilder />} />
            <Route path="/player-analysis" element={<PlayerAnalysis />} />
            <Route path="/team-analysis" element={<TeamAnalysis />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
