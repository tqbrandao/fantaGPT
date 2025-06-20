import React, { useState } from "react"
import { Search, BarChart3, TrendingUp, AlertCircle } from "lucide-react"

const PlayerAnalysis: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchTerm.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      // This would be replaced with actual API call
      // For now, showing mock data
      setTimeout(() => {
        setAnalysis({
          name: searchTerm,
          team: "Mock Team",
          position: "MID",
          price: 8.5,
          form: 7.2,
          totalPoints: 85,
          analysis: "This is a mock analysis of the player..."
        })
        setIsLoading(false)
      }, 1000)
    } catch (err) {
      setError("Failed to get player analysis. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Player Analysis</h1>
        <p className="text-xl text-gray-600">Get detailed insights and AI-powered analysis for any FPL player</p>
      </div>

      <div className="card mb-8">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="flex-1">
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search for a player (e.g., Haaland, Salah, Kane)" className="input-field" />
          </div>
          <button type="submit" disabled={isLoading || !searchTerm.trim()} className="btn-primary px-6 flex items-center space-x-2">
            <Search className="w-4 h-4" />
            <span>Analyze</span>
          </button>
        </form>
      </div>

      {error && (
        <div className="card bg-red-50 border-red-200">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700">{error}</span>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="card text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Analyzing player data...</p>
        </div>
      )}

      {analysis && (
        <div className="space-y-6">
          {/* Player Header */}
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{analysis.name}</h2>
                <p className="text-gray-600">{analysis.team}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary-600">£{analysis.price}m</div>
                <div className="text-sm text-gray-600">{analysis.position}</div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-600">{analysis.form}</div>
              <div className="text-sm text-gray-600">Form</div>
            </div>

            <div className="card text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-600">{analysis.totalPoints}</div>
              <div className="text-sm text-gray-600">Total Points</div>
            </div>

            <div className="card text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-purple-600">85%</div>
              <div className="text-sm text-gray-600">Ownership</div>
            </div>
          </div>

          {/* AI Analysis */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-primary-600" />
              <span>AI Analysis</span>
            </h3>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">{analysis.analysis}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PlayerAnalysis
