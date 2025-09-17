import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { GameCard, ChallengeCard } from '@/components/cards/GameCards'
import { GameModal } from '@/components/GameModal'
import { gameService } from '@/services/gameService'
import type { Game } from '../../../shared/types'

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
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl font-bold tracking-tight lg:text-6xl">
          Welcome to <span className="text-primary">T4G.fun</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Your ultimate destination for interactive games, challenges, and gift tagging experiences.
          Join thousands of players in exciting adventures!
        </p>
      </div>

      {/* Games Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Featured Games</h2>
          <span className="text-sm text-muted-foreground">Play solo or with friends</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full text-center py-8">
              <p className="text-muted-foreground">Loading games...</p>
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

      {/* Quick Actions */}
      <div className="bg-muted/50 rounded-lg p-6 text-center space-y-4">
        <h3 className="text-2xl font-semibold">Ready to get started?</h3>
        <p className="text-muted-foreground">
          Use the navigation bar above to scan QR codes, share with friends, or dive into games!
        </p>
      </div>

      {/* Game Modal */}
      <GameModal
        isOpen={isGameModalOpen}
        onClose={handleCloseGameModal}
        game={selectedGame}
      />
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Index,
})