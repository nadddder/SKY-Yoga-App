import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Text, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const screenHeight = Dimensions.get('window').height;

export default function LoginScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate('InitialYogaExperience', { name, email });
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.description}>
          Tell us about you and what kind of Yoga you want to practice, and a professional instructor will record a session for you!
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="gray"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="gray"
        />
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Next" onPress={handleNext} />
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
    marginTop: screenHeight / 6, // Move content higher
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: 'black',
    width: '100%',
  },
  logo: {
    width: 200, // Adjust as needed
    height: 200, // Adjust as needed
    alignSelf: 'center',
    marginBottom: 20,
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
    paddingHorizontal: 16,
    color: 'black',
  },
  buttonContainer: {
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
});
