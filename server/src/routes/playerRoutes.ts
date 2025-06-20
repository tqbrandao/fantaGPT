import { Router } from "express"
import { getPlayers, getPlayerById, getPlayerStats } from "../controllers/playerController"

const router = Router()

// Get all players with filters
router.get("/", getPlayers)

// Get specific player by ID
router.get("/:id", getPlayerById)

// Get player statistics
router.get("/:id/stats", getPlayerStats)

export default router
