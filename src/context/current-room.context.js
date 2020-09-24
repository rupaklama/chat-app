import React from 'react';
import { createContext, useContextSelector } from 'use-context-selector';

// Context Object
const CurrentRoomContext = createContext();

// provider component receives children &
// data that we want to pass to this provider
export const CurrentRoomProvider = ({ children, data }) => {
  return (
    <CurrentRoomContext.Provider value={data}>
      {children}
    </CurrentRoomContext.Provider>
  );
};

// To select data, use useContextSelector(context, v => v[1]);
// & provide context that we want to consume inside useContextSelector
// & callback func that will pick our value where
// arg V is our current state

// creating custom helper hook with arg - selector 
// selector is to get current state, particular object's key that we want
export const useCurrentRoom = (selector) => useContextSelector(CurrentRoomContext, selector);