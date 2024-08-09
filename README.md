# Current State Summary of the App
The SKY Yoga App is in the initial stages of development. The app currently serves as a structured questionnaire, collecting user data such as primary sports, yoga experience, motivations, injuries, and yoga pose preferences. This data is stored in the user's profile but is not yet used to generate personalized yoga routines. The app has implemented basic navigation between these screens, and the user's progress is tracked through the UserContext API.

# Goal of the App to Achieve MVP
The Minimum Viable Product (MVP) for the SKY Yoga App aims to deliver a comprehensive and personalized yoga experience by collecting user-specific data and generating customized yoga routines. The key objectives include:

1. User Authentication: Implement secure user authentication with options for social media login (Google, Facebook, Apple, Strava). Ensure password recovery functionality is also available.
2. Data Collection: Gather comprehensive user data through an intuitive and engaging initial questionnaire, including primary sports, yoga experience, motivations, and injuries. Continue collecting ongoing progress data to refine personalization over time.
3. Personalized Yoga Sessions: Use AI-driven algorithms to generate personalized yoga routines tailored to each user's profile, goals, and physical condition. The content should adapt dynamically as the user progresses.
4. User Experience Enhancement: Refine the user interface and overall experience based on user feedback, ensuring seamless navigation, clear visuals, and an engaging interaction design. Provide an intuitive view of user progress over time to keep users motivated and informed.
5. Yoga Video Integration: Integrate high-quality yoga video content, including tailored routines for specific needs (e.g., injury recovery, flexibility, strength building). Ensure content is easily accessible and relevant to user preferences.
6. Scalability and Performance: Ensure the app can handle a growing user base without compromising performance. Optimize the backend and frontend to deliver a smooth and responsive experience across all supported devices.
7. Payment Integration: Implement a payment system that supports various options (e.g., subscriptions, one-time purchases). Ensure the payment process is secure, seamless, and integrated into the app's user flow.
8. Testing and Optimization: Conduct thorough testing, including unit, integration, and user acceptance testing, to ensure the app functions smoothly and meets user expectations. Continuously optimize the app based on testing results and user feedback.

## Project Overview

### Current Functionality

The app guides users through a series of pages where they can input information regarding their primary sports, yoga experience, motivations, injuries, and yoga poses they are comfortable with and want to master. All of this information is stored in a user profile using the React Context API.

### Directory Structure

Here is a detailed breakdown of the current directory structure of the SKY Yoga App:

```plaintext
skyy0/
│
├── assets/                             # Contains images and icons used in the app
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
├── navigation/                         # Navigation configuration
│   ├── AppNavigator.js                 # Defines the stack navigation structure of the app
│
├── screens/                            # All screen components (views) of the app
│   ├── InitialComfortablePoses.tsx     # Screen for selecting comfortable yoga poses
│   ├── InitialGoalPoses.tsx            # Screen for selecting goal yoga poses
│   ├── InitialInjuries.tsx             # Screen for reporting any injuries
│   ├── InitialMotivation.tsx           # Screen for selecting yoga motivations
│   ├── InitialYogaExperience.tsx       # Screen for selecting yoga experience level
│   ├── LoginScreen.js                  # Login screen for user authentication. Future Goals: Implement real user authentication with backend support.
│   ├── PrimarySport.tsx                # Screen for selecting primary sports
│   ├── UserSummary.js                  # Summary screen displaying user profile data
│   ├── WorkoutSelection.tsx            # Placeholder for future workout selection screen
│
├── .gitignore                          # Git configuration to ignore unnecessary files
├── App.js                              # Entry point for the React Native application
├── app.json                            # Configuration file for the app
├── babel.config.js                     # Babel configuration file for JavaScript/TypeScript compilation
├── package.json                        # NPM package configuration file
├── README.md                           # Project documentation (this file)
├── tsconfig.json                       # TypeScript configuration file