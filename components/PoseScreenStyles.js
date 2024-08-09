import { StyleSheet } from 'react-native';

const PoseScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  question: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: 80,  // Adjust this as necessary
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  poseContainer: {
    width: '30%',  // Adjust the width for a 3x3 grid layout
    marginVertical: 10,
    borderWidth: 5,
    borderColor: 'transparent',
  },
  selectedPoseContainer: {
    borderColor: 'green',  // Highlight selected poses
  },
  poseimage: {
    width: 100,  // Ensure the container is square
    height: 100, // Ensure the container is square
    resizeMode: 'cover', // Ensure the image fills the square frame
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});

export default PoseScreenStyles;
