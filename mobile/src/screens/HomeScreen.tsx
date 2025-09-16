import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { useAuth } from '../auth/AuthProvider';

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [count, setCount] = useState(0);
  const { user, isAuthenticated } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.content}>
          <Text style={styles.title}>Tag 4 Gift</Text>
          <Text style={styles.subtitle}>
            Welcome to T4G.fun - Your Gift Tagging Solution
          </Text>
          
          {isAuthenticated && user && (
            <View style={styles.welcomeCard}>
              <Text style={styles.welcomeText}>
                Welcome back, {user.name || user.email}!
              </Text>
            </View>
          )}
          
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

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => navigation.navigate('About')}>
              <Text style={styles.secondaryButtonText}>About</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => navigation.navigate('Profile')}>
              <Text style={styles.secondaryButtonText}>Profile</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footerText}>
            Built with React Native and React Navigation
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 30,
  },
  welcomeCard: {
    backgroundColor: '#dcfce7',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  welcomeText: {
    fontSize: 16,
    color: '#166534',
    textAlign: 'center',
    fontWeight: '500',
  },
  cardContainer: {
    width: '100%',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
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
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#1f2937',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    marginBottom: 10,
    minWidth: 120,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#d1d5db',
    minWidth: 120,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#1f2937',
    fontSize: 16,
    fontWeight: '500',
  },
  footerText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
});

export default HomeScreen;