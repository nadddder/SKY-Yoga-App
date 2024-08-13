import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function VideoControls({ isPaused, onPausePlay, onExit, onChangeSpeed, playbackSpeed }) {
  return (
    <>
      <TouchableOpacity style={styles.playPauseButton} onPress={onPausePlay}>
        <MaterialIcons
          name={isPaused ? 'play-arrow' : 'pause'}
          size={48}
          color="red"
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.exitButton} onPress={onExit}>
        <MaterialIcons name="close" size={36} color="red" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.speedButton} onPress={onChangeSpeed}>
        <Text style={styles.speedButtonText}>x{playbackSpeed}</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  playPauseButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -24 }, { translateY: -24 }],
    zIndex: 1,
  },
  exitButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  speedButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    zIndex: 1,
    backgroundColor: 'transparent',
    padding: 10,
  },
  speedButtonText: {
    color: 'red',
    fontSize: 24,
  },
});
