import React, { useRef, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { useNavigation, useRoute } from '@react-navigation/native';
import VideoControls from './VideoControls';
import VideoOptions from './VideoOptions';
import { getVideoSource } from './utils';

const { width, height } = Dimensions.get('window');

export default function VideoPlayer() {
  const videoRef = useRef(null);
  const navigation = useNavigation();
  const route = useRoute();

  const { videoFile } = route.params;
  const [showOptions, setShowOptions] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(6);  // Set default speed to x6

  const handleVideoEnd = () => {
    if (!hasInteracted) {
      setShowOptions(true);
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabNavigator', params: { screen: 'PracticeTab' } }],
      });
    }
  };

  const handleOptionSelect = (option) => {
    setHasInteracted(true);
    let nextVideoFile;
    switch (option) {
      case 1:
        nextVideoFile = 'test1.mp4';
        break;
      case 2:
        nextVideoFile = 'test2.mp4';
        break;
      case 3:
        nextVideoFile = 'test3.mp4';
        break;
      default:
        nextVideoFile = 'test1.mp4';
    }
    navigation.navigate('VideoPlayer', { videoFile: nextVideoFile });
    setShowOptions(false);
  };

  const handlePausePlay = () => {
    if (isPaused) {
      videoRef.current.playAsync();
    } else {
      videoRef.current.pauseAsync();
    }
    setIsPaused(!isPaused);
  };

  const handleExit = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabNavigator', params: { screen: 'PracticeTab' } }],
    });
  };

  const handleChangeSpeed = () => {
    const newSpeed = playbackSpeed === 6 ? 1 : 6;  // Toggle between x6 and x1
    setPlaybackSpeed(newSpeed);
    videoRef.current.setRateAsync(newSpeed, true);
  };

  return (
    <View style={styles.container}>
      {!showOptions ? (
        <>
          <Video
            ref={videoRef}
            source={getVideoSource(videoFile)}
            style={styles.video}
            resizeMode="cover"
            rate={playbackSpeed}  // Set initial playback speed
            shouldPlay
            onPlaybackStatusUpdate={(status) => {
              if (status.didJustFinish) {
                handleVideoEnd();
              }
            }}
          />
          <VideoControls
            isPaused={isPaused}
            onPausePlay={handlePausePlay}
            onExit={handleExit}
            onChangeSpeed={handleChangeSpeed}
            playbackSpeed={playbackSpeed}
          />
        </>
      ) : (
        <VideoOptions onSelect={handleOptionSelect} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  video: {
    width: height,
    height: width,
    transform: [{ rotate: '90deg' }],
  },
});
