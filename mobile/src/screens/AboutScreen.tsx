import React from 'react';
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

type AboutScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'About'
>;

type Props = {
  navigation: AboutScreenNavigationProp;
};

const AboutScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.content}>
          <Text style={styles.title}>About Tag 4 Gift</Text>
          
          <Text style={styles.description}>
            Tag 4 Gift (T4G.fun) is a modern web and mobile application designed to make gift tagging simple and fun.
          </Text>

          <Text style={styles.sectionTitle}>Technology Stack</Text>
          
          <View style={styles.listContainer}>
            <Text style={styles.listItem}>• React with TypeScript for type safety</Text>
            <Text style={styles.listItem}>• Vite for fast development and building</Text>
            <Text style={styles.listItem}>• TanStack Router for modern routing</Text>
            <Text style={styles.listItem}>• shadcn/ui for beautiful components</Text>
            <Text style={styles.listItem}>• Tailwind CSS for styling</Text>
            <Text style={styles.listItem}>• React Native for mobile applications</Text>
            <Text style={styles.listItem}>• React Navigation for mobile routing</Text>
          </View>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Back to Home</Text>
          </TouchableOpacity>
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
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 15,
  },
  listContainer: {
    marginBottom: 30,
  },
  listItem: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  backButton: {
    backgroundColor: '#1f2937',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    alignSelf: 'center',
    minWidth: 120,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default AboutScreen;