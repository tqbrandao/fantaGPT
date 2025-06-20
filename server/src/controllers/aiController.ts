import { Request, Response } from "express"
import { AIService } from "../services/aiService"
import { FPLService } from "../services/fplService"
import { ApiResponse, AIRecommendation, UserPreferences } from "../types"

const aiService = new AIService()
const fplService = new FPLService()

export const getRecommendations = async (req: Request, res: Response) => {
  try {
    const { budget, preferences, strategy } = req.body

    const recommendation = await aiService.getRecommendations({
      budget,
      preferences: preferences as UserPreferences,
      strategy
    })

    const response: ApiResponse<AIRecommendation> = {
      success: true,
      data: recommendation
    }

    res.json(response)
  } catch (error) {
    console.error("Error getting recommendations:", error)
    res.status(500).json({
      success: false,
      error: { message: "Failed to get recommendations" }
    })
  }
}

export const analyzeTeam = async (req: Request, res: Response) => {
  try {
    const { team, analysisType = "comprehensive" } = req.body

    const analysis = await aiService.analyzeTeam(team, analysisType)

    const response: ApiResponse<any> = {
      success: true,
      data: analysis
    }

    res.json(response)
  } catch (error) {
    console.error("Error analyzing team:", error)
    res.status(500).json({
      success: false,
      error: { message: "Failed to analyze team" }
    })
  }
}

export const getPlayerAnalysis = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const player = await fplService.getPlayerById(parseInt(id))

    if (!player) {
      return res.status(404).json({
        success: false,
        error: { message: "Player not found" }
      })
    }

    const analysis = await aiService.analyzePlayer(player)

    const response: ApiResponse<any> = {
      success: true,
      data: analysis
    }

    res.json(response)
  } catch (error) {
    console.error("Error analyzing player:", error)
    res.status(500).json({
      success: false,
      error: { message: "Failed to analyze player" }
    })
  }
}

export const getFormationSuggestions = async (req: Request, res: Response) => {
  try {
    const { players, budget, strategy } = req.body

    const suggestions = await aiService.getFormationSuggestions({
      players,
      budget,
      strategy
    })

    const response: ApiResponse<any> = {
      success: true,
      data: suggestions
    }

    res.json(response)
  } catch (error) {
    console.error("Error getting formation suggestions:", error)
    res.status(500).json({
      success: false,
      error: { message: "Failed to get formation suggestions" }
    })
  }
}
