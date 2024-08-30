import React from 'react';
import { DevSettings } from 'react-native';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  DevSettings.addMenuItem('Hide Developer Menu', () => {});

  return (
    <AppNavigator />
  );
}
