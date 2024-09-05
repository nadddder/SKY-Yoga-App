import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DonePoses() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>See progress towards goals or set new goals</Text>
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
