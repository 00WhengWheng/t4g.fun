import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Gift, Star, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface GameCardProps {
  title: string
  description: string
  icon: React.ReactNode
  difficulty?: "Easy" | "Medium" | "Hard"
  timeEstimate?: string
  isChallenge?: boolean
}

const GameCard: React.FC<GameCardProps> = ({
  title,
  description,
  icon,
  difficulty = "Easy",
  timeEstimate,
  isChallenge = false
}) => {
  const difficultyColors = {
    Easy: "text-green-600 bg-green-50 border-green-200",
    Medium: "text-yellow-600 bg-yellow-50 border-yellow-200",
    Hard: "text-red-600 bg-red-50 border-red-200"
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="p-3 rounded-lg bg-primary/10 text-primary mb-2">
            {icon}
          </div>
          {isChallenge && (
            <div className="flex items-center space-x-1 text-yellow-600">
              <Trophy className="h-4 w-4" />
              <span className="text-xs font-medium">Challenge</span>
            </div>
          )}
        </div>
        <CardTitle className="text-lg group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-sm">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className={cn(
              "text-xs px-2 py-1 rounded-full border font-medium",
              difficultyColors[difficulty]
            )}>
              {difficulty}
            </span>
            {timeEstimate && (
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span className="text-xs">{timeEstimate}</span>
              </div>
            )}
          </div>
          <Button size="sm" variant="ghost" className="h-8">
            Play
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

interface GameGridProps {
  className?: string
}

const GameGrid: React.FC<GameGridProps> = ({ className }) => {
  const games = [
    {
      title: "Gift Hunt",
      description: "Find hidden gifts using clues and riddles around your location.",
      icon: <Gift className="h-6 w-6" />,
      difficulty: "Easy" as const,
      timeEstimate: "15 min",
      isChallenge: false
    },
    {
      title: "Tag Master Challenge",
      description: "Create the most creative gift tags in limited time.",
      icon: <Star className="h-6 w-6" />,
      difficulty: "Medium" as const,
      timeEstimate: "30 min",
      isChallenge: true
    },
    {
      title: "Memory Match",
      description: "Match gift cards and tags to test your memory skills.",
      icon: <Trophy className="h-6 w-6" />,
      difficulty: "Easy" as const,
      timeEstimate: "10 min",
      isChallenge: false
    },
    {
      title: "Speed Wrapper",
      description: "Wrap as many virtual gifts as possible in 60 seconds.",
      icon: <Clock className="h-6 w-6" />,
      difficulty: "Hard" as const,
      timeEstimate: "5 min",
      isChallenge: true
    },
    {
      title: "Tag Designer",
      description: "Design beautiful gift tags with our creative tools.",
      icon: <Gift className="h-6 w-6" />,
      difficulty: "Medium" as const,
      timeEstimate: "20 min",
      isChallenge: false
    },
    {
      title: "Puzzle Quest",
      description: "Solve gift-themed puzzles to unlock special rewards.",
      icon: <Star className="h-6 w-6" />,
      difficulty: "Hard" as const,
      timeEstimate: "45 min",
      isChallenge: true
    }
  ]

  return (
    <div className={cn("w-full", className)}>
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Games & Challenges</h2>
          <p className="text-muted-foreground text-lg">
            Discover fun ways to create and share your gift tags
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <GameCard
              key={index}
              title={game.title}
              description={game.description}
              icon={game.icon}
              difficulty={game.difficulty}
              timeEstimate={game.timeEstimate}
              isChallenge={game.isChallenge}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export { GameGrid, GameCard }