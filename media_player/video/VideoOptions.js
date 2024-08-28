import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Dimensions } from 'react-native';

export default function VideoOptions({ onSelect }) {
  return (
    <View style={styles.optionsContainer}>
      <Text style={styles.optionText}>Choose the next video:</Text>
      <TouchableOpacity style={styles.optionButton} onPress={() => onSelect(1)}>
        <Text style={styles.optionButtonText}>Play Video 1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionButton} onPress={() => onSelect(2)}>
        <Text style={styles.optionButtonText}>Play Video 2</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionButton} onPress={() => onSelect(3)}>
        <Text style={styles.optionButtonText}>Play Video 3</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  optionsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    flex: 1,
    width: '100%',
  },
  optionText: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#76c7c0',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  optionButtonText: {
    color: 'white',
    fontSize: 18,
  },
  // Additional styles for other components can be added here
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  video: {
    width: Dimensions.get('window').height,
    height: Dimensions.get('window').width,
    transform: [{ rotate: '90deg' }],
  },
  overlay: {
    position: 'absolute',
    top: '40%',
    left: '10%',
    right: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 10,
  },
  sequenceText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  controlButton: {
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 5,
  },
  controlText: {
    color: 'white',
    fontSize: 18,
  },
});
