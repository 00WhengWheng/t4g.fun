import type { Game, QuizQuestion, GameSession, QuizAnswer } from '../../../shared/types';

// Mock database - in production this would connect to Prisma/PostgreSQL
const mockGames: Game[] = [
  {
    id: 'quiz-1',
    title: 'Team Trivia',
    description: 'Join teams and compete in exciting trivia challenges on various topics.',
    category: 'quiz',
    players: 4,
    difficulty: 'Medium',
    rating: 4.8,
    isActive: true,
    questionCount: 10,
  },
  {
    id: 'reaction-1',
    title: 'QR Hunt',
    description: 'Scan QR codes around the city to collect points and unlock rewards.',
    category: 'reaction',
    players: 1,
    difficulty: 'Easy',
    rating: 4.5,
    isActive: true,
    bundlePath: '/games/qr-hunt/index.html',
  },
  {
    id: 'puzzle-1',
    title: 'AR Adventure',
    description: 'Explore the world through augmented reality and complete missions.',
    category: 'puzzle',
    players: 1,
    difficulty: 'Hard',
    rating: 4.2,
    isActive: true,
    bundlePath: '/games/ar-adventure/index.html',
  },
  {
    id: 'music-1',
    title: 'Music Match',
    description: 'Match musical instruments in this melodic memory challenge.',
    category: 'music',
    players: 1,
    difficulty: 'Medium',
    rating: 4.6,
    isActive: true,
    bundlePath: '/games/music-match/index.html',
  },
];

const mockQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctAnswer: 2,
    difficulty: 'Easy',
    category: 'Geography',
    points: 10,
  },
  {
    id: 'q2',
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 1,
    difficulty: 'Easy',
    category: 'Science',
    points: 10,
  },
  {
    id: 'q3',
    question: 'Who painted the Mona Lisa?',
    options: ['Van Gogh', 'Picasso', 'Da Vinci', 'Monet'],
    correctAnswer: 2,
    difficulty: 'Medium',
    category: 'Art',
    points: 15,
  },
  {
    id: 'q4',
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
    correctAnswer: 3,
    difficulty: 'Medium',
    category: 'Geography',
    points: 15,
  },
  {
    id: 'q5',
    question: 'In which year did World War II end?',
    options: ['1944', '1945', '1946', '1947'],
    correctAnswer: 1,
    difficulty: 'Medium',
    category: 'History',
    points: 15,
  },
  {
    id: 'q6',
    question: 'What is the chemical symbol for gold?',
    options: ['Go', 'Gd', 'Au', 'Ag'],
    correctAnswer: 2,
    difficulty: 'Medium',
    category: 'Science',
    points: 15,
  },
  {
    id: 'q7',
    question: 'Which is the smallest country in the world?',
    options: ['Monaco', 'Nauru', 'Vatican City', 'San Marino'],
    correctAnswer: 2,
    difficulty: 'Hard',
    category: 'Geography',
    points: 20,
  },
  {
    id: 'q8',
    question: 'What does "WWW" stand for?',
    options: ['World Wide Web', 'World Wide Website', 'World Web Wide', 'Wide World Web'],
    correctAnswer: 0,
    difficulty: 'Easy',
    category: 'Technology',
    points: 10,
  },
  {
    id: 'q9',
    question: 'Which musical instrument has 88 keys?',
    options: ['Organ', 'Piano', 'Harpsichord', 'Keyboard'],
    correctAnswer: 1,
    difficulty: 'Easy',
    category: 'Music',
    points: 10,
  },
  {
    id: 'q10',
    question: 'What is the fastest land animal?',
    options: ['Lion', 'Cheetah', 'Leopard', 'Tiger'],
    correctAnswer: 1,
    difficulty: 'Easy',
    category: 'Animals',
    points: 10,
  },
  {
    id: 'q11',
    question: 'In Greek mythology, who is the king of the gods?',
    options: ['Apollo', 'Zeus', 'Poseidon', 'Hades'],
    correctAnswer: 1,
    difficulty: 'Medium',
    category: 'Mythology',
    points: 15,
  },
  {
    id: 'q12',
    question: 'What is the hardest natural substance on Earth?',
    options: ['Gold', 'Iron', 'Diamond', 'Quartz'],
    correctAnswer: 2,
    difficulty: 'Medium',
    category: 'Science',
    points: 15,
  }
];

class GameService {
  // Get all available games
  async getGames(): Promise<Game[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockGames.filter(game => game.isActive)), 100);
    });
  }

  // Get game by ID
  async getGameById(id: string): Promise<Game | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const game = mockGames.find(g => g.id === id);
        resolve(game || null);
      }, 100);
    });
  }

  // Get games by category
  async getGamesByCategory(category: string): Promise<Game[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const games = mockGames.filter(g => g.category === category && g.isActive);
        resolve(games);
      }, 100);
    });
  }

  // Quiz-specific methods
  async getQuizQuestions(gameId: string, count?: number): Promise<QuizQuestion[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const game = mockGames.find(g => g.id === gameId);
        if (!game || game.category !== 'quiz') {
          resolve([]);
          return;
        }
        
        const questionCount = count || game.questionCount || 5;
        // Shuffle and take specified number of questions
        const shuffled = [...mockQuestions].sort(() => 0.5 - Math.random());
        resolve(shuffled.slice(0, questionCount));
      }, 100);
    });
  }

  // Create a new game session
  async createGameSession(gameId: string, userId?: string): Promise<GameSession> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const session: GameSession = {
          id: `session-${Date.now()}`,
          gameId,
          userId,
          startTime: new Date(),
          score: 0,
          isCompleted: false,
          answers: [],
        };
        resolve(session);
      }, 100);
    });
  }

  // Submit quiz answers and calculate score
  async submitQuizAnswers(sessionId: string, answers: QuizAnswer[]): Promise<GameSession> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const score = answers.reduce((total, answer) => {
          if (answer.isCorrect) {
            const question = mockQuestions.find(q => q.id === answer.questionId);
            return total + (question?.points || 0);
          }
          return total;
        }, 0);

        const session: GameSession = {
          id: sessionId,
          gameId: 'quiz-1', // This would be retrieved from storage
          startTime: new Date(Date.now() - 300000), // 5 minutes ago
          endTime: new Date(),
          score,
          isCompleted: true,
          answers,
        };
        resolve(session);
      }, 100);
    });
  }

  // Validate quiz answer
  validateAnswer(questionId: string, selectedAnswer: number): boolean {
    const question = mockQuestions.find(q => q.id === questionId);
    return question ? question.correctAnswer === selectedAnswer : false;
  }
}

export const gameService = new GameService();