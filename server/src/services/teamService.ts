import { FantasyTeam, UserPreferences, Player } from "../types"
import { FPLService } from "./fplService"
import { AIService } from "./aiService"

interface CreateTeamRequest {
  name: string
  budget: number
  preferences: UserPreferences
}

export class TeamService {
  private teams: Map<string, FantasyTeam> = new Map()
  private fplService: FPLService
  private aiService: AIService

  constructor() {
    this.fplService = new FPLService()
    this.aiService = new AIService()
  }

  async createTeam(request: CreateTeamRequest): Promise<FantasyTeam> {
    const id = this.generateTeamId()

    // Get AI recommendations for initial team
    const recommendation = await this.aiService.getRecommendations({
      budget: request.budget,
      preferences: request.preferences
    })

    const team: FantasyTeam = {
      id,
      name: request.name,
      budget: request.budget,
      players: recommendation.players,
      formation: recommendation.formation,
      captain: recommendation.captain,
      viceCaptain: recommendation.viceCaptain,
      bench: recommendation.bench,
      totalValue: this.calculateTeamValue(recommendation.players),
      remainingBudget: request.budget - this.calculateTeamValue(recommendation.players),
      expectedPoints: recommendation.expectedPoints
    }

    this.teams.set(id, team)
    return team
  }

  async getTeam(id: string): Promise<FantasyTeam | null> {
    return this.teams.get(id) || null
  }

  async updateTeam(id: string, updates: Partial<FantasyTeam>): Promise<FantasyTeam | null> {
    const team = this.teams.get(id)
    if (!team) {
      return null
    }

    const updatedTeam = { ...team, ...updates }

    // Recalculate values if players changed
    if (updates.players) {
      updatedTeam.totalValue = this.calculateTeamValue(updates.players)
      updatedTeam.remainingBudget = team.budget - updatedTeam.totalValue
    }

    this.teams.set(id, updatedTeam)
    return updatedTeam
  }

  async deleteTeam(id: string): Promise<boolean> {
    return this.teams.delete(id)
  }

  async getAllTeams(): Promise<FantasyTeam[]> {
    return Array.from(this.teams.values())
  }

  async validateTeam(team: FantasyTeam): Promise<{ valid: boolean; errors: string[] }> {
    const errors: string[] = []

    // Check team size
    if (team.players.length !== 15) {
      errors.push("Team must have exactly 15 players")
    }

    // Check position distribution
    const positions = team.players.map((p) => p.position)
    const gkCount = positions.filter((p) => p === "GK").length
    const defCount = positions.filter((p) => p === "DEF").length
    const midCount = positions.filter((p) => p === "MID").length
    const fwdCount = positions.filter((p) => p === "FWD").length

    if (gkCount < 2) errors.push("Team must have at least 2 goalkeepers")
    if (defCount < 3) errors.push("Team must have at least 3 defenders")
    if (midCount < 3) errors.push("Team must have at least 3 midfielders")
    if (fwdCount < 1) errors.push("Team must have at least 1 forward")

    // Check budget
    const totalValue = this.calculateTeamValue(team.players)
    if (totalValue > team.budget) {
      errors.push(`Team value (${totalValue}) exceeds budget (${team.budget})`)
    }

    // Check for duplicate players
    const playerIds = team.players.map((p) => p.id)
    const uniqueIds = new Set(playerIds)
    if (uniqueIds.size !== playerIds.length) {
      errors.push("Team contains duplicate players")
    }

    // Check captain and vice-captain are in team
    if (!team.players.find((p) => p.id === team.captain.id)) {
      errors.push("Captain must be in the team")
    }
    if (!team.players.find((p) => p.id === team.viceCaptain.id)) {
      errors.push("Vice-captain must be in the team")
    }

    return {
      valid: errors.length === 0,
      errors
    }
  }

  async getTeamStats(team: FantasyTeam): Promise<any> {
    const stats = {
      totalValue: team.totalValue,
      remainingBudget: team.remainingBudget,
      expectedPoints: team.expectedPoints,
      formation: team.formation,
      positionBreakdown: {
        GK: team.players.filter((p) => p.position === "GK").length,
        DEF: team.players.filter((p) => p.position === "DEF").length,
        MID: team.players.filter((p) => p.position === "MID").length,
        FWD: team.players.filter((p) => p.position === "FWD").length
      },
      teamBreakdown: this.getTeamBreakdown(team.players),
      averageForm: this.calculateAverageForm(team.players),
      totalPoints: this.calculateTotalPoints(team.players)
    }

    return stats
  }

  private generateTeamId(): string {
    return `team_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private calculateTeamValue(players: Player[]): number {
    return players.reduce((total, player) => total + player.price, 0)
  }

  private calculateTotalPoints(players: Player[]): number {
    return players.reduce((total, player) => total + player.totalPoints, 0)
  }

  private calculateAverageForm(players: Player[]): number {
    const totalForm = players.reduce((total, player) => total + player.form, 0)
    return totalForm / players.length
  }

  private getTeamBreakdown(players: Player[]): Record<string, number> {
    const breakdown: Record<string, number> = {}
    players.forEach((player) => {
      breakdown[player.team] = (breakdown[player.team] || 0) + 1
    })
    return breakdown
  }
}
