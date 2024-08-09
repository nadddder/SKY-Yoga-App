# SKY Yoga App

The SKY Yoga App is currently in the development phase. The primary goal of this application is to gather detailed user information through a series of questions and compile this information into a user profile. The app is designed to eventually generate personalized yoga routines based on this user profile, but as of now, it only focuses on collecting and storing user data.

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
│   ├── getYogaPoseCandidates.js        # Function that returns pose options based on yoga experience
│   ├── UserContext.js                  # Context for storing and managing user profile data
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
│   ├── LoginScreen.js                  # Login screen for user authentication
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
Screen Descriptions
LoginScreen.js

Functionality: Handles user authentication (login/signup).
Future Goals: Implement real user authentication with backend support.
PrimarySport.tsx

Functionality: Users select their primary sports from a predefined list of icons.
Context Storage: Selected sports are stored in the UserContext.
InitialYogaExperience.tsx

Functionality: Users select their level of yoga experience.
Context Storage: Yoga experience level is stored in the UserContext.
InitialMotivation.tsx

Functionality: Users select their motivations for practicing yoga.
Context Storage: Selected motivations are stored in the UserContext.
InitialInjuries.tsx

Functionality: Users report any injuries that might affect their yoga practice.
Context Storage: Reported injuries are stored in the UserContext.
InitialComfortablePoses.tsx

Functionality: Users select yoga poses they are comfortable with.
Context Storage: Selected comfortable poses are stored in the UserContext.
InitialGoalPoses.tsx

Functionality: Users select yoga poses they want to master.
Context Storage: Selected goal poses are stored in the UserContext.
UserSummary.js

Functionality: Displays a summary of all the user’s selected data.
Future Goals: Expand to provide more detailed insights and possibly suggestions based on the user's profile.
Context API Usage
UserContext.js: This is the central hub for storing user-related information throughout the app. It holds data such as the user's name, email, yoga experience, selected sports, motivations, injuries, comfortable poses, and goal poses.

getYogaPoseCandidates.js: This function dynamically generates a list of yoga poses based on the user's selected experience level.

Instructions for Future LLM Interactions
Section: Instructions for LLM Assistant
Rule 0: You are a software engineer assistant. We are making an app together, and your work is very important, so do your best in software development and assistance.

Rule 1: When you see these files for the first time, read through all of them one by one carefully, then say "Got it Nader, do you have more files to upload, or shall we code?" and nothing else. Repeat this step until I say, "Let's code" and stop uploading files. In this initial step, don't say more until I say, "Let's code" (or something similar).

Rule 2: Once I say "Let's code," give me your high-level understanding of the current state of the app and then list all the ideas you have to improve the app.

Rule 3: Any code that needs to be changed, you should give me the whole code replacement. Don’t tell me to do things on my own. (If the whole code is very long for a file, think about how to make it modularized).

Rule 4: If something needs to be checked, ask for it to be uploaded, don't tell me to go check.

Rule 5: All the code structure should be very modular; keep this in mind when we code together. It is very important.

Current State Summary
The SKY Yoga App currently serves as a structured questionnaire that collects various pieces of user data and stores them in a profile. This profile is displayed to the user in a summary format. The app is designed to eventually generate personalized yoga routines, but this functionality has not yet been implemented.

This README.md serves as a comprehensive guide to the app's current state and future plans. It also includes detailed instructions for any future LLM assistants that might help in developing the app further.