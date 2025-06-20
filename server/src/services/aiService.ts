import OpenAI from "openai"
import Anthropic from "@anthropic-ai/sdk"
import { Player, FantasyTeam, AIRecommendation, UserPreferences, AIServiceConfig } from "../types"

interface RecommendationRequest {
  budget: number
  preferences: UserPreferences
  strategy?: string
}

interface FormationRequest {
  players: Player[]
  budget: number
  strategy?: string
}

export class AIService {
  private openai: OpenAI
  private anthropic: Anthropic
  private config: AIServiceConfig

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })

    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    })

    this.config = {
      provider: "openai",
      model: "gpt-4",
      maxTokens: 2000,
      temperature: 0.7
    }
  }

  private async generatePrompt(context: string, task: string): Promise<string> {
    return `You are an expert Fantasy Premier League (FPL) analyst and AI assistant. 

${context}

${task}

Please provide detailed, actionable advice based on current FPL data, player form, fixtures, and statistical analysis. Consider:
- Player form and recent performance
- Upcoming fixtures and difficulty
- Price value and budget efficiency
- Team structure and formation balance
- Captain and vice-captain choices
- Risk vs reward assessment

Format your response as structured JSON when appropriate, or clear, detailed text for analysis.`
  }

  async getRecommendations(request: RecommendationRequest): Promise<AIRecommendation> {
    const context = `
Budget: £${request.budget}m
Risk Tolerance: ${request.preferences.riskTolerance}
Preferred Formation: ${request.preferences.preferredFormation || "Any"}
Preferred Teams: ${request.preferences.preferredTeams?.join(", ") || "None specified"}
Teams to Avoid: ${request.preferences.avoidTeams?.join(", ") || "None specified"}
Strategy: ${request.strategy || "Balanced"}
    `

    const task = `
Generate a complete FPL team recommendation including:
1. 15 players (2 GK, 5 DEF, 5 MID, 3 FWD)
2. Optimal formation
3. Captain and vice-captain selections
4. Bench order
5. Detailed reasoning for each selection
6. Expected points projection
7. Risk assessment
8. Strategy explanation

Return as JSON with the following structure:
{
  "players": [player objects],
  "formation": "4-4-2",
  "captain": player object,
  "viceCaptain": player object,
  "bench": [player objects],
  "reasoning": "detailed explanation",
  "expectedPoints": number,
  "riskLevel": "low|medium|high",
  "strategy": "strategy explanation"
}
    `

    const prompt = await this.generatePrompt(context, task)

    if (this.config.provider === "openai") {
      return this.callOpenAI(prompt)
    } else {
      return this.callAnthropic(prompt)
    }
  }

  async analyzeTeam(team: FantasyTeam, analysisType: string = "comprehensive"): Promise<any> {
    const context = `
Team Analysis Request:
Team Name: ${team.name}
Budget Used: £${team.totalValue}m
Remaining Budget: £${team.remainingBudget}m
Formation: ${team.formation}
Captain: ${team.captain.name}
Vice Captain: ${team.viceCaptain.name}
Analysis Type: ${analysisType}
    `

    const task = `
Provide a ${analysisType} analysis of this FPL team including:
1. Team strength assessment
2. Formation analysis
3. Captain/vice-captain choices evaluation
4. Budget efficiency
5. Fixture analysis for upcoming gameweeks
6. Transfer recommendations
7. Risk assessment
8. Expected performance projection
9. Areas for improvement
10. Alternative strategies

Provide detailed insights and actionable recommendations.
    `

    const prompt = await this.generatePrompt(context, task)

    if (this.config.provider === "openai") {
      return this.callOpenAI(prompt)
    } else {
      return this.callAnthropic(prompt)
    }
  }

  async analyzePlayer(player: Player): Promise<any> {
    const context = `
Player Analysis Request:
Name: ${player.name}
Team: ${player.team}
Position: ${player.position}
Price: £${player.price}m
Form: ${player.form}
Total Points: ${player.totalPoints}
Goals: ${player.goals}
Assists: ${player.assists}
Clean Sheets: ${player.cleanSheets}
Bonus Points: ${player.bonus}
ICT Index: ${player.ict_index}
Selected By: ${player.selected_by_percent}%
    `

    const task = `
Provide a comprehensive analysis of this player including:
1. Current form assessment
2. Value for money analysis
3. Fixture difficulty for upcoming gameweeks
4. Expected performance projection
5. Risk factors
6. Transfer recommendations
7. Captain potential
8. Comparison with similar players
9. Historical performance trends
10. Final verdict and recommendation

Provide detailed insights with specific data points and actionable advice.
    `

    const prompt = await this.generatePrompt(context, task)

    if (this.config.provider === "openai") {
      return this.callOpenAI(prompt)
    } else {
      return this.callAnthropic(prompt)
    }
  }

  async getFormationSuggestions(request: FormationRequest): Promise<any> {
    const context = `
Formation Analysis Request:
Available Players: ${request.players.length} players
Budget: £${request.budget}m
Strategy: ${request.strategy || "Balanced"}
    `

    const task = `
Analyze the available players and suggest optimal formations including:
1. Best formation for the given players
2. Alternative formation options
3. Player positioning recommendations
4. Formation strengths and weaknesses
5. Fixture considerations
6. Captain selection strategy for each formation
7. Expected points projection for each formation
8. Risk assessment for each option

Provide detailed analysis with specific recommendations.
    `

    const prompt = await this.generatePrompt(context, task)

    if (this.config.provider === "openai") {
      return this.callOpenAI(prompt)
    } else {
      return this.callAnthropic(prompt)
    }
  }

  async optimizeTeam(team: FantasyTeam, options: { strategy?: string; riskLevel?: string }): Promise<FantasyTeam> {
    const context = `
Team Optimization Request:
Current Team: ${team.name}
Current Formation: ${team.formation}
Current Budget Used: £${team.totalValue}m
Remaining Budget: £${team.remainingBudget}m
Strategy: ${options.strategy || "Balanced"}
Risk Level: ${options.riskLevel || "Medium"}
    `

    const task = `
Optimize this FPL team by suggesting improvements including:
1. Player transfers (in/out)
2. Formation adjustments
3. Captain/vice-captain changes
4. Budget reallocation
5. Bench optimization
6. Fixture-based improvements
7. Risk management adjustments

Provide specific transfer recommendations with reasoning and expected impact.
    `

    const prompt = await this.generatePrompt(context, task)

    const optimization = await (this.config.provider === "openai" ? this.callOpenAI(prompt) : this.callAnthropic(prompt))

    // Apply optimization suggestions to the team
    // This would involve parsing the AI response and updating the team accordingly
    return team
  }

  private async callOpenAI(prompt: string): Promise<any> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: this.config.model,
        messages: [{ role: "user", content: prompt }],
        max_tokens: this.config.maxTokens,
        temperature: this.config.temperature
      })

      return completion.choices[0]?.message?.content
    } catch (error) {
      console.error("OpenAI API error:", error)
      throw new Error("Failed to get AI recommendation")
    }
  }

  private async callAnthropic(prompt: string): Promise<any> {
    try {
      const message = await this.anthropic.messages.create({
        model: "claude-3-sonnet-20240229",
        max_tokens: this.config.maxTokens,
        temperature: this.config.temperature,
        messages: [{ role: "user", content: prompt }]
      })

      return message.content[0]?.text
    } catch (error) {
      console.error("Anthropic API error:", error)
      throw new Error("Failed to get AI recommendation")
    }
  }
}
