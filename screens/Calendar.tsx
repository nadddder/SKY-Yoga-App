import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function CalendarTab() {
  // Get today's date
  const today = new Date();
  const todayString = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD

  // Hardcoded practice date (two days ago)
  const practiceDate = new Date(today);
  practiceDate.setDate(today.getDate() - 2);
  const practiceDateString = practiceDate.toISOString().split('T')[0];

  // Marked dates for the calendar
  const markedDates = {
    [practiceDateString]: { selected: true, marked: true, selectedColor: 'green' },
  };

  return (
    <View style={styles.container}>
      <Calendar
        // Initially show the month that contains today
        current={todayString}
        // Set the last date of the calendar to today
        maxDate={todayString}
        // Highlight the practice date
        markedDates={markedDates}
        // Additional calendar settings
        theme={{
          todayTextColor: 'red',
          arrowColor: 'blue',
        }}
      />
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
});
