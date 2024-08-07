// screens/InitialMotivation.tsx
import React, { useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';

export default function InitialMotivation() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate('InitialInjuries');
  };

  const handlePrevious = () => {
    navigation.navigate('InitialYogaExperience');
  };

  const toggleOption = (option) => {
    setSelectedOptions((prevOptions) =>
      prevOptions.includes(option)
        ? prevOptions.filter((opt) => opt !== option)
        : [...prevOptions, option]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.text}>What is your yoga mission?</Text>
        <Text style={styles.subText}>(Select all that apply)</Text>
        {[
          'Get bendy\nFlexibility', 
          'Build muscle\nStrength', 
          'Find peace\nRelaxation', 
          'Wobble less\nBalance', 
          'Ease aches\nPain Relief', 
          'Trim down\nWeight Loss'
        ].map(option => (
          <CustomButton
            key={option}
            title={option}
            onPress={() => toggleOption(option)}
            selected={selectedOptions.includes(option)}
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
  subText: {
    color: 'black', // Ensure the text is visible
    marginBottom: 20,
    fontSize: 16, // Smaller font size for the description
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
