import { Router } from "express"
import { getRecommendations, analyzeTeam, getPlayerAnalysis, getFormationSuggestions } from "../controllers/aiController"

const router = Router()

// Get AI recommendations for team building
router.post("/recommendations", getRecommendations)

// Analyze existing team
router.post("/analyze", analyzeTeam)

// Get AI analysis for specific player
router.get("/player/:id/analysis", getPlayerAnalysis)

// Get formation suggestions
router.post("/formations", getFormationSuggestions)

export default router
