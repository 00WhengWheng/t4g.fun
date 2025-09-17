import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Gamepad2, 
  Clock, 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  Loader2,
  Play,
  RotateCcw
} from 'lucide-react';
import type { Game, QuizQuestion, GameSession, QuizAnswer } from '../../../shared/types';
import { gameService } from '@/services/gameService';

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  game: Game | null;
}

interface QuizState {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  answers: QuizAnswer[];
  timeLeft: number;
  isCompleted: boolean;
  session: GameSession | null;
  startTime: Date;
}

export const GameModal: React.FC<GameModalProps> = ({ isOpen, onClose, game }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [quizState, setQuizState] = useState<QuizState | null>(null);
  const [gameScore, setGameScore] = useState(0);

  useEffect(() => {
    if (isOpen && game) {
      initializeGame();
    } else {
      resetGameState();
    }
  }, [isOpen, game]);

  const initializeGame = async () => {
    if (!game) return;
    
    setIsLoading(true);
    
    try {
      if (game.category === 'quiz') {
        await initializeQuiz();
      } else {
        // For GDevelop games, we'll initialize the iframe
        setGameScore(0);
      }
    } catch (error) {
      console.error('Failed to initialize game:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const initializeQuiz = async () => {
    if (!game) return;
    
    const [questions, session] = await Promise.all([
      gameService.getQuizQuestions(game.id, game.questionCount),
      gameService.createGameSession(game.id)
    ]);

    setQuizState({
      questions,
      currentQuestionIndex: 0,
      answers: [],
      timeLeft: 300, // 5 minutes
      isCompleted: false,
      session,
      startTime: new Date()
    });

    // Start timer
    const timer = setInterval(() => {
      setQuizState(prev => {
        if (!prev) return null;
        
        const newTimeLeft = prev.timeLeft - 1;
        if (newTimeLeft <= 0) {
          clearInterval(timer);
          handleQuizComplete(prev.answers);
          return { ...prev, timeLeft: 0, isCompleted: true };
        }
        return { ...prev, timeLeft: newTimeLeft };
      });
    }, 1000);

    return () => clearInterval(timer);
  };

  const resetGameState = () => {
    setQuizState(null);
    setGameScore(0);
    setIsLoading(false);
  };

  const handleQuizAnswer = (selectedAnswer: number) => {
    if (!quizState || quizState.isCompleted) return;

    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
    const isCorrect = gameService.validateAnswer(currentQuestion.id, selectedAnswer);
    const timeSpent = Math.floor((Date.now() - quizState.startTime.getTime()) / 1000);

    const answer: QuizAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer,
      isCorrect,
      timeSpent
    };

    const newAnswers = [...quizState.answers, answer];
    
    // Move to next question or complete quiz
    if (quizState.currentQuestionIndex + 1 >= quizState.questions.length) {
      handleQuizComplete(newAnswers);
    } else {
      setQuizState(prev => prev ? {
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        answers: newAnswers
      } : null);
    }
  };

  const handleQuizComplete = async (finalAnswers: QuizAnswer[]) => {
    if (!quizState?.session) return;

    try {
      const completedSession = await gameService.submitQuizAnswers(
        quizState.session.id,
        finalAnswers
      );
      
      setGameScore(completedSession.score);
      setQuizState(prev => prev ? {
        ...prev,
        answers: finalAnswers,
        isCompleted: true
      } : null);
    } catch (error) {
      console.error('Failed to submit quiz answers:', error);
    }
  };

  const handleGameMessage = (event: MessageEvent) => {
    if (event.data.type === 'GAME_UPDATE') {
      setGameScore(event.data.score || 0);
    } else if (event.data.type === 'GAME_FINISHED') {
      setGameScore(event.data.score || 0);
    }
  };

  useEffect(() => {
    window.addEventListener('message', handleGameMessage);
    return () => window.removeEventListener('message', handleGameMessage);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderQuizContent = () => {
    if (!quizState) return null;

    if (quizState.isCompleted) {
      const correctAnswers = quizState.answers.filter(a => a.isCorrect).length;
      const totalQuestions = quizState.questions.length;
      const percentage = Math.round((correctAnswers / totalQuestions) * 100);

      return (
        <div className="space-y-6 text-center">
          <div className="space-y-4">
            <Trophy className="h-16 w-16 mx-auto text-yellow-500" />
            <h3 className="text-2xl font-bold">Quiz Complete!</h3>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-primary">{gameScore} points</p>
              <p className="text-muted-foreground">
                {correctAnswers}/{totalQuestions} correct ({percentage}%)
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            {quizState.questions.map((question, index) => {
              const answer = quizState.answers[index];
              const isCorrect = answer?.isCorrect;
              
              return (
                <div key={question.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                  {isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  <span className="text-sm">{question.question}</span>
                  <Badge variant={isCorrect ? "default" : "destructive"}>
                    {isCorrect ? `+${question.points}` : '0'}
                  </Badge>
                </div>
              );
            })}
          </div>
          
          <Button onClick={onClose} className="w-full">
            Close Game
          </Button>
        </div>
      );
    }

    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
    const progress = ((quizState.currentQuestionIndex + 1) / quizState.questions.length) * 100;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="font-mono">{formatTime(quizState.timeLeft)}</span>
          </div>
          <Badge variant="outline">
            {quizState.currentQuestionIndex + 1} / {quizState.questions.length}
          </Badge>
        </div>

        <Progress value={progress} className="w-full" />

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{currentQuestion.question}</CardTitle>
            <div className="flex gap-2">
              <Badge variant="secondary">{currentQuestion.difficulty}</Badge>
              <Badge variant="outline">{currentQuestion.points} points</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start h-auto p-4 text-left"
                onClick={() => handleQuizAnswer(index)}
              >
                <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                {option}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderGDevelopContent = () => {
    if (!game?.bundlePath) return null;

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Play className="h-4 w-4" />
            <span>Playing {game.title}</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-yellow-500" />
            <span className="font-mono">{gameScore}</span>
          </div>
        </div>
        
        <div className="relative w-full h-96 rounded-lg overflow-hidden border">
          <iframe
            src={game.bundlePath}
            className="w-full h-full"
            title={game.title}
            allowFullScreen
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const iframe = document.querySelector('iframe');
              if (iframe) iframe.src = iframe.src; // Reload iframe
              setGameScore(0);
            }}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Restart
          </Button>
          <Button onClick={onClose} className="flex-1">
            Close Game
          </Button>
        </div>
      </div>
    );
  };

  if (!game) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gamepad2 className="h-5 w-5" />
            {game.title}
          </DialogTitle>
          <DialogDescription>
            {game.description}
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading game...</span>
          </div>
        ) : (
          game.category === 'quiz' ? renderQuizContent() : renderGDevelopContent()
        )}
      </DialogContent>
    </Dialog>
  );
};