// Player types
export interface Player {
  id: number
  name: string
  team: string
  position: "GK" | "DEF" | "MID" | "FWD"
  price: number
  form: number
  totalPoints: number
  goals: number
  assists: number
  cleanSheets: number
  saves?: number
  goalsConceded?: number
  bonus: number
  bps: number
  influence: number
  creativity: number
  threat: number
  ict_index: number
  selected_by_percent: number
  transfers_in_event: number
  transfers_out_event: number
  value_form: number
  value_season: number
  cost_change_event: number
  cost_change_event_fall: number
  cost_change_start: number
  cost_change_start_fall: number
  dreamteam_count: number
  in_dreamteam: boolean
  news: string
  news_added?: string
  status: string
  chance_of_playing_next_round?: number
  chance_of_playing_this_round?: number
  code: number
  web_name: string
  first_name: string
  second_name: string
  photo: string
  element_type: number
  team_code: number
  now_cost: number
}

// Team types
export interface Team {
  id: number
  name: string
  short_name: string
  strength: number
  strength_overall_home: number
  strength_overall_away: number
  strength_attack_home: number
  strength_attack_away: number
  strength_defence_home: number
  strength_defence_away: number
  team_division: string
  team_region: string
  code: number
  draw: number
  loss: number
  played: number
  points: number
  position: number
  unavailable: boolean
  win: number
  form: string
}

// Fantasy team types
export interface FantasyTeam {
  id: string
  name: string
  budget: number
  players: Player[]
  formation: string
  captain: Player
  viceCaptain: Player
  bench: Player[]
  totalValue: number
  remainingBudget: number
  expectedPoints: number
}

// AI recommendation types
export interface AIRecommendation {
  players: Player[]
  formation: string
  captain: Player
  viceCaptain: Player
  bench: Player[]
  reasoning: string
  expectedPoints: number
  riskLevel: "low" | "medium" | "high"
  strategy: string
}

// API response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    message: string
    code?: string
  }
}

// User preferences
export interface UserPreferences {
  budget: number
  preferredFormation?: string
  riskTolerance: "low" | "medium" | "high"
  preferredTeams?: string[]
  avoidTeams?: string[]
  captainStrategy?: "form" | "fixture" | "differential"
  chipStrategy?: "early" | "late" | "balanced"
}

// FPL API types
export interface FPLBootstrap {
  events: any[]
  game_settings: any
  phases: any[]
  teams: Team[]
  total_players: number
  elements: Player[]
  element_stats: any[]
  element_types: any[]
}

// AI service types
export interface AIServiceConfig {
  provider: "openai" | "anthropic"
  model: string
  maxTokens: number
  temperature: number
}
