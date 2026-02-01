import React, { useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { theme } from './src/theme';
import { LoginScreen } from './src/screens/LoginScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { ScannerScreen } from './src/screens/ScannerScreen';

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<'LOGIN' | 'DASHBOARD' | 'SCANNER'>('LOGIN');

  const handleLogin = () => {
    setAuthenticated(true);
    setCurrentScreen('DASHBOARD');
  };

  const navigateToScanner = () => {
    setCurrentScreen('SCANNER');
  };

  const navigateToDashboard = () => {
    setCurrentScreen('DASHBOARD');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      {currentScreen === 'LOGIN' && <LoginScreen onLogin={handleLogin} />}
      
      {currentScreen === 'DASHBOARD' && (
        <DashboardScreen onScan={navigateToScanner} />
      )}

      {currentScreen === 'SCANNER' && (
        <ScannerScreen onBack={navigateToDashboard} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
