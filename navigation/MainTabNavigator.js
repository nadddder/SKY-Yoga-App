import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import AccountTab from '../screens/AccountTab';
import PracticeTab from '../screens/PracticeTab';
import ProgressTab from '../screens/ProgressTab';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconSource;

          if (route.name === 'Practice') {
            iconSource = require('../assets/Images/practice-icon.png');
          } else if (route.name === 'Progress') {
            iconSource = require('../assets/Images/progress-icon.png');
          } else if (route.name === 'Account') {
            iconSource = require('../assets/Images/account-icon.png');
          }

          return <Image source={iconSource} style={{ width: 32, height: 32, tintColor: focused ? '#007bff' : '#8e8e93' }} />;
        },
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: { backgroundColor: '#fff' },
      })}
    >
      <Tab.Screen name="Practice" component={PracticeTab} />
      <Tab.Screen name="Progress" component={ProgressTab} />
      <Tab.Screen name="Account" component={AccountTab} />
    </Tab.Navigator>
  );
}
