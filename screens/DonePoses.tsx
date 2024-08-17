import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DonePoses() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>You can see your progress towars your goals here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});
