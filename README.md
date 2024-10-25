# SKY Yoga App

## Current State Summary of the App

The SKY Yoga App is designed to deliver personalized yoga experiences by combining user-specific data collection, AI-powered sequence generation, and cloud-based video streaming. Users provide key information about their yoga experience, goals, and physical condition to create dynamic, customized yoga routines. The app also incorporates interactive features and real-time feedback to enhance the overall experience.

## Goal of the App to Achieve MVP

The Minimum Viable Product (MVP) for the SKY Yoga App aims to deliver a comprehensive and personalized yoga experience by collecting user-specific data and generating customized yoga routines. The key objectives include:

1. **User Authentication and Data Security:** Implement secure user authentication with options for social media login (Google, Facebook, Apple, Strava). Ensure password recovery functionality is also available. Ensure compliance with global data protection regulations such as GDPR and CCPA through data encryption and secure storage.
2. **Data Collection:** Gather comprehensive user data through an intuitive and engaging initial questionnaire, yoga experience, motivations, and injuries. Continue collecting ongoing progress data to refine personalization over time.
3. **Personalized Yoga Sessions:** Use AI-driven algorithms to generate personalized yoga routines tailored to each user's profile, history, goals, and physical condition. The content should adapt dynamically as the user progresses.
4. **User Experience Enhancement:** Refine the user interface and overall experience based on user feedback, ensuring seamless navigation, clear visuals, and an engaging interaction design. Provide an intuitive view of user progress over time to keep users motivated and informed.
5. **Yoga Video Integration:** Integrate high-quality yoga video content, including tailored routines for specific needs (e.g., injury recovery, flexibility, strength building). Ensure content is easily accessible and relevant to user preferences.
6. **Scalability and Performance:** Ensure the app can handle a growing user base without compromising performance. Optimize the backend and frontend to deliver a smooth and responsive experience across all supported devices. Implement continuous testing (unit, integration, and user acceptance testing) to guarantee a smooth, high-quality experience.
7. **Payment Integration:** Implement a payment system that supports various options (e.g., subscriptions, one-time purchases). Ensure the payment process is secure, seamless, and integrated into the app's user flow.
8. **Testing and Optimization:** Conduct thorough testing, including unit, integration, and user acceptance testing, to ensure the app functions smoothly and meets user expectations. Continuously optimize the app based on testing results and user feedback.

## Project Overview

### Functionality

The app guides users through a series of onboarding pages where they can input information regarding their motivations, injuries, and yoga poses they are comfortable with and want to master. All of this information is stored in Firestore.

Returning user (or after onboarding) will be directed to main tabs where they can choose(from history or new) workout to see in media player, track progress, and access account details.

The app uses React Navigation to manage both stack and tab navigation. Development is done on Windows using Expo, targeting iOS and Android.

### Firebase Integration

Firebase is being used to manage authentication, cloud storage, run functions, and store user data. The following Firebase services are integrated into the app:

1. **Firebase Authentication**: Handles user authentication.
2. **Firebase Firestore**: Stores user profiles, preferences, and progress data.
3. **Firebase Storage**: Hosts and streams yoga videos.
4. **Firebase Functions**: Core algorithm that determines yoga sequences

### Directory Structure

Here is a detailed breakdown of the current directory structure of the SKY Yoga App:


