import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { Video } from 'expo-av';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getVideoSource } from './getVideoSource';
import VideoControls from './VideoControls';

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { sequence } = route.params;
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [status, setStatus] = useState({});
  const [playbackRate, setPlaybackRate] = useState(1.0);

  // Use Effect to reset the video component when the video index changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.stopAsync(); // Stop the current video
      videoRef.current.unloadAsync(); // Unload the current video
      videoRef.current.loadAsync(
        getVideoSource(sequence[currentVideoIndex].replace('.mp4', '')),
        { rate: playbackRate },
        false
      ); // Load the new video
      videoRef.current.playAsync(); // Play the new video
    }
  }, [currentVideoIndex, playbackRate]);

  const handleVideoEnd = () => {
    if (currentVideoIndex < sequence.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabNavigator', params: { screen: 'PracticeTab' } }],
      });
    }
  };

  const handlePausePress = () => {
    setIsPaused(!isPaused);
    if (isPaused) {
      videoRef.current.playAsync();
    } else {
      videoRef.current.pauseAsync();
    }
  };

  const handleExitPress = async () => {
    if (videoRef.current) {
      await videoRef.current.pauseAsync(); // Pause the video
      await videoRef.current.unloadAsync(); // Unload the video to stop the audio
    }
    navigation.goBack();
  };

  const handleSpeedChange = (newSpeed) => {
    setPlaybackRate(newSpeed);
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={getVideoSource(sequence[currentVideoIndex].replace('.mp4', ''))}
        style={styles.video}
        resizeMode="contain"  // This ensures the video maintains aspect ratio and is fully visible
        shouldPlay={!isPaused}
        rate={playbackRate}
        onPlaybackStatusUpdate={status => {
          setStatus(status);
          if (status.didJustFinish) {
            handleVideoEnd();
          }
        }}
      />
      <VideoControls
        isPaused={isPaused}
        onPausePlay={handlePausePress}
        onExit={handleExitPress}
        onChangeSpeed={handleSpeedChange}
        playbackSpeed={playbackRate}
      />
      <View style={styles.overlay}>
        <Text style={styles.sequenceText}>Current Sequence:</Text>
        {sequence.map((video, index) => (
          <Text key={index} style={styles.sequenceText}>{`${index + 1}: ${video}`}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  video: {
    width: Dimensions.get('window').height,  // Ensure video uses full screen
    height: Dimensions.get('window').width,
    transform: [{ rotate: '90deg' }],
  },
  overlay: {
    position: 'absolute',
    top: '10%',
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
});

export default VideoPlayer;
