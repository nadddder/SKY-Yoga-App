import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';

const poses = [
  require('../assets/Yoga Pose icons/pose1.png'),
  require('../assets/Yoga Pose icons/pose2.png'),
  require('../assets/Yoga Pose icons/pose3.png'),
  require('../assets/Yoga Pose icons/pose4.png'),
  require('../assets/Yoga Pose icons/pose5.png'),
  require('../assets/Yoga Pose icons/pose6.png'),
  require('../assets/Yoga Pose icons/pose7.png'),
  require('../assets/Yoga Pose icons/pose8.png'),
  require('../assets/Yoga Pose icons/pose9.png'),
  require('../assets/Yoga Pose icons/pose10.png'),
  require('../assets/Yoga Pose icons/pose11.png'),
  require('../assets/Yoga Pose icons/pose12.png'),
  require('../assets/Yoga Pose icons/pose13.png'),
  require('../assets/Yoga Pose icons/pose14.png'),
  require('../assets/Yoga Pose icons/pose15.png'),
];

export default function InitialComfortablePoses() {
  const { user, setUser } = useContext(UserContext);
  const [selectedPoses, setSelectedPoses] = useState(user.comfortablePoses || []);
  const navigation = useNavigation();

  const handlePosePress = (index) => {
    let updatedSelectedPoses;
    if (selectedPoses.includes(index)) {
      updatedSelectedPoses = selectedPoses.filter(i => i !== index);
    } else {
      updatedSelectedPoses = [...selectedPoses, index];
    }
    setSelectedPoses(updatedSelectedPoses);
    setUser(prevState => ({
      ...prevState,
      comfortablePoses: updatedSelectedPoses.map(i => `pose${i + 1}`),
    }));
  };

  const handleNext = () => {
    navigation.navigate('InitialGoalPoses');
  };

  const handlePrevious = () => {
    navigation.navigate('InitialInjuries');
  };

  return (
    <ImageBackground source={require('../assets/background.png')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.text}>Please select some of the poses you've nailed down before</Text>
          <View style={styles.grid}>
            {poses.map((pose, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handlePosePress(index)}
                style={[
                  styles.poseContainer,
                  selectedPoses.includes(index) && styles.selectedPose
                ]}
              >
                <Image source={pose} style={styles.poseImage} />
              </TouchableOpacity>
            ))}
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
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20, // Added margin to align with other pages
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  poseContainer: {
    width: '30%', // 30% to fit 3 items per row with spacing
    aspectRatio: 1,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 8,
  },
  selectedPose: {
    borderColor: 'blue',
    borderWidth: 4,
  },
  poseImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
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
