import { Request, Response } from "express"
import { TeamService } from "../services/teamService"
import { AIService } from "../services/aiService"
import { ApiResponse, FantasyTeam, UserPreferences } from "../types"

const teamService = new TeamService()
const aiService = new AIService()

export const createTeam = async (req: Request, res: Response) => {
  try {
    const { name, budget, preferences } = req.body

    const team = await teamService.createTeam({
      name,
      budget,
      preferences: preferences as UserPreferences
    })

    const response: ApiResponse<FantasyTeam> = {
      success: true,
      data: team
    }

    res.status(201).json(response)
  } catch (error) {
    console.error("Error creating team:", error)
    res.status(500).json({
      success: false,
      error: { message: "Failed to create team" }
    })
  }
}

export const getTeam = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const team = await teamService.getTeam(id)

    if (!team) {
      return res.status(404).json({
        success: false,
        error: { message: "Team not found" }
      })
    }

    const response: ApiResponse<FantasyTeam> = {
      success: true,
      data: team
    }

    res.json(response)
  } catch (error) {
    console.error("Error fetching team:", error)
    res.status(500).json({
      success: false,
      error: { message: "Failed to fetch team" }
    })
  }
}

export const updateTeam = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const updates = req.body

    const team = await teamService.updateTeam(id, updates)

    if (!team) {
      return res.status(404).json({
        success: false,
        error: { message: "Team not found" }
      })
    }

    const response: ApiResponse<FantasyTeam> = {
      success: true,
      data: team
    }

    res.json(response)
  } catch (error) {
    console.error("Error updating team:", error)
    res.status(500).json({
      success: false,
      error: { message: "Failed to update team" }
    })
  }
}

export const deleteTeam = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const deleted = await teamService.deleteTeam(id)

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: { message: "Team not found" }
      })
    }

    res.json({
      success: true,
      message: "Team deleted successfully"
    })
  } catch (error) {
    console.error("Error deleting team:", error)
    res.status(500).json({
      success: false,
      error: { message: "Failed to delete team" }
    })
  }
}

export const optimizeTeam = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { strategy, riskLevel } = req.body

    const team = await teamService.getTeam(id)
    if (!team) {
      return res.status(404).json({
        success: false,
        error: { message: "Team not found" }
      })
    }

    const optimizedTeam = await aiService.optimizeTeam(team, {
      strategy,
      riskLevel
    })

    const response: ApiResponse<FantasyTeam> = {
      success: true,
      data: optimizedTeam
    }

    res.json(response)
  } catch (error) {
    console.error("Error optimizing team:", error)
    res.status(500).json({
      success: false,
      error: { message: "Failed to optimize team" }
    })
  }
}
