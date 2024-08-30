import React, { useState } from 'react';
import { View, Button, StyleSheet, Text, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import { firestore, auth } from '../firebaseSetup';

export default function InitialYogaExperience() {
  const [selectedOption, setSelectedOption] = useState('');
  const navigation = useNavigation();

  const handleNext = async () => {
    const mainText = selectedOption.split('\n')[0].toLowerCase().replace(' ', ''); // convert to lowercase and remove spaces
    
    try {
      const user = auth.currentUser;
      if (user) {
        await firestore.collection('Users').doc(user.uid).update({
          yogaExperience: mainText,
        });
        console.log('Yoga experience updated in Firestore:', mainText);
      } else {
        console.error('No authenticated user found');
      }
    } catch (error) {
      console.error('Error updating yoga experience in Firestore:', error.message);
    }

    navigation.navigate('InitialMotivation');
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
    justifyContent: 'center', // Center the button
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 10,
  },
});
