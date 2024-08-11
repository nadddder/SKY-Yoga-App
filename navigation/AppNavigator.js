import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import PrimarySport from '../screens/PrimarySport';
import InitialYogaExperience from '../screens/InitialYogaExperience';
import InitialMotivation from '../screens/InitialMotivation';
import InitialInjuries from '../screens/InitialInjuries';
import InitialComfortablePoses from '../screens/InitialComfortablePoses';
import InitialGoalPoses from '../screens/InitialGoalPoses';
import WorkoutSelection from '../screens/WorkoutSelection';
import UserSummary from '../screens/UserSummary';
import MainTabNavigator from '../navigation/MainTabNavigator'; // Import the Tab Navigator

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
          name="PrimarySport"
          component={PrimarySport}
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
        <Stack.Screen
          name="UserSummary"
          component={UserSummary}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainTabNavigator"
          component={MainTabNavigator} // Ensure this is correctly referenced
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
