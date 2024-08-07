// navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import InitialYogaExperience from '../screens/InitialYogaExperience';
import InitialMotivation from '../screens/InitialMotivation';
import InitialInjuries from '../screens/InitialInjuries';
import InitialComfortablePoses from '../screens/InitialComfortablePoses';
import InitialGoalPoses from '../screens/InitialGoalPoses';
import WorkoutSelection from '../screens/WorkoutSelection'; // Add this import

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InitialYogaExperience"
          component={InitialYogaExperience}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InitialMotivation"
          component={InitialMotivation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InitialInjuries"
          component={InitialInjuries}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InitialComfortablePoses"
          component={InitialComfortablePoses}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InitialGoalPoses"
          component={InitialGoalPoses}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WorkoutSelection"
          component={WorkoutSelection}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
