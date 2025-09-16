import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import AboutScreen from './src/screens/AboutScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { AuthProvider } from './src/auth/AuthProvider';

export type RootStackParamList = {
  Home: undefined;
  About: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#1f2937" />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#1f2937',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'Tag 4 Gift' }}
          />
          <Stack.Screen 
            name="About" 
            component={AboutScreen} 
            options={{ title: 'About' }}
          />
          <Stack.Screen 
            name="Profile" 
            component={ProfileScreen} 
            options={{ title: 'Profile' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;