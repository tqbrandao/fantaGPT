import React, { useState } from "react"
import { Users, BarChart3, AlertCircle, Upload } from "lucide-react"

const TeamAnalysis: React.FC = () => {
  const [teamData, setTeamData] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!teamData.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      // This would be replaced with actual API call
      // For now, showing mock data
      setTimeout(() => {
        setAnalysis({
          teamName: "My FPL Team",
          formation: "4-4-2",
          totalValue: 99.5,
          expectedPoints: 78.5,
          strengths: ["Strong midfield", "Good value picks"],
          weaknesses: ["Weak bench", "No premium defenders"],
          recommendations: ["Consider upgrading defense", "Add more differentials"]
        })
        setIsLoading(false)
      }, 1000)
    } catch (err) {
      setError("Failed to analyze team. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Team Analysis</h1>
        <p className="text-xl text-gray-600">Analyze your existing FPL team and get AI-powered improvement suggestions</p>
      </div>

      <div className="card mb-8">
        <h2 className="text-2xl font-semibold mb-6 flex items-center space-x-2">
          <Upload className="w-6 h-6 text-primary-600" />
          <span>Upload Your Team</span>
        </h2>

        <form onSubmit={handleAnalyze} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Team Data (JSON format)</label>
            <textarea value={teamData} onChange={(e) => setTeamData(e.target.value)} placeholder="Paste your team data in JSON format or enter player names..." className="input-field h-32 resize-none" />
            <p className="text-sm text-gray-500 mt-1">You can paste your team data or manually enter player information</p>
          </div>

          <button type="submit" disabled={isLoading || !teamData.trim()} className="w-full btn-primary py-3 text-lg flex items-center justify-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>Analyze Team</span>
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
          <p className="text-gray-600">Analyzing your team...</p>
        </div>
      )}

      {analysis && (
        <div className="space-y-6">
          {/* Team Summary */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Team Summary</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">{analysis.formation}</div>
                <div className="text-sm text-gray-600">Formation</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">£{analysis.totalValue}m</div>
                <div className="text-sm text-gray-600">Team Value</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{analysis.expectedPoints}</div>
                <div className="text-sm text-gray-600">Expected Points</div>
              </div>
            </div>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-xl font-semibold mb-4 text-green-700">Strengths</h3>
              <ul className="space-y-2">
                {analysis.strengths.map((strength: string, index: number) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold mb-4 text-red-700">Areas for Improvement</h3>
              <ul className="space-y-2">
                {analysis.weaknesses.map((weakness: string, index: number) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-primary-600" />
              <span>AI Recommendations</span>
            </h3>
            <div className="space-y-3">
              {analysis.recommendations.map((rec: string, index: number) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-primary-50 rounded-lg">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  <span className="text-gray-700">{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TeamAnalysis
