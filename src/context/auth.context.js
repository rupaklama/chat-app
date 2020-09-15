import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, database } from '../api/firebase';

// Context Object is a js object which gets store in a component's memory
// Here, we will create our Context object to store User data & make
// it available to other files in order to consume it.
const AuthContext = createContext();

// It returns an object with 2 values: special components
// { Provider, Consumer }
// Provider component wraps around a tree of components that can have an access to the Context Object
// using Provider component of Context object to make a value available to all
// children and grandchildren by using value={} property
export const AuthProvider = ({ children }) => {
  // our state object
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // declaring variable for flexibility like on/off on callback
    let userRef;

    // auth object in firebase.js
    // onAuthStateChanged allow us to access into signed in users inside firebase
    const authUser = auth.onAuthStateChanged(signedInUser => {
      if (signedInUser) {
        // getting user data from database
        // whenever our data changes on this path inside database
        // on callback will be fired every time
        // on method is to access data - dataSnapShot
        userRef = database.ref(`/profiles/${signedInUser.uid}`);
        userRef.on('value', snap => {
          // Inside dataSnapShot, we have snap.val method to get data from database
          // inform of javaScript object
          const { name, createdAt } = snap.val();

          // passing above data from db below
          // user state will have all these data
          const data = {
            name,
            createdAt,
            uid: signedInUser.uid,
            email: signedInUser.email,
          };

          setUser(data);
          setIsLoading(false);
        });
      } else {
        // whenever we don't have any user data if user is not signed in,
        // don't access database
        if (userRef) {
          userRef.off();
        }
        setUser(null);
        setIsLoading(false);
      }
    });
    // clean up - when component gets unmount
    return () => {
      // unsubscribe user after auth
      authUser();

      // unsubscribe from db
      if (userRef) {
        userRef.off();
      }
    };
  }, []);

  return ( // passing object
    <AuthContext.Provider value={ { user, isLoading } }>
      {children}
    </AuthContext.Provider>
  );
};

// we have to import AuthContext on every files that want to use it,
// it gets tedious doing so, creating custom wrapper hook to make it more accessible
export const useAuth = () => useContext(AuthContext);
// useAuth is a function that returns whatever useContext going to return
// function returning function
