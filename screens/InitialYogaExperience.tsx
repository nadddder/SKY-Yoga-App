import React, { useState, useContext } from 'react';
import { View, Button, StyleSheet, Text, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import { UserContext } from '../context/UserContext';
import ProgressBar from '../components/ProgressBar';
export default function InitialYogaExperience() {
  const { user, setUser } = useContext(UserContext);
  const [selectedOption, setSelectedOption] = useState(user.yogaExperience || '');

  const navigation = useNavigation();

  const handleNext = () => {
    const mainText = selectedOption.split('\n')[0].toLowerCase().replace(' ', ''); // convert to lowercase and remove spaces
    setUser(prevState => ({ ...prevState, yogaExperience: mainText }));
    navigation.navigate('InitialMotivation');
  };

  const handlePrevious = () => {
    navigation.navigate('PrimarySport');
  };

  return (
    <ImageBackground source={require('../assets/Images/background.png')} style={styles.background}>
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
