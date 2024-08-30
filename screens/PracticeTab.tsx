import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import { generateSequence } from '../sequence_generation/generateSequence';
import { auth, firestore } from '../firebaseSetup'; // Importing your firebase setup

// Static image imports
import wallIcon from '../assets/Images/wall-icon.png';
import blanketIcon from '../assets/Images/blanket-icon.png';
import bolsterIcon from '../assets/Images/bolster-icon.png';
import beltIcon from '../assets/Images/belt-icon.png';
import blocksIcon from '../assets/Images/blocks-icon.png';

// Mood options
const moods = [
  { label: "Calm", subtext: "Low Intensity" },
  { label: "Balanced", subtext: "Moderate" },
  { label: "Pumped up!", subtext: "High Intensity" },
];

const propsOptions = [
  { label: "Wall", icon: wallIcon },
  { label: "Blanket", icon: blanketIcon },
  { label: "Bolster", icon: bolsterIcon },
  { label: "Belt", icon: beltIcon },
  { label: "Blocks", icon: blocksIcon },
];

export default function PracticeTab() {
  const [selectedDuration, setSelectedDuration] = useState(15); // Default to 15 minutes
  const [selectedProps, setSelectedProps] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const navigation = useNavigation();

  const handleSliderChange = (value) => {
    setSelectedDuration(value);
  };

  const togglePropSelection = (prop) => {
    const updatedSelection = selectedProps.includes(prop)
      ? selectedProps.filter(item => item !== prop)
      : [...selectedProps, prop];

    setSelectedProps(updatedSelection);
  };

  const handleMoodPress = (mood) => {
    setSelectedMood(mood);
  };
  
  const handleStartNowPress = async () => {
    const durationInMinutes = selectedDuration;
    const selectedPropLabels = selectedProps.map(prop => prop.label);
    const sequence = generateSequence({ duration: durationInMinutes, props: selectedPropLabels, mood: selectedMood });
  
    const user = auth.currentUser; // Get the current user
    if (user) {
      try {
        const userDocRef = firestore.collection('Users').doc(user.uid);
        const userDocSnapshot = await userDocRef.get();
  
        // If the document doesn't exist, create it with the initial fields
        if (!userDocSnapshot.exists) {
          await userDocRef.set({
            email: user.email,
            name: user.displayName || '',
            yogaExperience: '',
            motivations: [],
            comfortablePoses: [],
            goalPoses: [],
            history: []
          });
        }
  
        // Now, add the practice session to the history
        const history = userDocSnapshot.data()?.history || [];
  
        const newEntry = {
          practice_request: { durationInMinutes, selectedPropLabels, selectedMood },
          generated_seq: sequence,
        };
  
        history.push(newEntry);
  
        // Update the history in Firestore
        await userDocRef.update({ history });
  
        // Navigate to VideoPlayer and pass sequence
        navigation.navigate('VideoPlayer', { sequence });
      } catch (error) {
        console.error('Error storing practice request:', error);
      }
    }
  };

  return (
    <ImageBackground source={require('../assets/Images/practice_background.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={[styles.text, styles.title]}>Select Workout</Text>

        <Text style={[styles.text, styles.marginTop]}>Duration: {Math.floor(selectedDuration / 60)}h {selectedDuration % 60}m</Text>
        <Slider
          style={styles.slider}
          minimumValue={15}
          maximumValue={90}
          step={5}
          value={selectedDuration}
          onValueChange={handleSliderChange}
          minimumTrackTintColor="#76c7c0"
          maximumTrackTintColor="#000000"
        />

        <Text style={[styles.text, styles.marginTop]}>Available props</Text>
        <View style={styles.propsRow}>
          {propsOptions.map((prop, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.propContainer,
                selectedProps.includes(prop) && styles.selectedPropContainer
              ]}
              onPress={() => togglePropSelection(prop)}
            >
              <Image source={prop.icon} style={styles.propImage} />
              <Text style={styles.propLabel}>{prop.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.text, styles.marginTop]}>Mood</Text>
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

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.startNowButton} onPress={handleStartNowPress}>
            <Text style={styles.startNowButtonText}>Start now</Text>
          </TouchableOpacity>
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
  text: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 30, // Larger font for title
    fontWeight: 'bold',
  },
  marginTop: {
    marginTop: 20,
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 30,
  },
  propsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 20,
  },
  propContainer: {
    alignItems: 'center',
  },
  selectedPropContainer: {
    borderColor: 'green',
    borderWidth: 3,
    borderRadius: 10,
    padding: 5,
  },
  propImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  propLabel: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
  },
  moodBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  moodContainer: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    width: 120,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  startNowButton: {
    backgroundColor: '#76c7c0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',  
    marginTop: 100,
  },
  startNowButtonText: {
    fontSize: 18,
    color: 'white',
  },
});
