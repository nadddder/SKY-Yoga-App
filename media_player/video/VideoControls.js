import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function VideoControls({ isPaused, onPausePlay, onExit, onChangeSpeed, playbackSpeed }) {
  const [showSpeedOptions, setShowSpeedOptions] = useState(false);

  const handleSpeedPress = () => {
    setShowSpeedOptions(!showSpeedOptions);
  };

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
      <TouchableOpacity style={styles.speedButton} onPress={handleSpeedPress}>
        <Text style={styles.speedButtonText}>x{playbackSpeed}</Text>
      </TouchableOpacity>
      {showSpeedOptions && (
        <View style={styles.speedOptions}>
          {[1, 2, 5].map((speed) => (
            <TouchableOpacity
              key={speed}
              onPress={() => {
                onChangeSpeed(speed);
                setShowSpeedOptions(false);
              }}
              style={styles.speedOption}
            >
              <Text style={styles.speedOptionText}>x{speed}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  playPauseButton: {
    position: 'absolute',
    top: '45%',
    left: '45%',
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  speedButtonText: {
    color: 'red',
    fontSize: 24,
  },
  speedOptions: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
    zIndex: 2,
  },
  speedOption: {
    padding: 10,
  },
  speedOptionText: {
    color: 'white',
    fontSize: 18,
  },
});
