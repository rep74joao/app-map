import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import Reactotron from 'reactotron-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

console.tron = Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure({
      host:'192.168.0.117'
   })
    .useReactNative()
    .connect();

console.disable = ['Virtual', 'Warning'];

import MainDrawer from './src/stacks/MainDrawer';

export default function App() {
  return (
    <NavigationContainer>
      <MainDrawer>
        
      </MainDrawer>
    </NavigationContainer>
  );
}
