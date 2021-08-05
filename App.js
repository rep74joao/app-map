import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

import MainDrawer from './src/stacks/MainDrawer';

export default function App() {
  return (
    <NavigationContainer>
      <MainDrawer>
        
      </MainDrawer>
    </NavigationContainer>
  );
}
