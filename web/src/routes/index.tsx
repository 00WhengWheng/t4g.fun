import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GameGrid } from "@/components/ui/game-grid"

function Index() {
  const [games, setGames] = useState<Game[]>([])
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const [isGameModalOpen, setIsGameModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadGames()
  }, [])

  const loadGames = async () => {
    try {
      const gamesData = await gameService.getGames()
      setGames(gamesData)
    } catch (error) {
      console.error('Failed to load games:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePlayGame = (gameTitle: string) => {
    const game = games.find(g => g.title === gameTitle)
    if (game) {
      setSelectedGame(game)
      setIsGameModalOpen(true)
    }
  }

  const handleJoinChallenge = (challengeTitle: string) => {
    alert(`Joining ${challengeTitle}!`)
  }

  const handleCloseGameModal = () => {
    setIsGameModalOpen(false)
    setSelectedGame(null)
  }

  const challengeCardsData = [
    {
      title: "Daily Photo Challenge",
      description: "Capture the best photo based on today's theme and win amazing prizes.",
      reward: "50 Points",
      timeLimit: "24h",
      participants: 128,
    },
    {
      title: "Weekend Marathon",
      description: "Complete a series of tasks over the weekend to earn exclusive badges.",
      reward: "Badge",
      timeLimit: "48h",
      participants: 67,
    },
    {
      title: "Monthly Leaderboard",
      description: "Compete with players worldwide to reach the top of the monthly rankings.",
      reward: "Premium",
      timeLimit: "30 days",
      participants: 1542,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/20 py-16 px-4">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Tag 4 Gift
            </h1>
            <p className="text-xl text-muted-foreground sm:text-2xl">
              Welcome to T4G.fun - Your Gift Tagging Solution
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle>React + Vite</CardTitle>
                <CardDescription>
                  Modern web development with fast HMR
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Built with React 19 and Vite for the best developer experience.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>TanStack Router</CardTitle>
                <CardDescription>
                  Type-safe routing for React applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Modern, file-based routing with full TypeScript support.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>shadcn/ui + Tailwind</CardTitle>
                <CardDescription>
                  Beautiful, accessible component library
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Pre-built components with Tailwind CSS for rapid development.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={() => setCount((count) => count + 1)}
              size="lg"
            >
              Count is {count}
            </Button>
            <div className="flex gap-2 justify-center">
              <Button variant="outline">Outline Button</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          ) : (
            games.map((game) => (
              <GameCard
                key={game.id}
                title={game.title}
                description={game.description}
                players={game.players}
                difficulty={game.difficulty}
                rating={game.rating}
                onPlay={() => handlePlayGame(game.title)}
              />
            ))
          )}
        </div>
      </div>

      {/* Challenges Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Active Challenges</h2>
          <span className="text-sm text-muted-foreground">Limited time opportunities</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challengeCardsData.map((challenge, index) => (
            <ChallengeCard
              key={index}
              title={challenge.title}
              description={challenge.description}
              reward={challenge.reward}
              timeLimit={challenge.timeLimit}
              participants={challenge.participants}
              onJoin={() => handleJoinChallenge(challenge.title)}
            />
          ))}
        </div>
      </div>

      {/* Game Grid Section */}
      <GameGrid />
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Index,
})