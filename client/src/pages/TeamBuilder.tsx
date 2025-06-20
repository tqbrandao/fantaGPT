import React, { useState } from "react"
import { Brain, Target, AlertCircle } from "lucide-react"

interface UserPreferences {
  budget: number
  riskTolerance: "low" | "medium" | "high"
  preferredFormation?: string
}

const TeamBuilder: React.FC = () => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    budget: 100,
    riskTolerance: "medium"
  })
  const [isLoading, setIsLoading] = useState(false)
  const [recommendation, setRecommendation] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/ai/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          budget: preferences.budget,
          preferences,
          strategy: "balanced"
        })
      })

      if (!response.ok) {
        throw new Error("Failed to get recommendations")
      }

      const data = await response.json()
      setRecommendation(data.data)
    } catch (err) {
      setError("Failed to get AI recommendations. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">AI Team Builder</h1>
        <p className="text-xl text-gray-600">Get intelligent recommendations for your Fantasy Premier League team</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-2xl font-semibold mb-6 flex items-center space-x-2">
            <Target className="w-6 h-6 text-primary-600" />
            <span>Team Preferences</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget (£m)</label>
              <input
                type="number"
                min="80"
                max="120"
                value={preferences.budget}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    budget: parseInt(e.target.value)
                  })
                }
                className="input-field"
                placeholder="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Risk Tolerance</label>
              <select
                value={preferences.riskTolerance}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    riskTolerance: e.target.value as "low" | "medium" | "high"
                  })
                }
                className="input-field"
              >
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
              </select>
            </div>

            <button type="submit" disabled={isLoading} className="w-full btn-primary py-3 text-lg flex items-center justify-center space-x-2">
              <Brain className="w-5 h-5" />
              <span>Get AI Recommendations</span>
            </button>
          </form>
        </div>

        <div className="card">
          <h2 className="text-2xl font-semibold mb-6 flex items-center space-x-2">
            <Brain className="w-6 h-6 text-primary-600" />
            <span>AI Recommendations</span>
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-red-700">{error}</span>
              </div>
            </div>
          )}

          {recommendation ? (
            <div className="space-y-6">
              <div className="bg-primary-50 rounded-lg p-4">
                <h3 className="font-semibold text-primary-800 mb-2">Team Summary</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Formation:</span>
                    <span className="ml-2 font-medium">{recommendation.formation}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Expected Points:</span>
                    <span className="ml-2 font-medium">{recommendation.expectedPoints}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Brain className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Enter your preferences and get AI-powered team recommendations</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TeamBuilder
