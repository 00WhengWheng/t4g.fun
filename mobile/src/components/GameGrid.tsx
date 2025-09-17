import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

interface GameCardProps {
  title: string;
  description: string;
  icon: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  timeEstimate?: string;
  isChallenge?: boolean;
  onPress?: () => void;
}

const GameCard: React.FC<GameCardProps> = ({
  title,
  description,
  icon,
  difficulty = 'Easy',
  timeEstimate,
  isChallenge = false,
  onPress,
}) => {
  const difficultyColors = {
    Easy: '#22c55e',
    Medium: '#eab308',
    Hard: '#ef4444',
  };

  const difficultyBgColors = {
    Easy: '#f0fdf4',
    Medium: '#fefce8',
    Hard: '#fef2f2',
  };

  return (
    <TouchableOpacity style={styles.gameCard} onPress={onPress}>
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>{icon}</Text>
        </View>
        {isChallenge && (
          <View style={styles.challengeBadge}>
            <Text style={styles.challengeText}>🏆 Challenge</Text>
          </View>
        )}
      </View>
      
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
      
      <View style={styles.cardFooter}>
        <View style={styles.metaInfo}>
          <View style={[
            styles.difficultyBadge,
            { backgroundColor: difficultyBgColors[difficulty] }
          ]}>
            <Text style={[
              styles.difficultyText,
              { color: difficultyColors[difficulty] }
            ]}>
              {difficulty}
            </Text>
          </View>
          {timeEstimate && (
            <View style={styles.timeContainer}>
              <Text style={styles.timeIcon}>⏱️</Text>
              <Text style={styles.timeText}>{timeEstimate}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.playButton} onPress={onPress}>
          <Text style={styles.playButtonText}>Play</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

interface GameGridProps {
  onGamePress?: (gameTitle: string) => void;
}

const GameGrid: React.FC<GameGridProps> = ({ onGamePress }) => {
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = (screenWidth - 48) / 2; // 2 columns with padding

  const games = [
    {
      title: 'Gift Hunt',
      description: 'Find hidden gifts using clues and riddles around your location.',
      icon: '🎁',
      difficulty: 'Easy' as const,
      timeEstimate: '15 min',
      isChallenge: false,
    },
    {
      title: 'Tag Master Challenge',
      description: 'Create the most creative gift tags in limited time.',
      icon: '⭐',
      difficulty: 'Medium' as const,
      timeEstimate: '30 min',
      isChallenge: true,
    },
    {
      title: 'Memory Match',
      description: 'Match gift cards and tags to test your memory skills.',
      icon: '🏆',
      difficulty: 'Easy' as const,
      timeEstimate: '10 min',
      isChallenge: false,
    },
    {
      title: 'Speed Wrapper',
      description: 'Wrap as many virtual gifts as possible in 60 seconds.',
      icon: '⏰',
      difficulty: 'Hard' as const,
      timeEstimate: '5 min',
      isChallenge: true,
    },
    {
      title: 'Tag Designer',
      description: 'Design beautiful gift tags with our creative tools.',
      icon: '🎨',
      difficulty: 'Medium' as const,
      timeEstimate: '20 min',
      isChallenge: false,
    },
    {
      title: 'Puzzle Quest',
      description: 'Solve gift-themed puzzles to unlock special rewards.',
      icon: '🧩',
      difficulty: 'Hard' as const,
      timeEstimate: '45 min',
      isChallenge: true,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Games & Challenges</Text>
        <Text style={styles.subtitle}>
          Discover fun ways to create and share your gift tags
        </Text>
      </View>
      
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {games.map((game, index) => (
            <View key={index} style={[styles.cardWrapper, { width: cardWidth }]}>
              <GameCard
                title={game.title}
                description={game.description}
                icon={game.icon}
                difficulty={game.difficulty}
                timeEstimate={game.timeEstimate}
                isChallenge={game.isChallenge}
                onPress={() => onGamePress?.(game.title)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
  },
  scrollView: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  cardWrapper: {
    marginBottom: 16,
  },
  gameCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 24,
  },
  challengeBadge: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  challengeText: {
    fontSize: 10,
    color: '#d97706',
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 16,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaInfo: {
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: '600',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeIcon: {
    fontSize: 10,
    marginRight: 4,
  },
  timeText: {
    fontSize: 10,
    color: '#6b7280',
  },
  playButton: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  playButtonText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
});

export { GameGrid, GameCard };