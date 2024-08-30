import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { auth, firestore } from '../firebaseSetup';

export default function AccountTab() {
  const [firebaseUserData, setFirebaseUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    const user = auth.currentUser;

    if (user?.uid) {
      setLoading(true);
      console.log('Fetching data for user UID:', user.uid); // Log UID
      try {
        const userDoc = await firestore.collection('Users').doc(user.uid).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          setFirebaseUserData(userData);
          console.log('Fetched user data from Firebase:', userData); // Log fetched data
        } else {
          console.log('No user data found in Firebase for UID:', user.uid); // Log no data found
          setFirebaseUserData(null);
        }
      } catch (error) {
        console.error('Error fetching user data from Firebase:', error); // Log error
      } finally {
        setLoading(false);
      }
    } else {
      console.log('No user or UID available'); // Log missing UID
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Firebase User Data:</Text>
      {loading ? (
        <Text>Loading Firebase user data...</Text>
      ) : firebaseUserData ? (
        <View>
          <Text>Email: {firebaseUserData.email || 'Not Defined'}</Text>
          <Text>Yoga Experience: {firebaseUserData.yogaExperience || 'Not Defined'}</Text>
          <Text>Comfortable Poses: {firebaseUserData.comfortablePoses?.join(', ') || 'Not Defined'}</Text>
          <Text>Goal Poses: {firebaseUserData.goalPoses?.join(', ') || 'Not Defined'}</Text>
          <Text>Motivations: {firebaseUserData.motivations?.join(', ') || 'Not Defined'}</Text>
        </View>
      ) : (
        <Text>No Firebase user data available</Text>
      )}

      <Button title="Reload Firebase Data" onPress={fetchUserData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
