import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CustomButton({ title, onPress, selected }) {
  const [mainTitle, subTitle] = title.split('\n');
  return (
    <TouchableOpacity
      style={[styles.button, selected && styles.selectedButton]}
      onPress={onPress}
    >
      <Text style={styles.mainTitle}>{mainTitle}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'lightgreen',
    padding: 10,
    marginVertical: 5,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 2, // default border width
    borderColor: 'transparent', // default border color
  },
  selectedButton: {
    borderColor: 'darkgreen', // dark green border color when selected
    borderWidth: 4, // thicker border when selected
    backgroundColor: 'lightgreen', // maintain the same background color
  },
  mainTitle: {
    fontSize: 18,
    color: 'black',
  },
  subTitle: {
    fontSize: 12,
    color: 'black',
  },
});
