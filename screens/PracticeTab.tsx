import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import { auth, firestore } from '../firebaseSetup'; // Importing your firebase setup
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
  const [selectedDuration, setSelectedDuration] = useState(35);
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
  
    try {
      const user = auth.currentUser; 
      
      if (user) {
        const userDocRef = firestore.collection('Users').doc(user.uid);
        const userDocSnapshot = await userDocRef.get();

        const practiceRequest = {
          durationInMinutes,
          selectedPropLabels,
          selectedMood
        };
  
        // Get the Firebase ID token from the current user
        const idToken = await user.getIdToken();

        // Fetch the sequence from the Firebase function with the ID token in the headers
        const response = await fetch('https://generate-sequence-zkysp7qigq-uc.a.run.app', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}` // Include the ID token here
          },
          body: JSON.stringify({
            userDoc: userDocSnapshot.data(),
            practiceRequest 
          })
        });
  
        const sequence_response = JSON.parse(await response.text());
        console.log("Server Response:", sequence_response);
  
        // Now, add the practice session to the history
        const history = userDocSnapshot.data()?.history || [];
  
        const newEntry = {
          practice_request: { 
            durationInMinutes: practiceRequest.durationInMinutes,
            selectedMood: practiceRequest.selectedMood,
            selectedPropLabels: practiceRequest.selectedPropLabels
          },
          generated_seq: Array.isArray(sequence_response.sequence) ? sequence_response.sequence : [], // Ensure it's saved as an array
        };
        
        history.push(newEntry);
        
        await userDocRef.update({ history });        
  
        // Navigate to VideoPlayer and pass sequence_response
        navigation.navigate('VideoPlayer', { sequence_response });
      }
    } catch (error) {
      // Log any errors encountered during fetching or parsing
      console.error('Error fetching or storing practice request:', error);
    }
  };
  
  return (
    <ImageBackground source={require('../assets/Images/practice_background.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={[styles.text, styles.title]}>Select Workout</Text>

        <Text style={[styles.text, styles.marginTop]}>
          Duration: {selectedDuration >= 60 ? `${Math.floor(selectedDuration / 60)}h ` : ''}{selectedDuration % 60}m {'<>'}
        </Text>
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

        <Text style={[styles.text, styles.marginTop]}>Props available to you today</Text>
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
    fontSize: wp('5%'), // Adjust text size based on screen width
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: wp('6.5%'), // Larger font for title based on screen width
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
    width: wp('12%'), // Scale prop images based on screen width
    height: wp('12%'),
    resizeMode: 'contain',
  },
  propLabel: {
    marginTop: 5,
    fontSize: wp('4%'), // Scale prop label size
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
    fontSize: wp('4.5%'), // Adjust mood text size
    color: 'black',
  },
  moodSubtext: {
    fontSize: wp('3.5%'), // Adjust mood subtext size
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
    fontSize: wp('4.5%'), // Adjust button text size
    color: 'white',
  },
});
