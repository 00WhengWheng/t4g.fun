import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gamepad2, Trophy, Star, Users } from "lucide-react"

interface GameCardProps {
  title: string
  description: string
  players?: number
  difficulty?: string
  rating?: number
  onPlay: () => void
}

export const GameCard = ({ title, description, players, difficulty, rating, onPlay }: GameCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border-2 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <Gamepad2 className="h-8 w-8 text-primary" />
          {rating && (
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
          )}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          {players && (
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{players} players</span>
            </div>
          )}
          {difficulty && (
            <span className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground text-xs">
              {difficulty}
            </span>
          )}
        </div>
        <Button 
          onClick={onPlay} 
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
          variant="outline"
        >
          Play Now
        </Button>
      </CardContent>
    </Card>
  )
}

interface ChallengeCardProps {
  title: string
  description: string
  reward?: string
  timeLimit?: string
  participants?: number
  onJoin: () => void
}

export const ChallengeCard = ({ title, description, reward, timeLimit, participants, onJoin }: ChallengeCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border-2 hover:border-amber-500/20 bg-gradient-to-br from-background to-amber-50/20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <Trophy className="h-8 w-8 text-amber-500" />
          {reward && (
            <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-medium">
              {reward}
            </span>
          )}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          {timeLimit && (
            <span>⏱️ {timeLimit}</span>
          )}
          {participants && (
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{participants} joined</span>
            </div>
          )}
        </div>
        <Button 
          onClick={onJoin} 
          className="w-full group-hover:bg-amber-500 group-hover:text-white"
          variant="outline"
        >
          Join Challenge
        </Button>
      </CardContent>
    </Card>
  )
}