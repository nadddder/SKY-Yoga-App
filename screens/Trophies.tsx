import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { firestore } from '../firebaseSetup';

const trophyCategories = [
  { title: 'Consistency Trophies', trophies: ['trophy1', 'trophy2', 'trophy3'] },
  { title: 'Progress Trophies', trophies: ['trophy4', 'trophy5', 'trophy6'] },
  { title: 'Community Engagement Trophies', trophies: ['trophy7', 'trophy8', 'trophy9'] }
];

export default function Trophies() {
  const [trophiesEarned, setTrophiesEarned] = useState([]);

  useEffect(() => {
    const fetchTrophies = async () => {
      try {
        const userDoc = await firestore.collection('Users').doc('user-id-here').get(); // Replace 'user-id-here' with the actual user ID
        if (userDoc.exists) {
          const userData = userDoc.data();
          setTrophiesEarned(userData.trophiesEarned || []);
        }
      } catch (error) {
        console.error('Error fetching trophies:', error);
      }
    };

    fetchTrophies();
  }, []);

  return (
    <View style={styles.container}>
      {trophyCategories.map((category, index) => (
        <View key={index} style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>{category.title}</Text>
          <View style={styles.trophyRow}>
            {category.trophies.map((trophy, i) => (
              <View key={i} style={styles.trophyContainer}>
                {trophiesEarned.includes(trophy) ? (
                  <Image
                    source={require('../assets/Trophies/chakras.jpg')}
                    style={styles.trophyImage}
                  />
                ) : (
                  <View style={styles.emptyTrophy} />
                )}
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 50,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  trophyRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  trophyContainer: {
    alignItems: 'center',
  },
  trophyImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  emptyTrophy: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#ccc',
  },
});
