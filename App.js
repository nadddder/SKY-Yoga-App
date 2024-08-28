import React, { useEffect } from 'react';
import { DevSettings } from 'react-native';
import { UserProvider } from './context/UserContext';
import AppNavigator from './navigation/AppNavigator';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import firebaseConfig from './firebaseConfig';

export default function App() {
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }, []);

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
