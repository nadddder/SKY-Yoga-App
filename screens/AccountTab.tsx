import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { UserContext } from '../context/UserContext';

export default function AccountTab() {
  const { user } = useContext(UserContext);

  const formatList = (list) => {
    return list.join(', ');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.item}>
        <Text style={styles.label}>Name: </Text>
        <Text style={styles.value}>{user.name}</Text>
      </Text>
      <Text style={styles.item}>
        <Text style={styles.label}>Email: </Text>
        <Text style={styles.value}>{user.email}</Text>
      </Text>
      <Text style={styles.item}>
        <Text style={styles.label}>Yoga Experience: </Text>
        <Text style={styles.value}>{user.yogaExperience}</Text>
      </Text>
      <Text style={styles.item}>
        <Text style={styles.label}>Primary Sports: </Text>
        <Text style={styles.value}>
          {user.primarySports && user.primarySports.length > 0 ? formatList(user.primarySports) : 'No sports selected'}
        </Text>
      </Text>
      <Text style={styles.item}>
        <Text style={styles.label}>Motivations: </Text>
        <Text style={styles.value}>
          {user.motivations && user.motivations.length > 0 ? formatList(user.motivations) : 'No motivations selected'}
        </Text>
      </Text>
      <Text style={styles.item}>
        <Text style={styles.label}>Comfortable Poses: </Text>
        <Text style={styles.value}>
          {user.comfortablePoses && user.comfortablePoses.length > 0 ? formatList(user.comfortablePoses) : 'No poses selected'}
        </Text>
      </Text>
      <Text style={styles.item}>
        <Text style={styles.label}>Goal Poses: </Text>
        <Text style={styles.value}>
          {user.goalPoses && user.goalPoses.length > 0 ? formatList(user.goalPoses) : 'No poses selected'}
        </Text>
      </Text>
      <Text style={styles.item}>
        <Text style={styles.label}>Duration: </Text>
        <Text style={styles.value}>
          {user.duration ? `${user.duration.hour} hour ${user.duration.minute} minutes` : 'No duration selected'}
        </Text>
      </Text>
      <Text style={styles.item}>
        <Text style={styles.label}>Mood: </Text>
        <Text style={styles.value}>{user.mood || 'No mood selected'}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 90, 
  },
  item: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  value: {
    fontSize: 18,
    color: 'black',
  },
});
