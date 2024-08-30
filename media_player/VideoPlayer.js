import React, { useRef, useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { Video, Audio } from 'expo-av';
import { useNavigation, useRoute } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import { getMediaSources } from './getMediaSources';
import VideoControls from './VideoControls';
import { sharedStyles } from './styles';

export default function VideoPlayer() {
  const videoRef = useRef(null);
  const audioRefQueue = useRef([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { sequence } = route.params;
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [status, setStatus] = useState({});
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [loading, setLoading] = useState(true);
  const [videoUri, setVideoUri] = useState(null);

  useEffect(() => {
    const loadMedia = async () => {
      setLoading(true);

      try {
        // Fetch current video and audio sources
        const { videoUri, audioUri } = await getMediaSources(sequence[currentVideoIndex]);
        setVideoUri(videoUri);

        if (audioUri) {
          // Preload audio and add to queue
          const soundObject = new Audio.Sound();
          await soundObject.loadAsync(audioUri);
          await soundObject.setRateAsync(playbackRate, true);
          audioRefQueue.current.push(soundObject);

          // Start playing the first in the queue
          if (audioRefQueue.current.length === 1) {
            await audioRefQueue.current[0].playAsync();
          }
        }

        // Preload the next few videos and audios in the sequence
        for (let i = 1; i <= 2; i++) {  // Preload the next 2 videos/audios
          if (currentVideoIndex + i < sequence.length) {
            const { audioUri: nextAudio } = await getMediaSources(sequence[currentVideoIndex + i]);
            if (nextAudio) {
              const nextSoundObject = new Audio.Sound();
              await nextSoundObject.loadAsync(nextAudio);
              await nextSoundObject.setRateAsync(playbackRate, true);
              audioRefQueue.current.push(nextSoundObject);
            }
          }
        }
      } catch (error) {
        console.error('Error loading media:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMedia();

    return () => {
      // Unload all audio files in the queue when leaving the screen
      audioRefQueue.current.forEach(async (audioRef) => {
        if (audioRef) {
          try {
            await audioRef.unloadAsync();
          } catch (error) {
            console.error('Error unloading audio:', error);
          }
        }
      });
      audioRefQueue.current = [];
    };
  }, [currentVideoIndex]);

  const handleVideoEnd = async () => {
    if (currentVideoIndex < sequence.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
  
      // Stop the current audio and play the next one in the queue
      if (audioRefQueue.current.length > 0) {
        const currentAudio = audioRefQueue.current.shift();
        if (currentAudio) {
          try {
            await currentAudio.stopAsync();
            await currentAudio.unloadAsync();
          } catch (error) {
            console.error('Error stopping or unloading audio:', error);
          }
        }

        if (audioRefQueue.current.length > 0) {
          try {
            await audioRefQueue.current[0].playAsync();
          } catch (error) {
            console.error('Error playing next audio:', error);
          }
        }
      }
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabNavigator', params: { screen: 'PracticeTab' } }],
      });
    }
  };

  const handlePausePress = async () => {
    setIsPaused(!isPaused);
    if (isPaused) {
      await videoRef.current.playAsync();
      if (audioRefQueue.current.length > 0) {
        try {
          await audioRefQueue.current[0].playAsync();
        } catch (error) {
          console.error('Error resuming audio:', error);
        }
      }
    } else {
      await videoRef.current.pauseAsync();
      if (audioRefQueue.current.length > 0) {
        try {
          await audioRefQueue.current[0].pauseAsync();
        } catch (error) {
          console.error('Error pausing audio:', error);
        }
      }
    }
  };

  const handleExitPress = async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.pauseAsync();
        await videoRef.current.unloadAsync();
      } catch (error) {
        console.error('Error pausing or unloading video:', error);
      }
    }
    if (audioRefQueue.current.length > 0) {
      try {
        const currentAudio = audioRefQueue.current.shift();
        if (currentAudio) {
          await currentAudio.pauseAsync();
          await currentAudio.unloadAsync();
        }
      } catch (error) {
        console.error('Error pausing or unloading audio:', error);
      }
    }
    navigation.goBack();
  };

  const handleSpeedChange = async (newSpeed) => {
    setPlaybackRate(newSpeed);
    if (videoRef.current) {
      try {
        await videoRef.current.setRateAsync(newSpeed, true);
      } catch (error) {
        console.error('Error changing video speed:', error);
      }
    }
    if (audioRefQueue.current.length > 0) {
      try {
        await audioRefQueue.current[0].setRateAsync(newSpeed, true);
      } catch (error) {
        console.error('Error changing audio speed:', error);
      }
    }
  };

  const handleSliderValueChange = async (value) => {
    if (videoRef.current) {
      try {
        await videoRef.current.setPositionAsync(value);
      } catch (error) {
        console.error('Error setting video position:', error);
      }
    }
    if (audioRefQueue.current.length > 0) {
      try {
        await audioRefQueue.current[0].setPositionAsync(value);
      } catch (error) {
        console.error('Error setting audio position:', error);
      }
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
            isMuted={true}  // Ensure the video is muted
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
