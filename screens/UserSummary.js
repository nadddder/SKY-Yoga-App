import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { UserContext } from '../context/UserContext';
import { useNavigation } from '@react-navigation/native';

export default function UserSummary() {
  const { user } = useContext(UserContext);
  const navigation = useNavigation();

  const handlePrevious = () => {
    navigation.goBack();
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
      <Text style={styles.label}>Motivations:</Text>
      <Text style={styles.value}>{user.motivations && user.motivations.length > 0 ? formatList(user.motivations) : 'No motivations selected'}</Text>
      <Text style={styles.label}>Comfortable Poses:</Text>
      <Text style={styles.value}>{user.comfortablePoses && user.comfortablePoses.length > 0 ? formatList(user.comfortablePoses) : 'No poses selected'}</Text>
      <Text style={styles.label}>Goal Poses:</Text>
      <Text style={styles.value}>{user.goalPoses && user.goalPoses.length > 0 ? formatList(user.goalPoses) : 'No poses selected'}</Text>
      <Text style={styles.label}>Duration:</Text>
      <Text style={styles.value}>{user.duration ? `${user.duration.hour} hour ${user.duration.minute} minutes` : 'No duration selected'}</Text>
      <Text style={styles.label}>Mood:</Text>
      <Text style={styles.value}>{user.mood || 'No mood selected'}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Previous" onPress={handlePrevious} />
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
    marginTop: 20,
  },
});
