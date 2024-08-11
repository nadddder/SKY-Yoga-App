import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { UserContext } from '../context/UserContext';
import { useNavigation } from '@react-navigation/native';

export default function UserSummary() {
  const { user } = useContext(UserContext);
  const navigation = useNavigation();

  const handlePrevious = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    navigation.navigate('MainTabNavigator'); // Navigate to the Tab Navigator
  };

  const formatList = (list) => {
    return list.join(', ');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>{user.name}</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{user.email}</Text>
      <Text style={styles.label}>Yoga Experience:</Text>
      <Text style={styles.value}>{user.yogaExperience}</Text>
      <Text style={styles.label}>Primary Sports:</Text>
      <Text style={styles.value}>
        {user.primarySports && user.primarySports.length > 0 ? formatList(user.primarySports) : 'No sports selected'}
      </Text>
      <Text style={styles.label}>Motivations:</Text>
      <Text style={styles.value}>
        {user.motivations && user.motivations.length > 0 ? formatList(user.motivations) : 'No motivations selected'}
      </Text>
      <Text style={styles.label}>Comfortable Poses:</Text>
      <Text style={styles.value}>
        {user.comfortablePoses && user.comfortablePoses.length > 0 ? formatList(user.comfortablePoses) : 'No poses selected'}
      </Text>
      <Text style={styles.label}>Goal Poses:</Text>
      <Text style={styles.value}>
        {user.goalPoses && user.goalPoses.length > 0 ? formatList(user.goalPoses) : 'No poses selected'}
      </Text>
      <Text style={styles.label}>Duration:</Text>
      <Text style={styles.value}>
        {user.duration ? `${user.duration.hour} hour ${user.duration.minute} minutes` : 'No duration selected'}
      </Text>
      <Text style={styles.label}>Mood:</Text>
      <Text style={styles.value}>{user.mood || 'No mood selected'}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePrevious}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 8,
  },
  value: {
    fontSize: 18,
    color: 'black',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
