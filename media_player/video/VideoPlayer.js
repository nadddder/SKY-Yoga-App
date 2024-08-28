import React, { useRef, useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { useNavigation, useRoute } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import { getVideoSource } from './getVideoSource';
import VideoControls from './VideoControls';
import { sharedStyles } from './styles';

export default function VideoPlayer() {
  const videoRef = useRef(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { sequence } = route.params;
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [status, setStatus] = useState({});
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [loading, setLoading] = useState(true);
  const [videoUri, setVideoUri] = useState(null);
  const [nextVideoUri, setNextVideoUri] = useState(null);

  useEffect(() => {
    const loadVideo = async () => {
      setLoading(true);
      const source = await getVideoSource(sequence[currentVideoIndex]);
      setVideoUri(source);
      setLoading(false);

      // Preload the next video in the sequence
      if (currentVideoIndex < sequence.length - 1) {
        const nextSource = await getVideoSource(sequence[currentVideoIndex + 1]);
        setNextVideoUri(nextSource);
      }
    };

    loadVideo();
  }, [currentVideoIndex]);

  const handleVideoEnd = async () => {
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
      await videoRef.current.pauseAsync();
      await videoRef.current.unloadAsync();
    }
    navigation.goBack();
  };

  const handleSpeedChange = (newSpeed) => {
    setPlaybackRate(newSpeed);
  };

  const handleSliderValueChange = async (value) => {
    if (videoRef.current) {
      await videoRef.current.setPositionAsync(value);
    }
  };

  return (
    <View style={sharedStyles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <>
          <Video
            ref={videoRef}
            source={videoUri}
            style={sharedStyles.video}
            resizeMode="cover"
            shouldPlay={!isPaused}
            rate={playbackRate}
            onPlaybackStatusUpdate={(status) => {
              setStatus(status);
              if (status.didJustFinish) {
                handleVideoEnd();
              }
            }}
          />
          <View style={styles.progressBarContainer}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={status.durationMillis || 0}
              value={status.positionMillis || 0}
              onSlidingComplete={handleSliderValueChange}
              minimumTrackTintColor="#76c7c0"
              maximumTrackTintColor="#000000"
              thumbTintColor="#ffffff"
            />
          </View>
        </>
      )}
      <VideoControls
        isPaused={isPaused}
        onPausePlay={handlePausePress}
        onExit={handleExitPress}
        onChangeSpeed={handleSpeedChange}
        playbackSpeed={playbackRate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  progressBarContainer: {
    position: 'absolute',
    bottom: Dimensions.get('window').width * 0.8,
    left: -Dimensions.get('window').height * 0.3,
    right: 0,
    height: Dimensions.get('window').width * 0.55,
    width: Dimensions.get('window').height * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '90deg' }],
  },
  slider: {
    width: '100%',  // Make the slider fill the container width
    height: 40,
  },
});
