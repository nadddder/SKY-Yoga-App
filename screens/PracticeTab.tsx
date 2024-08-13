import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';
import { pickRandomVideo } from '../sequence_generation/pickVideo'; 

const moods = [
  { label: "Calm", subtext: "Low Intensity" },
  { label: "Balanced", subtext: "Moderate" },
  { label: "Pumped up!", subtext: "High Intensity" },
];

export default function PracticeTab() {
  const { user, setUser } = useContext(UserContext);
  const [selectedDuration, setSelectedDuration] = useState(user.duration || { hour: 0, minute: 0 });
  const [selectedMood, setSelectedMood] = useState(user.mood || null);
  const [recording, setRecording] = useState(null);
  const [sound, setSound] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const navigation = useNavigation();

  const handleMoodPress = (mood) => {
    setSelectedMood(mood);
    setUser(prevState => ({ ...prevState, mood: mood.subtext }));
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

  const handleInstructMePress = () => {
    const selectedVideo = pickRandomVideo()
    navigation.navigate('VideoPlayer', { videoFile: selectedVideo }); // Pass the video file as a parameter
  };

  return (
    <ImageBackground source={require('../assets/Images/background.png')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={[styles.text, styles.marginTop]}>Select your Workout Details</Text>
          <Text style={[styles.text, styles.marginTop]}>Duration</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedDuration.hour}
              style={styles.narrowPicker}
              onValueChange={(itemValue) => setSelectedDuration({ ...selectedDuration, hour: itemValue })}
            >
              {Array.from({ length: 2 }, (_, i) => i).map((value) => (
                <Picker.Item key={value} label={`${value} hr`} value={value} />
              ))}
            </Picker>
            <Picker
              selectedValue={selectedDuration.minute}
              style={styles.narrowPicker}
              onValueChange={(itemValue) => setSelectedDuration({ ...selectedDuration, minute: itemValue })}
            >
              {Array.from({ length: 12 }, (_, i) => i * 5).map((value) => (
                <Picker.Item key={value} label={`${value} min`} value={value} />
              ))}
            </Picker>
          </View>
          <Text style={[styles.text, styles.marginTop]}>Select your workout mood</Text>
          <View style={styles.moodBar}>
            {moods.map((mood, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleMoodPress(mood)}
                style={[
                  styles.moodContainer,
                  selectedMood === mood && styles.selectedMood
                ]}
              >
                <Text style={styles.moodText}>{mood.label}</Text>
                <Text style={styles.moodSubtext}>{mood.subtext}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.recordingContainer}>
            <Text style={[styles.recordingText, styles.marginTop]}>Anything else you want to share or ask for?</Text>
            <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}>
              <Image source={require('../assets/Images/recordingicon.png')} style={styles.recordingIcon} />
            </TouchableOpacity>
            {sound && !isRecording && (
              <Button title={isPlaying ? "Pause" : "Play Recording"} onPress={isPlaying ? pauseSound : playSound} />
            )}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.instructMeButton} onPress={handleInstructMePress}>
              <Text style={styles.instructMeButtonText}>Instruct me!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 16,
    marginTop: 50, 
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 1, 
  },
  marginTop: {
    marginTop: 20,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 1, 
  },
  narrowPicker: {
    paddingVertical: 1,
    width: 100, 
  },
  moodBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3, 
  },
  moodContainer: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    width: 120, // Narrow the toggle buttons
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray', // Add border to indicate choices
  },
  selectedMood: {
    backgroundColor: '#76c7c0',
  },
  moodText: {
    fontSize: 18,
    color: 'black',
  },
  moodSubtext: {
    fontSize: 14,
    color: 'gray',
  },
  recordingContainer: {
    marginTop: 20,
    alignItems: 'center',
    paddingBottom: 40, 
  },
  recordingText: {
    marginBottom: 10,
    fontSize: 18,
  },
  recordingIcon: {
    width: 50,
    height: 50,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', 
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 10,
  },
  instructMeButton: {
    backgroundColor: '#76c7c0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructMeButtonText: {
    fontSize: 18,
    color: 'white',
  },
});
