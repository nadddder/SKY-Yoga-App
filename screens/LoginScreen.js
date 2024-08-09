import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Text, Dimensions, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';

const screenHeight = Dimensions.get('window').height;

export default function LoginScreen() {
  const { setUser } = useContext(UserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleNext = () => {
    setUser({ name, email });
    navigation.navigate('PrimarySport');
  };

  return (
    <ImageBackground source={require('../assets/background.png')} style={styles.background}>
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
    marginTop: screenHeight / 6,
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
    width: 200,
    height: 200,
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
