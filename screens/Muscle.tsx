import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function Muscle() {
  return (
    <View style={styles.container}>
      <Text style={styles.overlayText}>Your weekly muscle usage</Text>
      <Image source={require('../assets/muscle-usage-temp.jpg')} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
  overlayText: {
    position: 'absolute',
    top: '10%', // Adjust this percentage to move the text lower
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    zIndex: 1,
  },
});
