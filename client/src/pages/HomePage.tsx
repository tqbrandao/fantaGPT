import React from "react"
import { Link } from "react-router-dom"
import { Brain, Users, BarChart3, Zap, Target, TrendingUp } from "lucide-react"

const HomePage: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Recommendations",
      description: "Get intelligent team suggestions based on current form, fixtures, and statistical analysis."
    },
    {
      icon: BarChart3,
      title: "Player Analysis",
      description: "Detailed insights into player performance, value for money, and future potential."
    },
    {
      icon: Users,
      title: "Team Optimization",
      description: "Analyze your current team and get specific recommendations for improvements."
    },
    {
      icon: Target,
      title: "Budget Management",
      description: "Smart budget allocation across positions with value optimization."
    },
    {
      icon: TrendingUp,
      title: "Form & Fixture Analysis",
      description: "Consider player form and upcoming fixture difficulty in recommendations."
    },
    {
      icon: Zap,
      title: "Real-time Data",
      description: "Live data from the Fantasy Premier League API for accurate recommendations."
    }
  ]

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">AI-Powered</span> Fantasy Football
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Build the perfect Fantasy Premier League team with intelligent AI recommendations. Get data-driven insights, player analysis, and team optimization strategies.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/team-builder" className="btn-primary text-lg px-8 py-3 flex items-center justify-center space-x-2">
              <Brain className="w-5 h-5" />
              <span>Build Your Team</span>
            </Link>
            <Link to="/player-analysis" className="btn-secondary text-lg px-8 py-3 flex items-center justify-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Analyze Players</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose FantaGPT?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="card hover:shadow-lg transition-shadow duration-300">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-fpl-blue text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Dominate Your League?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of FPL managers who trust AI-powered insights to make better decisions.</p>
          <Link to="/team-builder" className="bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200 inline-flex items-center space-x-2">
            <Brain className="w-5 h-5" />
            <span>Start Building Now</span>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
