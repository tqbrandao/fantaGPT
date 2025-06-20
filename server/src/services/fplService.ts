import axios from "axios"
import { Player, Team, FPLBootstrap } from "../types"

interface PlayerFilters {
  position?: string
  team?: string
  minPrice?: number
  maxPrice?: number
  sortBy?: string
}

export class FPLService {
  private baseUrl = "https://fantasy.premierleague.com/api"
  private cache: Map<string, any> = new Map()
  private cacheTimeout = 5 * 60 * 1000 // 5 minutes

  private async fetchWithCache<T>(url: string): Promise<T> {
    const cached = this.cache.get(url)
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data
    }

    try {
      const response = await axios.get<T>(url)
      this.cache.set(url, {
        data: response.data,
        timestamp: Date.now()
      })
      return response.data
    } catch (error) {
      console.error(`Error fetching from FPL API: ${url}`, error)
      throw new Error("Failed to fetch data from FPL API")
    }
  }

  async getBootstrapData(): Promise<FPLBootstrap> {
    return this.fetchWithCache<FPLBootstrap>(`${this.baseUrl}/bootstrap-static/`)
  }

  async getPlayers(filters: PlayerFilters = {}): Promise<Player[]> {
    const bootstrap = await this.getBootstrapData()
    let players = bootstrap.elements as Player[]

    // Apply filters
    if (filters.position) {
      const positionMap = { GK: 1, DEF: 2, MID: 3, FWD: 4 }
      const positionId = positionMap[filters.position as keyof typeof positionMap]
      players = players.filter((p) => p.element_type === positionId)
    }

    if (filters.team) {
      const team = bootstrap.teams.find((t) => t.name.toLowerCase().includes(filters.team!.toLowerCase()) || t.short_name.toLowerCase().includes(filters.team!.toLowerCase()))
      if (team) {
        players = players.filter((p) => p.team_code === team.code)
      }
    }

    if (filters.minPrice) {
      players = players.filter((p) => p.now_cost >= filters.minPrice!)
    }

    if (filters.maxPrice) {
      players = players.filter((p) => p.now_cost <= filters.maxPrice!)
    }

    // Sort players
    const sortBy = filters.sortBy || "form"
    players.sort((a, b) => {
      switch (sortBy) {
        case "form":
          return parseFloat(b.form) - parseFloat(a.form)
        case "points":
          return b.total_points - a.total_points
        case "value":
          return b.value_form - a.value_form
        case "price":
          return a.now_cost - b.now_cost
        default:
          return parseFloat(b.form) - parseFloat(a.form)
      }
    })

    return players
  }

  async getPlayerById(id: number): Promise<Player | null> {
    const bootstrap = await this.getBootstrapData()
    const player = bootstrap.elements.find((p) => p.id === id)
    return player || null
  }

  async getPlayerStats(id: number): Promise<any> {
    try {
      const [playerHistory, playerFixtures] = await Promise.all([this.fetchWithCache(`${this.baseUrl}/element-summary/${id}/`), this.fetchWithCache(`${this.baseUrl}/fixtures/`)])

      return {
        history: playerHistory,
        fixtures: playerFixtures.filter((f: any) => f.stats && f.stats.some((s: any) => s.element === id))
      }
    } catch (error) {
      console.error(`Error fetching player stats for ID ${id}:`, error)
      return null
    }
  }

  async getTeams(): Promise<Team[]> {
    const bootstrap = await this.getBootstrapData()
    return bootstrap.teams
  }

  async getTeamById(id: number): Promise<Team | null> {
    const teams = await this.getTeams()
    return teams.find((t) => t.id === id) || null
  }

  async getCurrentGameweek(): Promise<number> {
    const bootstrap = await this.getBootstrapData()
    const currentEvent = bootstrap.events.find((e) => e.is_current)
    return currentEvent ? currentEvent.id : 1
  }

  async getFixtures(): Promise<any[]> {
    return this.fetchWithCache(`${this.baseUrl}/fixtures/`)
  }

  async getLiveData(gameweek: number): Promise<any> {
    return this.fetchWithCache(`${this.baseUrl}/event/${gameweek}/live/`)
  }
}
