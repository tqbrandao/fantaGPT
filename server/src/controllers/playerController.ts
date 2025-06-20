import { Request, Response } from "express"
import { FPLService } from "../services/fplService"
import { ApiResponse, Player } from "../types"

const fplService = new FPLService()

export const getPlayers = async (req: Request, res: Response) => {
  try {
    const { position, team, minPrice, maxPrice, sortBy = "form" } = req.query

    const filters = {
      position: position as string,
      team: team as string,
      minPrice: minPrice ? parseInt(minPrice as string) : undefined,
      maxPrice: maxPrice ? parseInt(maxPrice as string) : undefined,
      sortBy: sortBy as string
    }

    const players = await fplService.getPlayers(filters)

    const response: ApiResponse<Player[]> = {
      success: true,
      data: players
    }

    res.json(response)
  } catch (error) {
    console.error("Error fetching players:", error)
    res.status(500).json({
      success: false,
      error: { message: "Failed to fetch players" }
    })
  }
}

export const getPlayerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const player = await fplService.getPlayerById(parseInt(id))

    if (!player) {
      return res.status(404).json({
        success: false,
        error: { message: "Player not found" }
      })
    }

    const response: ApiResponse<Player> = {
      success: true,
      data: player
    }

    res.json(response)
  } catch (error) {
    console.error("Error fetching player:", error)
    res.status(500).json({
      success: false,
      error: { message: "Failed to fetch player" }
    })
  }
}

export const getPlayerStats = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const stats = await fplService.getPlayerStats(parseInt(id))

    if (!stats) {
      return res.status(404).json({
        success: false,
        error: { message: "Player stats not found" }
      })
    }

    const response: ApiResponse<any> = {
      success: true,
      data: stats
    }

    res.json(response)
  } catch (error) {
    console.error("Error fetching player stats:", error)
    res.status(500).json({
      success: false,
      error: { message: "Failed to fetch player stats" }
    })
  }
}
