import React from 'react';
import { DevSettings } from 'react-native';
import { UserProvider } from './context/UserContext';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  // This will add a custom item to the developer menu
  DevSettings.addMenuItem('Hide Developer Menu', () => {
    // Code to handle what happens when this menu item is selected
  });

  return (
    <UserProvider>
      <AppNavigator />
    </UserProvider>
  );
}
