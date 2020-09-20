import React, { createContext, useContext, useState, useEffect } from 'react';
import { database } from '../api/firebase';
import { transformToArrWithId } from '../misc/helpers';

// Context Object
const RoomsContext = createContext();

// provider component
export const RoomsProvider = ({ children }) => {
  // global state object
  const [chatData, setChatData] = useState(null);
 

  // we will get our data inside useEffect when component mounts
  useEffect(() => {
    const chatRooms = database.ref('rooms');
    // accessing data with realtime listener with .on method
    // Inside dataSnapShot, we have snap.val method to get data from database
    // inform of javaScript object
    chatRooms.on('value', (snap) => {
      // passing database object into helper func to convert to an array
      const data = transformToArrWithId(snap.val())
      // result will be set to array object
      setChatData(data);
    })

    // clean up
    return () => {
      // .off to disconnect all realtime listeners
      chatRooms.off()
    }

  }, []);

  return (
    <RoomsContext.Provider value={chatData}>
      { children }
    </RoomsContext.Provider>
  )
}

// to avoid calling useContext with RoomsContext on every time 
export const useRooms = () => useContext(RoomsContext);
