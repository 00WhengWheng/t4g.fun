import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { GameGrid } from '../components/GameGrid';

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [count, setCount] = useState(0);

  const handleGamePress = (gameTitle: string) => {
    Alert.alert('Game Selected', `Starting ${gameTitle}...`);
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <Text style={styles.title}>Tag 4 Gift</Text>
            <Text style={styles.subtitle}>
              Welcome to T4G.fun - Your Gift Tagging Solution
            </Text>
            
            <View style={styles.cardContainer}>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>React Native</Text>
                <Text style={styles.cardDescription}>
                  Cross-platform mobile development
                </Text>
                <Text style={styles.cardContent}>
                  Build native mobile apps using React and JavaScript.
                </Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>React Navigation</Text>
                <Text style={styles.cardDescription}>
                  Native navigation for React Native
                </Text>
                <Text style={styles.cardContent}>
                  Smooth, customizable navigation with native feel.
                </Text>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => setCount(count + 1)}>
                <Text style={styles.primaryButtonText}>Count is {count}</Text>
              </TouchableOpacity>

              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.outlineButton}>
                  <Text style={styles.outlineButtonText}>Outline Button</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondaryButton}>
                  <Text style={styles.secondaryButtonText}>Secondary</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.ghostButton}
                  onPress={() => navigation.navigate('About')}>
                  <Text style={styles.ghostButtonText}>About</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.footerText}>
              Built with React Native and React Navigation
            </Text>
          </View>
        </View>

        {/* Game Grid Section */}
        <GameGrid onGamePress={handleGamePress} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    backgroundColor: '#f9fafb',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  heroContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 28,
  },
  cardContainer: {
    width: '100%',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 16,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#1f2937',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 16,
    minWidth: 160,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#d1d5db',
    alignItems: 'center',
  },
  outlineButtonText: {
    color: '#1f2937',
    fontSize: 14,
    fontWeight: '500',
  },
  secondaryButton: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#1f2937',
    fontSize: 14,
    fontWeight: '500',
  },
  ghostButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  ghostButtonText: {
    color: '#1f2937',
    fontSize: 14,
    fontWeight: '500',
  },
  footerText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
});

export default HomeScreen;