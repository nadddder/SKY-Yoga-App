import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button, ImageBackground, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firestore } from '../firebaseSetup';

// Static image imports
import Basketball from '../assets/Other Sports icon/BasketBall.png';
import Cycling from '../assets/Other Sports icon/Cycling.png';
import Golf from '../assets/Other Sports icon/Golf.png';
import Rockclimbing from '../assets/Other Sports icon/Rockclimbing.png';
import Running from '../assets/Other Sports icon/Running.png';
import Skateboarding from '../assets/Other Sports icon/Skateboarding.png';
import Skiing from '../assets/Other Sports icon/Skiing.png';
import SkyDiving from '../assets/Other Sports icon/SkyDiving.png';
import Soccer from '../assets/Other Sports icon/Soccer.png';
import Surfing from '../assets/Other Sports icon/Surfing.png';
import Swimming from '../assets/Other Sports icon/Swimming.png';
import Tennis from '../assets/Other Sports icon/Tennis.png';
import Volleyball from '../assets/Other Sports icon/Volleyball.png';
import Yoga from '../assets/Other Sports icon/Yoga.png';
import Laptop from '../assets/Other Sports icon/Laptop.png';

export default function PrimarySport() {
  const [selectedSports, setSelectedSports] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserSports = async () => {
      try {
        const userDoc = await firestore.collection('Users').doc('user-id-here').get(); // Replace 'user-id-here' with the actual user ID
        if (userDoc.exists) {
          const userData = userDoc.data();
          setSelectedSports(userData.primarySports || []);
        }
      } catch (error) {
        console.error('Error fetching user sports:', error);
      }
    };

    fetchUserSports();
  }, []);

  const toggleSportSelection = (sport) => {
    const updatedSelection = selectedSports.includes(sport)
      ? selectedSports.filter(item => item !== sport)
      : [...selectedSports, sport];

    setSelectedSports(updatedSelection);
  };

  const handleNext = async () => {
    try {
      await firestore.collection('Users').doc('user-id-here').update({
        primarySports: selectedSports
      });
      navigation.navigate('InitialYogaExperience');
    } catch (error) {
      console.error('Error updating sports in Firestore:', error);
    }
  };

  // Mapping sport names to images
  const sportImages = {
    Basketball,
    Cycling,
    Golf,
    Rockclimbing,
    Running,
    Skateboarding,
    Skiing,
    SkyDiving,
    Soccer,
    Surfing,
    Swimming,
    Tennis,
    Volleyball,
    Yoga,
    Laptop,
  };

  const sportsOptions = Object.keys(sportImages);

  return (
    <ImageBackground source={require('../assets/Images/background.png')} style={styles.container}>
      <Text style={styles.question}>Select your primary sports</Text>
      <View style={styles.grid}>
        {sportsOptions.map((sport, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.sportContainer,
              selectedSports.includes(sport) && styles.selectedSportContainer
            ]}
            onPress={() => toggleSportSelection(sport)}
          >
            <Image
              source={sportImages[sport]}
              style={styles.sportImage}
            />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Next" onPress={handleNext} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    marginTop: 100,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sportContainer: {
    width: '30%',
    marginVertical: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
  },
  selectedSportContainer: {
    borderColor: 'green',
    borderWidth: 5,
  },
  sportImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});
