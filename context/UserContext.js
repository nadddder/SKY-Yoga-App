import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    yogaExperience: '',
    primarySports: [],
    motivations: [],  // Ensure this is an array
    comfortablePoses: [], // Initialize with an empty array
    goalPoses: [], // Initialize with an empty array for goal poses
    poseHistory: {},  // New dictionary to store poses and their history
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
