import React, { createContext, useState, useContext } from 'react';

const HeartContext = createContext();

export const HeartProvider = ({ children }) => {
  const [heartedUserIds, setHeartedUserIds] = useState([]);

  const toggleHeartedUser = (userId) => {
    setHeartedUserIds(prevHeartedUserIds => {
      const newHeartedUserIds = prevHeartedUserIds.includes(userId)
        ? prevHeartedUserIds.filter(id => id !== userId)
        : [...prevHeartedUserIds, userId];
      
      console.log('Updated Hearted User IDs:', newHeartedUserIds);
      return newHeartedUserIds;
    });
  };

  return (
    <HeartContext.Provider value={{ heartedUserIds, toggleHeartedUser }}>
      {children}
    </HeartContext.Provider>
  );
};

export const useHeart = () => useContext(HeartContext);
