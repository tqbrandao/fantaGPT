import axios from "axios"
import { Player, FantasyTeam, AIRecommendation, UserPreferences, ApiResponse } from "../types"

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
})

// Player API calls
export const playerApi = {
  getPlayers: async (filters?: any): Promise<Player[]> => {
    const response = await api.get<ApiResponse<Player[]>>("/players", { params: filters })
    return response.data.data || []
  },

  getPlayerById: async (id: number): Promise<Player | null> => {
    const response = await api.get<ApiResponse<Player>>(`/players/${id}`)
    return response.data.data || null
  },

  getPlayerStats: async (id: number): Promise<any> => {
    const response = await api.get<ApiResponse<any>>(`/players/${id}/stats`)
    return response.data.data || null
  }
}

// Team API calls
export const teamApi = {
  createTeam: async (teamData: { name: string; budget: number; preferences: UserPreferences }): Promise<FantasyTeam> => {
    const response = await api.post<ApiResponse<FantasyTeam>>("/teams", teamData)
    return response.data.data!
  },

  getTeam: async (id: string): Promise<FantasyTeam | null> => {
    const response = await api.get<ApiResponse<FantasyTeam>>(`/teams/${id}`)
    return response.data.data || null
  },

  updateTeam: async (id: string, updates: Partial<FantasyTeam>): Promise<FantasyTeam | null> => {
    const response = await api.put<ApiResponse<FantasyTeam>>(`/teams/${id}`, updates)
    return response.data.data || null
  },

  deleteTeam: async (id: string): Promise<boolean> => {
    const response = await api.delete<ApiResponse<null>>(`/teams/${id}`)
    return response.data.success
  },

  optimizeTeam: async (id: string, options: { strategy?: string; riskLevel?: string }): Promise<FantasyTeam> => {
    const response = await api.post<ApiResponse<FantasyTeam>>(`/teams/${id}/optimize`, options)
    return response.data.data!
  }
}

// AI API calls
export const aiApi = {
  getRecommendations: async (request: { budget: number; preferences: UserPreferences; strategy?: string }): Promise<AIRecommendation> => {
    const response = await api.post<ApiResponse<AIRecommendation>>("/ai/recommendations", request)
    return response.data.data!
  },

  analyzeTeam: async (team: FantasyTeam, analysisType: string = "comprehensive"): Promise<any> => {
    const response = await api.post<ApiResponse<any>>("/ai/analyze", { team, analysisType })
    return response.data.data
  },

  analyzePlayer: async (playerId: number): Promise<any> => {
    const response = await api.get<ApiResponse<any>>(`/ai/player/${playerId}/analysis`)
    return response.data.data
  },

  getFormationSuggestions: async (request: { players: Player[]; budget: number; strategy?: string }): Promise<any> => {
    const response = await api.post<ApiResponse<any>>("/ai/formations", request)
    return response.data.data
  }
}

// Error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error)
    throw error
  }
)

export default api
