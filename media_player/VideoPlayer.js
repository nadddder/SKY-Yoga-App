import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, AppState } from 'react-native';
import { Video, Audio } from 'expo-av';
import { useNavigation, useRoute } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import { getMediaSources, removeAllCachedMedia } from './getMediaSources';
import VideoControls from './VideoControls';
import { sharedStyles } from './styles';

export default function VideoPlayer() {
  const videoRef = useRef(null);
  const audioRefs = useRef([]);
  const preloadedMediaRef = useRef([]);
  const navigation = useNavigation();
  const route = useRoute();
  const sequence = route.params.sequence_response.sequence;
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [isPaused, setIsPaused] = useState(false);
  const [status, setStatus] = useState({});
  const [videoDuration, setVideoDuration] = useState(0); // Per-video duration
  const [videoElapsed, setVideoElapsed] = useState(0); // Elapsed time for the current video
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    preloadNextMedia(currentIndex);

    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        cleanupCachedMedia();
        pauseAllMedia(); // Stop the media when the app is backgrounded
      }
      appState.current = nextAppState;
    };

    const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      appStateSubscription.remove();
    };
  }, []);

  const preloadNextMedia = async (index) => {
    if (index >= sequence.length) return;

    try {
      const mediaFile = sequence[index];
      const { videoUri, audioUri } = await getMediaSources(mediaFile);

      if (videoUri && audioUri) {
        const audioRef = new Audio.Sound();
        await audioRef.loadAsync(audioUri, { shouldPlay: false });
        await audioRef.setRateAsync(playbackRate, true);

        audioRefs.current[index] = audioRef;
        preloadedMediaRef.current[index] = { videoUri, audioUri };

        if (index < sequence.length - 1) {
          preloadNextMedia(index + 1);
        }

        if (index === 0) {
          setMediaLoaded(true);
          startPlayback(0);
        }
      }
    } catch (error) {
      console.error("Error preloading media:", error);
      navigation.goBack();
    }
  };

  const startPlayback = async (index) => {
    try {
      const preloadedMedia = preloadedMediaRef.current;

      if (!preloadedMedia[index]) throw new Error(`No preloaded media found for index ${index}`);

      const { videoUri } = preloadedMedia[index];
      const audioRef = audioRefs.current[index];

      await videoRef.current.loadAsync(videoUri, { shouldPlay: false });
      const videoStatus = await videoRef.current.getStatusAsync();
      setVideoDuration(videoStatus.durationMillis); // Set the duration for the current video

      await audioRef.playAsync();

      await Promise.all([videoRef.current.playAsync(), audioRef.playAsync()]);
    } catch (error) {
      console.error("Error starting playback:", error);
      navigation.goBack();
    }
  };

  const handleVideoEnd = async () => {
    if (currentIndex < sequence.length - 1) {
      await switchToNextMedia(currentIndex + 1);
    } else {
      await cleanupCachedMedia();
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabNavigator', params: { screen: 'PracticeTab' } }],
      });
    }
  };

  const switchToNextMedia = async (nextIndex) => {
    try {
      if (videoRef.current) {
        await videoRef.current.stopAsync();
        await videoRef.current.unloadAsync();
      }
      if (audioRefs.current[currentIndex]) {
        await audioRefs.current[currentIndex].stopAsync();
      }

      setCurrentIndex(nextIndex);
      startPlayback(nextIndex);
    } catch (error) {
      console.error("Error switching to next media:", error);
      navigation.goBack();
    }
  };

  const cleanupCachedMedia = async () => {
    try {
      await removeAllCachedMedia(sequence);
    } catch (error) {
      console.error("Error removing all cached media files:", error);
    }
  };

  const pauseAllMedia = async () => {
    try {
      if (videoRef.current) {
        await videoRef.current.pauseAsync();
      }
      for (let i = 0; i < audioRefs.current.length; i++) {
        if (audioRefs.current[i] && audioRefs.current[i]._loaded) {
          await audioRefs.current[i].pauseAsync();
        }
      }
    } catch (error) {
      console.error("Error pausing all media:", error);
    }
  };

  const handlePausePress = async () => {
    setIsPaused(!isPaused);
    const audioRef = audioRefs.current[currentIndex];
    if (isPaused) {
      await videoRef.current.playAsync();
      await audioRef.playAsync();
    } else {
      await videoRef.current.pauseAsync();
      await audioRef.pauseAsync();
    }
  };

  const handleExitPress = async () => {
    await pauseAllMedia();
    await cleanupCachedMedia();
    navigation.goBack();
  };

  const handleSpeedChange = async (newSpeed) => {
    setPlaybackRate(newSpeed);
    try {
      if (videoRef.current) {
        await videoRef.current.setRateAsync(newSpeed, true);
      }
      if (audioRefs.current[currentIndex]._loaded) {
        await audioRefs.current[currentIndex].setRateAsync(newSpeed, true);
      }
    } catch (error) {
      console.error('Error changing playback speed:', error);
    }
  };

  const handleSliderValueChange = async (value) => {
    const newPosition = value * videoDuration; // Calculate the position in the current video
    await videoRef.current.setPositionAsync(newPosition);
    const audioRef = audioRefs.current[currentIndex];
    await audioRef.setPositionAsync(newPosition);
    setVideoElapsed(newPosition); // Update the elapsed time for the current video
  };

  return (
    <View style={sharedStyles.container}>
      <Video
        ref={videoRef}
        style={sharedStyles.video}
        resizeMode="cover"
        isMuted={true}
        onPlaybackStatusUpdate={(status) => {
          if (status.isLoaded && status.durationMillis) {
            setVideoElapsed(status.positionMillis);
            setVideoDuration(status.durationMillis);
            if (status.didJustFinish) {
              handleVideoEnd();
            }
          }
        }}
      />
      <View style={styles.progressBarContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={videoDuration > 0 ? videoElapsed / videoDuration : 0} // Per-video progress
          onSlidingComplete={handleSliderValueChange}
          minimumTrackTintColor="#76c7c0"
          maximumTrackTintColor="#000000"
          thumbTintColor="#ffffff"
        />
      </View>
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
    width: '100%',
    height: 40,
  },
});
