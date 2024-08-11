import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';
import { getGoalPoseCandidates } from '../context/getYogaPoseCandidates';
import poseimage from '../assets/poseImage';
import PoseScreenStyles from '../components/PoseScreenStyles';

export default function InitialGoalPoses() {
  const { user, setUser } = useContext(UserContext);
  const [selectedPoses, setSelectedPoses] = useState(user.goalPoses || []);

  // Default experience level if none is selected
  const experienceLevel = user.yogaExperience || 'intermediate1';

  const poses = getGoalPoseCandidates(experienceLevel);
  const navigation = useNavigation();

  useEffect(() => {
    if (!user.yogaExperience) {
      setUser(prevState => ({
        ...prevState,
        yogaExperience: 'intermediate1',
      }));
    }
  }, [user.yogaExperience]);

  const togglePoseSelection = (pose) => {
    const updatedSelection = selectedPoses.includes(pose)
      ? selectedPoses.filter(item => item !== pose)
      : [...selectedPoses, pose];

    setSelectedPoses(updatedSelection);

    // Update the user context with the selected poses
    setUser(prevState => ({
      ...prevState,
      goalPoses: updatedSelection
    }));
  };

  const handleNext = () => {
    navigation.navigate('WorkoutSelection'); // Navigate to the Goal Poses screen
  };

  const handlePrevious = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground 
      source={require('../assets/Images/background.png')} 
      style={PoseScreenStyles.container}
    >
      <Text style={PoseScreenStyles.question}>Which poses do you want to master?</Text>
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
              imageStyle={{resizeMode: 'cover'}} // Ensures the image fills the square container
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
