// screens/InitialYogaExperience.tsx
import React, { useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';

export default function InitialYogaExperience() {
  const [selectedOption, setSelectedOption] = useState('');
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate('InitialMotivation');
  };

  const handlePrevious = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.text}>What's your experience with Yoga?</Text>
        {[
          'Beginner 1\nJust starting out', 
          'Beginner 2\nBeen to some classes', 
          'Intermediate 1\nGot the basics down', 
          'Intermediate 2\nI can handle almost every pose', 
          'Advanced\nGive me the hardest you got'
        ].map(option => (
          <CustomButton
            key={option}
            title={option}
            onPress={() => setSelectedOption(option)}
            selected={selectedOption === option}
          />
        ))}
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
  },
  text: {
    color: 'black', // Ensure the text is visible
    marginBottom: 10,
    fontSize: 24, // Increased font size for the question
    textAlign: 'center',
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
