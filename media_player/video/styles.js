import { StyleSheet, Dimensions } from 'react-native';

export const sharedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: Dimensions.get('window').height,
    height: Dimensions.get('window').width,
    transform: [{ rotate: '90deg' }],
  },
  optionText: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#76c7c0',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  optionButtonText: {
    color: 'white',
    fontSize: 18,
  },
  playPauseButton: {
    position: 'absolute',
    top: '45%',
    right: 20,
    zIndex: 1,
  },
  exitButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  speedButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  speedButtonText: {
    color: 'white',
    fontSize: 24,
  },
  speedOptions: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
    zIndex: 2,
  },
  speedOption: {
    padding: 10,
  },
  speedOptionText: {
    color: 'white',
    fontSize: 18,
  },
});
