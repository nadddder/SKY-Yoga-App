import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { sharedStyles } from './styles';

export default function VideoControls({ isPaused, onPausePlay, onExit, onChangeSpeed, playbackSpeed }) {
  const [showSpeedOptions, setShowSpeedOptions] = useState(false);

  const handleSpeedPress = () => {
    setShowSpeedOptions(!showSpeedOptions);
  };

  return (
    <>
      <TouchableOpacity style={sharedStyles.playPauseButton} onPress={onPausePlay}>
        <MaterialIcons
          name={isPaused ? 'play-arrow' : 'pause'}
          size={48}
          color="white"
          style={{ transform: [{ rotate: '90deg' }] }}
        />
      </TouchableOpacity>
      <TouchableOpacity style={sharedStyles.exitButton} onPress={onExit}>
        <MaterialIcons
          name="close"
          size={36}
          color="white"
          style={{ transform: [{ rotate: '90deg' }] }}
        />
      </TouchableOpacity>
      <TouchableOpacity style={sharedStyles.speedButton} onPress={handleSpeedPress}>
        <Text style={[sharedStyles.speedButtonText, { transform: [{ rotate: '90deg' }] }]}>
          x{playbackSpeed}
        </Text>
      </TouchableOpacity>
      {showSpeedOptions && (
        <View style={sharedStyles.speedOptions}>
          {[1, 2, 5].map((speed) => (
            <TouchableOpacity
              key={speed}
              onPress={() => {
                onChangeSpeed(speed);
                setShowSpeedOptions(false);
              }}
              style={sharedStyles.speedOption}
            >
              <Text style={[sharedStyles.speedOptionText, { transform: [{ rotate: '90deg' }] }]}>
                x{speed}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
}
