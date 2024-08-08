import React, { useState, useContext } from 'react';
import { View, Button, StyleSheet, Text, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import { UserContext } from '../context/UserContext';

export default function InitialMotivation() {
  const { user, setUser } = useContext(UserContext);
  const [selectedOptions, setSelectedOptions] = useState(user.motivations || []);

  const navigation = useNavigation();

  const handleNext = () => {
    const subTexts = selectedOptions.map(option => option.split('\n')[1]);
    setUser(prevState => ({ ...prevState, motivations: subTexts }));
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
    <ImageBackground source={require('../assets/background.png')} style={styles.background}>
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
            'Trim down\nWeight Loss',
            'Undo Desk Damage\nPosture Correction'
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
    justifyContent: 'space-between',
    padding: 16,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    marginBottom: 10,
    fontSize: 24,
    textAlign: 'center',
  },
  subText: {
    color: 'black',
    marginBottom: 20,
    fontSize: 16,
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
