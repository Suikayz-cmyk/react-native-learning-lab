// App.js
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TodoProvider } from './src/context/TodoContext';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
 return (
  <SafeAreaProvider>
    <TodoProvider>
      <StatusBar style='light' />
      <HomeScreen />
    </TodoProvider>
  </SafeAreaProvider>
 );
}