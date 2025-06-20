import { Router } from "express"
import { createTeam, getTeam, updateTeam, deleteTeam, optimizeTeam } from "../controllers/teamController"

const router = Router()

// Create a new fantasy team
router.post("/", createTeam)

// Get team by ID
router.get("/:id", getTeam)

// Update team
router.put("/:id", updateTeam)

// Delete team
router.delete("/:id", deleteTeam)

// Optimize team with AI
router.post("/:id/optimize", optimizeTeam)

export default router
