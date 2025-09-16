import React, { useState } from 'react';
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
import { ScanModal } from './src/components/ScanModal';

export type RootStackParamList = {
  Home: undefined;
  About: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const [isScanModalVisible, setIsScanModalVisible] = useState(false);

  const handleScanSuccess = (data: string, type: 'QR' | 'NFC') => {
    console.log(`${type} scan result:`, data);
    setIsScanModalVisible(false);
  };

  const ScanButton = () => (
    <TouchableOpacity
      onPress={() => setIsScanModalVisible(true)}
      style={styles.scanButton}
    >
      <Text style={styles.scanButtonText}>📱 Scan</Text>
    </TouchableOpacity>
  );

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
            headerRight: () => <ScanButton />,
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
        
        <ScanModal
          visible={isScanModalVisible}
          onClose={() => setIsScanModalVisible(false)}
          onScanSuccess={handleScanSuccess}
        />
      </NavigationContainer>
    </AuthProvider>
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