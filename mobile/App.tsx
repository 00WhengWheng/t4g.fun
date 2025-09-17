import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Alert,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import AboutScreen from './src/screens/AboutScreen';
import Navbar from './src/components/Navbar';

export type RootStackParamList = {
  Home: undefined;
  About: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const handleScanPress = () => {
    Alert.alert('Scan', 'Scan functionality coming soon!');
  };

  const handleSharePress = () => {
    Alert.alert('Share', 'Share functionality coming soon!');
  };

  const handleGamePress = () => {
    Alert.alert('Games', 'Game functionality coming soon!');
  };

  const handleProfilePress = () => {
    Alert.alert('Profile', 'Profile functionality coming soon!');
  };

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <Navbar
          onScanPress={handleScanPress}
          onSharePress={handleSharePress}
          onGamePress={handleGamePress}
          onProfilePress={handleProfilePress}
        />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false, // Hide the default header since we're using our custom navbar
          }}>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
          />
          <Stack.Screen 
            name="About" 
            component={AboutScreen} 
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  scanButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 15,
  },
  scanButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default App;