```plaintext
SKYV0/
│
├── .expo/                             # Expo configuration files
│
├── assets/                            # Contains images and icons used in the app
│   ├── Images/                        # General images and icons for navigation
│   │   ├── account-icon.png
│   │   ├── practice-icon.png
│   │   ├── progress-icon.png
│   │   ├── trophy-icon.png
│   │   ├── muscle-usage-temp.jpg
│   │   ├── ... (other general images)
│   ├── Other Sports icon/             # Icons representing various sports
│   │   ├── Basketball.png
│   │   ├── Cycling.png
│   │   ├── Golf.png
│   │   ├── ... (other sport icons)
│   ├── Yoga Pose icons/               # Icons representing various yoga poses
│   │   ├── AdhoMukhaSvanasana.png
│   │   ├── Bakasana.png
│   │   ├── Natarajasana.png
│   │   ├── ... (other pose icons)
│   ├── adaptive-icon.png              # Adaptive icon for the app
│   ├── background.png                 # Background image used in the app
│   ├── videos/                        # Video files used in the app
│   │   ├── test1.mp4
│   │   ├── test2.mp4
│   ├── ... (other general images)
│
├── components/                        # Reusable components across the app
│   ├── CustomButton.js                # Custom button component for user interaction
│   ├── PoseScreenStyles.js            # Centralized style definitions for pose selection screens
│   ├── ProgressBar.js                 # Progress bar component (currently unused)
│
├── functions/                         # Firebase Cloud Functions folder
│   ├── main.py                        # Main Python file for Firebase Functions
│   ├── requirements.txt               # Python dependencies file for functions
│   ├── venv/                          # Python virtual environment 
│   │   └── (Virtual environment files)
│   ├── .gitignore                     # Git ignore file to exclude unnecessary files (e.g., venv, node_modules)
│   └── __pycache__/                   # Python cache files
│
├── dist/                              # Distribution files (build output)
│
├── media_player/                      # Media player components
│   ├── getMediaSources.js             # Function to fetch video and audio source
│   ├── styles.js                      # Styles specific to video components
│   ├── VideoControls.js               # Play/Pause, Exit, and Speed Control buttons
│   ├── VideoPlayer.js                 # Main video player component
│
├── navigation/                        # Navigation configuration
│   ├── AppNavigator.js                # Defines the stack navigation structure of the app
│   ├── MainTabNavigator.js            # Handles the main tab navigation for Practice, Progress, and Account
│   ├── ProgressTabNavigator.tsx       # Manages sub-tabs within the Progress tab (Muscle, Trophies, Calendar, Done Poses)
│
├── node_modules/                      # Node.js dependencies
│
├── screens/                           # All screen components (views) of the app
│   ├── AccountTab.tsx                 # Account management screen
│   ├── Calendar.tsx                   # Calendar sub-tab under Progress
│   ├── DonePoses.tsx                  # Done Poses sub-tab under Progress
│   ├── InitialComfortablePoses.tsx    # Screen for selecting comfortable yoga poses
│   ├── InitialGoalPoses.tsx           # Screen for selecting goal yoga poses
│   ├── InitialInjuries.tsx            # Screen for reporting any injuries
│   ├── InitialMotivation.tsx          # Screen for selecting yoga motivations
│   ├── InitialYogaExperience.tsx      # Screen for selecting yoga experience level
│   ├── LoginScreen.js                 # Login screen for user authentication
│   ├── Muscle.tsx                     # Muscle usage report screen
│   ├── PracticeTab.tsx                # Practice tab screen
│   ├── PrimarySport.tsx               # Screen for selecting primary sports
│   ├── ProgressTab.tsx                # Progress tab containing sub-tabs
│   ├── Trophies.tsx                   # Trophies sub-tab under Progress
│   ├── WaitPage.tsx                   # Wait screen displayed during processing
│
├── sequence_generation/               # Logic for generating yoga sequences
│   ├── generateSequence.js            # Logic to generate yoga sequences based on user data
│   ├── pickVideo.js                   # Function to select a random video
│
├── .gitignore                         # Git configuration to ignore unnecessary files
├── App.js                             # Entry point for the React Native application
├── app.json                           # Configuration file for the app
├── Assitant_rules.txt                 # Guidelines or rules for assistance
├── babel.config.js                    # Babel configuration file for JavaScript/TypeScript compilation
├── firebaseConfig.js                  # Firebase configuration file
├── firebaseSetup.js                   # Firebase setup and initialization file
├── package-lock.json                  # Lock file for dependencies (NPM)
├── package.json                       # NPM package configuration file
├── README.md                          # Project documentation (this file)
├── tsconfig.json                      # TypeScript configuration file
