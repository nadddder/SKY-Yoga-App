import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Text, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, firestore } from '../firebaseSetup';  // Ensure you import your Firebase setup

const screenHeight = Dimensions.get('window').height;

export default function LoginScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLoginPress = () => {
    auth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        navigation.navigate('MainTabNavigator');
      })
      .catch(error => {
        console.error('Error logging in:', error.message);
        // Handle login error (e.g., show an alert)
      });
  };
  
  const handleSignUpPress = () => {
    auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
  
        // Optionally, you can update the user's profile with the name
        user.updateProfile({
          displayName: name
        }).then(() => {
          // Navigate to InitialYogaExperience with the updated user info
          navigation.navigate('InitialYogaExperience', { name: user.displayName, email: user.email });
        }).catch(error => {
          console.error('Error updating profile:', error.message);
          // Handle profile update error
        });
  
        // You can also add the user to Firestore or perform other actions here if needed
        firestore.collection('Users').doc(user.uid).set({
          email: user.email,
          name: user.displayName || name,
          yogaExperience: '',
          motivations: [],
          comfortablePoses: [],
          goalPoses: [],
          history: []
        });
  
      })
      .catch(error => {
        console.error('Error signing up:', error.message);
        // Handle sign-up error (e.g., show an alert)
      });
  };

  return (
    <ImageBackground source={require('../assets/Images/background.png')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.description}>
            Embark on a journey where yoga adapts to your unique goals and needs. Designed just for you—start today and enjoy a free month of personalized sessions. This is yoga, reimagined.
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
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="gray"
          />
          <Image source={require('../assets/Images/logo.png')} style={styles.logo} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSignUpPress}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
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
  button: {
    backgroundColor: '#76c7c0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
