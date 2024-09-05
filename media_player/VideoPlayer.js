import React, { useRef, useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { Video, Audio } from 'expo-av';
import { useNavigation, useRoute } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import { getMediaSources } from './getMediaSources';
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
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    console.log("Preloading all media...");
    preloadAllMedia(sequence);
  }, []);

  const preloadAllMedia = async (sequence) => {
    try {
      const loadedMedia = [];

      for (let i = 0; i < sequence.length; i++) {
        const mediaFile = sequence[i];
        const { videoUri, audioUri } = await getMediaSources(mediaFile);
        
        if (videoUri && audioUri) {
          const audioRef = new Audio.Sound();
          console.log(`Preloading video index ${i}`);
          console.log(`Preloading audio index ${i}`);

          await audioRef.loadAsync(audioUri, { shouldPlay: false });
          await audioRef.setRateAsync(playbackRate, true);

          audioRefs.current[i] = audioRef;
          loadedMedia.push({ videoUri, audioUri });

          // Update loading progress
          setLoadingProgress(Math.round(((i + 1) / sequence.length) * 100));
        } else {
          console.error(`Failed to preload media at index ${i}`);
        }
      }

      preloadedMediaRef.current = loadedMedia; // Assign to ref
      console.log(`Loaded media length: ${loadedMedia.length}`);

      if (loadedMedia.length === sequence.length) {
        console.log("All media preloaded. Waiting for video ref to initialize...");
        setMediaLoaded(true);
      } else {
        throw new Error("Not all media files were preloaded correctly.");
      }
    } catch (error) {
      console.error("Error preloading media:", error);
      navigation.goBack();
    }
  };

  useEffect(() => {
    if (mediaLoaded && videoRef.current) {
      console.log("Video ref initialized. Starting playback...");
      startPlayback(0);
    }
  }, [mediaLoaded, videoRef.current]);

  const startPlayback = async (index) => {
    try {
      const preloadedMedia = preloadedMediaRef.current;
      console.log(`Attempting to start playback for index ${index}`);
      console.log(`Preloaded media length: ${preloadedMedia.length}`);

      if (!preloadedMedia || preloadedMedia.length === 0) {
        throw new Error("preloadedMedia array is empty or not initialized.");
      }

      if (!preloadedMedia[index]) {
        throw new Error(`No preloaded media found for index ${index}`);
      }

      if (!videoRef.current) {
        throw new Error("videoRef is not initialized.");
      }

      const { videoUri } = preloadedMedia[index];
      const audioRef = audioRefs.current[index];

      console.log(`Playing video index ${index} and audio index ${index}`);

      await videoRef.current.loadAsync(videoUri, { shouldPlay: true });
      await videoRef.current.setRateAsync(playbackRate, true);
      await audioRef.playAsync();
    } catch (error) {
      console.error("Error starting playback:", error);
      navigation.goBack();
    }
  };

  const handleVideoEnd = async () => {
    console.log(`Video ended for index: ${currentIndex}`);
    if (currentIndex < sequence.length - 1) {
      console.log('Switching to next media');
      await switchToNextMedia(currentIndex + 1);
    } else {
      console.log('End of sequence, navigating back');
      await unloadAllMedia();
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

  const unloadAllMedia = async () => {
    try {
      console.log("Unloading all media...");
      if (videoRef.current) {
        await videoRef.current.stopAsync();
        await videoRef.current.unloadAsync();
      }
      for (let i = 0; i < audioRefs.current.length; i++) {
        if (audioRefs.current[i] && audioRefs.current[i]._loaded) {
          await audioRefs.current[i].stopAsync();
          await audioRefs.current[i].unloadAsync();
        }
      }
    } catch (error) {
      console.error("Error unloading media:", error);
    }
  };

  const handlePausePress = async () => {
    setIsPaused(!isPaused);
    const audioRef = audioRefs.current[currentIndex];
    if (isPaused) {
      console.log('Resuming playback');
      await videoRef.current.playAsync();
      await audioRef.playAsync();
    } else {
      console.log('Pausing playback');
      await videoRef.current.pauseAsync();
      await audioRef.pauseAsync();
    }
  };

  const handleExitPress = async () => {
    console.log('Exiting, pausing and unloading media');
    await unloadAllMedia();
    navigation.goBack();
  };

  const handleSpeedChange = async (newSpeed) => {
    setPlaybackRate(newSpeed);
    try {
      console.log(`Changing playback speed to: ${newSpeed}`);
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
    console.log(`Slider value changed to: ${value}`);
    try {
      if (videoRef.current) {
        await videoRef.current.setPositionAsync(value);
      }
      if (audioRefs.current[currentIndex]._loaded) {
        await audioRefs.current[currentIndex].setPositionAsync(value);
      }
    } catch (error) {
      console.error('Error setting position:', error);
    }
  };

  if (!mediaLoaded) {
    return (
      <View style={sharedStyles.container}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Loading {loadingProgress}%</Text>
      </View>
    );
  }

  return (
    <View style={sharedStyles.container}>
      <Video
        ref={videoRef}
        style={sharedStyles.video}
        resizeMode="cover"
        isMuted={true}
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
  loadingText: {
    color: '#ffffff',
    marginTop: 10,
    fontSize: 18,
  },
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
