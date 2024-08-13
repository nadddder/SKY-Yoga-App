import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    yogaExperience: '',
    primarySports: [],
    motivations: [],  
    comfortablePoses: [], 
    goalPoses: [], 
    poseHistory: {},  
    trophiesEarned: ['trophy1', 'trophy2'],
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
