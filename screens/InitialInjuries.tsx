// screens/InitialInjuries.tsx
import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';

const TOUCH_RADIUS = 20; // Radius within which a touch is considered close to an existing dot

export default function InitialInjuries() {
  const [touchPoints, setTouchPoints] = useState([]);
  const [recording, setRecording] = useState(null);
  const [sound, setSound] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (sound) {
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setCurrentPosition(status.positionMillis);
          setIsPlaying(status.isPlaying);
        }
      });
    }
  }, [sound]);

  const handleNext = () => {
    navigation.navigate('MainTabNavigator');
  };

  const handlePrevious = () => {
    navigation.navigate('InitialMotivation');
  };

  const handleTouch = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    const touchIndex = touchPoints.findIndex(
      point => Math.hypot(point.x - locationX, point.y - locationY) < TOUCH_RADIUS
    );

    if (touchIndex !== -1) {
      // Remove the point if touched again
      setTouchPoints(touchPoints.filter((_, index) => index !== touchIndex));
    } else {
      // Add the new touch point
      setTouchPoints([...touchPoints, { x: locationX, y: locationY }]);
    }
  };

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') return;

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    await recording.stopAndUnloadAsync();
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    setSound(sound);
    setRecordingDuration(status.durationMillis);
    setRecording(null);
  };

  const playSound = async () => {
    if (sound) {
      await sound.replayAsync();
    }
  };

  const pauseSound = async () => {
    if (sound) {
      await sound.pauseAsync();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.text}>Are there any areas we need to be gentle with?</Text>
        <Text style={styles.subText}>(Click on the areas)</Text>
        <TouchableOpacity onPress={handleTouch} style={styles.imageWrapper}>
          <Image source={require('../assets/human-muscle.png')} style={styles.image} />
          {touchPoints.map((point, index) => (
            <View
              key={index}
              style={[styles.touchPoint, { left: point.x - 10, top: point.y - 10 }]}
            />
          ))}
        </TouchableOpacity>
        <View style={styles.recordingContainer}>
          <Text style={styles.recordingText}>Tell us more details</Text>
          <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}>
            <Image source={require('../assets/Images/recordingicon.png')} style={styles.recordingIcon} />
          </TouchableOpacity>
          {sound && !isRecording && (
            <Button title={isPlaying ? "Pause" : "Play Recording"} onPress={isPlaying ? pauseSound : playSound} />
          )}
          {(isRecording || isPlaying) && (
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${((isRecording ? recordingDuration : currentPosition) / recordingDuration) * 100}%`,
                  },
                ]}
              />
            </View>
          )}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Previous" onPress={handlePrevious} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Next" onPress={handleNext} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black', // Ensure the text is visible
    marginBottom: 10,
    fontSize: 24, // Increased font size for the question
    textAlign: 'center',
  },
  subText: {
    color: 'black', // Ensure the text is visible
    marginBottom: 20,
    fontSize: 16, // Smaller font size for the description
    textAlign: 'center',
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: Dimensions.get('window').width - 32, // To keep some padding on the sides
    height: undefined,
    aspectRatio: 1, // Ensure the image keeps its aspect ratio
  },
  touchPoint: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'red',
  },
  recordingContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  recordingText: {
    marginBottom: 10,
    fontSize: 24, // Increased font size
  },
  recordingIcon: {
    width: 50,
    height: 50,
    marginVertical: 10,
  },
  progressBarContainer: {
    width: '80%',
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#76c7c0',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 10,
  },
});
