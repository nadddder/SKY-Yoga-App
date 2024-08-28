# SKY Yoga App

## Current State Summary of the App

The SKY Yoga App is in the early stages of development, focusing on collecting detailed user data through a structured questionnaire and showing a video sequence from the cloud. Questionnaire data is currently managed through the React Context API, allowing for dynamic and contextual storage within the app. 
The groundwork for personalization and further features is being laid, with future development aimed at integrating these data points into a more comprehensive and tailored user experience.

## Goal of the App to Achieve MVP

The Minimum Viable Product (MVP) for the SKY Yoga App aims to deliver a comprehensive and personalized yoga experience by collecting user-specific data and generating customized yoga routines. The key objectives include:

1. **User Authentication:** Implement secure user authentication with options for social media login (Google, Facebook, Apple, Strava). Ensure password recovery functionality is also available.
2. **Data Collection:** Gather comprehensive user data through an intuitive and engaging initial questionnaire, including primary sports, yoga experience, motivations, and injuries. Continue collecting ongoing progress data to refine personalization over time.
3. **Personalized Yoga Sessions:** Use AI-driven algorithms to generate personalized yoga routines tailored to each user's profile, goals, and physical condition. The content should adapt dynamically as the user progresses.
4. **User Experience Enhancement:** Refine the user interface and overall experience based on user feedback, ensuring seamless navigation, clear visuals, and an engaging interaction design. Provide an intuitive view of user progress over time to keep users motivated and informed.
5. **Yoga Video Integration:** Integrate high-quality yoga video content, including tailored routines for specific needs (e.g., injury recovery, flexibility, strength building). Ensure content is easily accessible and relevant to user preferences.
6. **Scalability and Performance:** Ensure the app can handle a growing user base without compromising performance. Optimize the backend and frontend to deliver a smooth and responsive experience across all supported devices.
7. **Payment Integration:** Implement a payment system that supports various options (e.g., subscriptions, one-time purchases). Ensure the payment process is secure, seamless, and integrated into the app's user flow.
8. **Testing and Optimization:** Conduct thorough testing, including unit, integration, and user acceptance testing, to ensure the app functions smoothly and meets user expectations. Continuously optimize the app based on testing results and user feedback.

## Project Overview

### Current Functionality

The app guides users through a series of pages where they can input information regarding their primary sports, yoga experience, motivations, injuries, and yoga poses they are comfortable with and want to master. All of this information is stored in a user profile using the React Context API.

The app uses React Navigation to manage both stack and tab navigation. Development is done on Windows using Expo, targeting iOS.

### Firebase Integration

Firebase is being used to manage cloud storage and user data. The following Firebase services are integrated into the app:

1. **Firebase Storage**: The app uses Firebase Storage to host and stream yoga videos. Videos are preloaded and buffered to ensure a smooth playback experience with minimal delays.
2. **Firebase Firestore (Planned)**: User profiles, preferences, and progress data will eventually be stored in Firebase Firestore, allowing for persistent data storage and retrieval across different devices.

### Directory Structure

Here is a detailed breakdown of the current directory structure of the SKY Yoga App:

```plaintext
skyy0/
│
├── assets/                             # Contains images and icons used in the app
│   ├── Images/                         # General images and icons for navigation
│   │   ├── account-icon.png
│   │   ├── practice-icon.png
│   │   ├── progress-icon.png
│   │   ├── trophy-icon.png
│   │   ├── muscle-usage-temp.jpg
│   │   ├── ... (other general images)
│   ├── Other Sports icon/              # Icons representing various sports
│   │   ├── Basketball.png
│   │   ├── Cycling.png
│   │   ├── Golf.png
│   │   ├── ... (other sport icons)
│   ├── Yoga Pose icons/                # Icons representing various yoga poses
│   │   ├── AdhoMukhaSvanasana.png
│   │   ├── Bakasana.png
│   │   ├── Natarajasana.png
│   │   ├── ... (other pose icons)
│   ├── adaptive-icon.png               # Adaptive icon for the app
│   ├── background.png                  # Background image used in the app
│   ├── videos/                         # Video files used in the app
│   │   ├── test1.mp4
│   │   ├── test2.mp4
│   ├── ... (other general images)
│
├── components/                         # Reusable components across the app
│   ├── CustomButton.js                 # Custom button component for user interaction
│   ├── PoseScreenStyles.js             # Centralized style definitions for pose selection screens
│   ├── ProgressBar.js                  # Progress bar component (currently unused)
│
├── context/                            # Context API for global state management
│   ├── getYogaPoseCandidates.js        # Function that dynamically generates a list of yoga poses based on the user's selected experience level. 
│   ├── UserContext.js                  # This is the central hub for storing user-related information throughout the app.
│
├── media_player/                       # Media player components
│   ├── video/                          # Video-related components and utilities
│   │   ├── VideoPlayer.js              # Main video player component
│   │   ├── VideoControls.js            # Play/Pause, Exit, and Speed Control buttons
│   │   ├── VideoOptions.js             # Option selection component for choosing the next video
│
├── sequence_generation/                # Logic for generating yoga sequences
│   ├── pickVideo.js                    # Function to select a random video
│
├── navigation/                         # Navigation configuration
│   ├── AppNavigator.js                 # Defines the stack navigation structure of the app
│   ├── MainTabNavigator.js             # Handles the main tab navigation for Practice, Progress, and Account
│   ├── ProgressTabNavigator.tsx        # Manages sub-tabs within the Progress tab (Muscle, Trophies, Calendar, Done Poses)
│
├── screens/                            # All screen components (views) of the app
│   ├── AccountTab.tsx                  # Account management screen
│   ├── Calendar.tsx                    # Calendar sub-tab under Progress
│   ├── DonePoses.tsx                   # Done Poses sub-tab under Progress
│   ├── Muscle.tsx                      # Muscle usage report screen
│   ├── PracticeTab.tsx                 # Practice tab screen
│   ├── ProgressTab.tsx                 # Progress tab containing sub-tabs
│   ├── Trophies.tsx                    # Trophies sub-tab under Progress
│   ├── InitialComfortablePoses.tsx     # Screen for selecting comfortable yoga poses
│   ├── InitialGoalPoses.tsx            # Screen for selecting goal yoga poses
│   ├── InitialInjuries.tsx             # Screen for reporting any injuries
│   ├── InitialMotivation.tsx           # Screen for selecting yoga motivations
│   ├── InitialYogaExperience.tsx       # Screen for selecting yoga experience level
│   ├── LoginScreen.js                  # Login screen for user authentication. Future Goals: Implement real user authentication with backend support.
│   ├── PrimarySport.tsx                # Screen for selecting primary sports
│   ├── WorkoutSelection.tsx            # Placeholder for future workout selection screen
│
├── .gitignore                          # Git configuration to ignore unnecessary files
├── App.js                              # Entry point for the React Native application
├── app.json                            # Configuration file for the app
├── babel.config.js                     # Babel configuration file for JavaScript/TypeScript compilation
├── package.json                        # NPM package configuration file
├── README.md                           # Project documentation (this file)
├── tsconfig.json                       # TypeScript configuration file
