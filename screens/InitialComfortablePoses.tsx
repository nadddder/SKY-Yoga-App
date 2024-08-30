import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firestore, auth } from '../firebaseSetup';
import { getComfortablePoseCandidates } from '../context/getYogaPoseCandidates';
import poseimage from '../assets/poseImage';
import PoseScreenStyles from '../components/PoseScreenStyles';

export default function InitialComfortablePoses() {
  const [selectedPoses, setSelectedPoses] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState('intermediate1');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserExperience = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await firestore.collection('Users').doc(user.uid).get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            setExperienceLevel(userData.yogaExperience || 'intermediate1');
            setSelectedPoses(userData.comfortablePoses || []);
          } else {
            console.error('No user data found in Firestore');
          }
        } else {
          console.error('No authenticated user found');
        }
      } catch (error) {
        console.error('Error fetching user data from Firestore:', error.message);
      }
    };

    fetchUserExperience();
  }, []);

  const poses = getComfortablePoseCandidates(experienceLevel);

  const togglePoseSelection = (pose) => {
    const updatedSelection = selectedPoses.includes(pose)
      ? selectedPoses.filter(item => item !== pose)
      : [...selectedPoses, pose];

    setSelectedPoses(updatedSelection);
  };

  const handleNext = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await firestore.collection('Users').doc(user.uid).update({
          comfortablePoses: selectedPoses,
        });
        console.log('Comfortable poses updated in Firestore:', selectedPoses);
      } else {
        console.error('No authenticated user found');
      }
    } catch (error) {
      console.error('Error updating comfortable poses in Firestore:', error.message);
    }

    navigation.navigate('InitialGoalPoses');
  };

  const handlePrevious = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground 
      source={require('../assets/Images/background.png')} 
      style={PoseScreenStyles.container}
    >
      <Text style={PoseScreenStyles.question}>Which poses are you comfortable with?</Text>
      <View style={PoseScreenStyles.grid}>
        {poses.map((pose, index) => (
          <TouchableOpacity
            key={index}
            style={[
              PoseScreenStyles.poseContainer,
              selectedPoses.includes(pose) && PoseScreenStyles.selectedPoseContainer
            ]}
            onPress={() => togglePoseSelection(pose)}
          >
            <ImageBackground 
              source={poseimage[pose]} 
              style={PoseScreenStyles.poseimage}
              imageStyle={{resizeMode: 'cover'}}
            />
          </TouchableOpacity>
        ))}
      </View>
      <View style={PoseScreenStyles.buttonContainer}>
        <Button title="Previous" onPress={handlePrevious} />
        <Button title="Next" onPress={handleNext} />
      </View>
    </ImageBackground>
  );
}
