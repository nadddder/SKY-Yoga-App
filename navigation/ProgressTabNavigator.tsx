import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import Muscle from '../screens/Muscle'; 
import Trophies from '../screens/Trophies';
import Calendar from '../screens/Calendar';
import DonePoses from '../screens/DonePoses';

const Tab = createBottomTabNavigator();

export default function ProgressTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconSource;

          if (route.name === 'Muscle') {
            iconSource = require('../assets/Images/muscle-icon.png');
          } else if (route.name === 'Trophies') {
            iconSource = require('../assets/Images/trophy-icon.png');
          } else if (route.name === 'Calendar') {
            iconSource = require('../assets/Images/calendar-icon.png');
          } else if (route.name === 'DonePoses') {
            iconSource = require('../assets/Images/pose-icon.png');
          }

          return <Image source={iconSource} style={{ width: 24, height: 24, tintColor: focused ? '#007bff' : '#8e8e93' }} />;
        },
        tabBarShowLabel: false, // Hide the tab labels
        headerShown: false, // Hide the header
      })}
    >
      <Tab.Screen name="Muscle" component={Muscle} />
      <Tab.Screen name="Trophies" component={Trophies} />
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="DonePoses" component={DonePoses} />
    </Tab.Navigator>
  );
}
