import React, { useState } from 'react';
import { View, Button, StyleSheet, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TOUCH_RADIUS = 20; // Radius within which a touch is considered close to an existing dot

export default function InitialInjuries() {
  const [touchPoints, setTouchPoints] = useState([]);
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate('InitialComfortablePoses');
  };

  const handlePrevious = () => {
    navigation.navigate('InitialMotivation');
  };

  const handleTouch = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    const touchIndex = touchPoints.findIndex(
      point => Math.hypot(point.x - locationX, point.y - locationY) < TOUCH_RADIUS
    );

    if (touchIndex !== -1) {
      // Remove the point if touched again
      setTouchPoints(touchPoints.filter((_, index) => index !== touchIndex));
    } else {
      // Add the new touch point
      setTouchPoints([...touchPoints, { x: locationX, y: locationY }]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.text}>Are there any areas we need to be gentle with?</Text>
        <Text style={styles.subText}>(Click on the areas)</Text>
        <TouchableOpacity onPress={handleTouch} style={styles.imageWrapper}>
          <Image source={require('../assets/human-muscle.png')} style={styles.image} />
          {touchPoints.map((point, index) => (
            <View
              key={index}
              style={[styles.touchPoint, { left: point.x - 10, top: point.y - 10 }]}
            />
          ))}
        </TouchableOpacity>
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
    alignItems: 'center',
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
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: Dimensions.get('window').width - 32,
    height: undefined,
    aspectRatio: 1,
  },
  touchPoint: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'red',
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
