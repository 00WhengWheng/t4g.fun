export interface RootStackParamList {
  Home: undefined;
  About: undefined;
  Profile: undefined;
}

export interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
  email_verified?: boolean;
  nickname?: string;
  sub?: string;
}

export interface AuthUser extends User {
  accessToken?: string;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface Gift {
  id: string;
  title: string;
  description: string;
  tags: string[];
  userId: string;
  createdAt: Date;
}

// Game Types
export type GameCategory = 'quiz' | 'reaction' | 'music' | 'puzzle';

export interface Game {
  id: string;
  title: string;
  description: string;
  category: GameCategory;
  players: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rating: number;
  isActive: boolean;
  // For GDevelop games
  bundlePath?: string;
  // For quiz games
  questionCount?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category?: string;
  points: number;
}

export interface QuizAnswer {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  timeSpent: number;
}

export interface GameSession {
  id: string;
  gameId: string;
  userId?: string;
  startTime: Date;
  endTime?: Date;
  score: number;
  isCompleted: boolean;
  answers?: QuizAnswer[];
}

// Export share types
export * from './share';