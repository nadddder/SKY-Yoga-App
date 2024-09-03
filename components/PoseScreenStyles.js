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
    marginTop: 40,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  poseContainer: {
    width: '30%',  // Width is kept the same for 3 columns
    marginVertical: 15,  // Increase the vertical margin to reduce the number of rows
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
