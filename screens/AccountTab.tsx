import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
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

  const renderHistoryItem = ({ item, index }) => {
    const generatedSequence = Array.isArray(item.generated_seq) ? item.generated_seq.join(', ') : 'None';
    const duration = item.practice_request?.durationInMinutes || 'N/A';
    const mood = item.practice_request?.selectedMood?.label || 'N/A';
    const props = Array.isArray(item.practice_request?.selectedPropLabels) 
      ? item.practice_request.selectedPropLabels.join(', ') 
      : 'None';
  
    return (
      <View style={styles.historyItem}>
        <Text style={styles.historyText}>Session {index + 1}</Text>
        <Text>Duration: {duration} minutes</Text>
        <Text>Mood: {mood}</Text>
        <Text>Props: {props}</Text>
        <Text>Generated Sequence: {generatedSequence}</Text>
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Firebase User Data:</Text>
      {loading ? (
        <Text>Loading Firebase user data...</Text>
      ) : firebaseUserData ? (
        <View style={styles.contentContainer}>
          <Text>Email: {firebaseUserData.email || 'Not Defined'}</Text>
          <Text>Yoga Experience: {firebaseUserData.yogaExperience || 'Not Defined'}</Text>
          <Text>Comfortable Poses: {firebaseUserData.comfortablePoses?.join(', ') || 'Not Defined'}</Text>
          <Text>Goal Poses: {firebaseUserData.goalPoses?.join(', ') || 'Not Defined'}</Text>
          <Text>Motivations: {firebaseUserData.motivations?.join(', ') || 'Not Defined'}</Text>
          <Text>History:</Text>
          {firebaseUserData.history && firebaseUserData.history.length > 0 ? (
            <FlatList
              data={firebaseUserData.history}
              renderItem={renderHistoryItem}
              keyExtractor={(item, index) => index.toString()}
              style={styles.flatList}
            />
          ) : (
            <Text>No history available</Text>
          )}
        </View>
      ) : (
        <Text>No Firebase user data available</Text>
      )}

      <View style={styles.buttonContainer}>
        <Button title="Reload Firebase Data" onPress={fetchUserData} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  historyItem: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  historyText: {
    fontWeight: 'bold',
  },
  flatList: {
    flexGrow: 0,
  },
  buttonContainer: {
    marginTop: 20,
    alignSelf: 'center',
  },
});
