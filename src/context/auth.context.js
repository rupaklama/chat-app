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
  // A Boolean value indicating whether the view is currently loading content
  // Set to true if the receiver is still loading content; otherwise, false
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // declaring variable for flexibility to use on/off on callback methods
    // to subscribe/unsubscribe from db - loading & cleaning up
    let userRef;

    // auth object in firebase.js
    // onAuthStateChanged allow us to access into signed in user object inside firebase
    const authUser = auth.onAuthStateChanged(signedInUser => {
      // console.log(signedInUser)
      if (signedInUser) {
        // getting user data from database to share User data with other components
        // whenever our data changes on this path inside database
        // userRef - on callback will be fired every time & receive a snap shot - info
        // on method is to access data - dataSnapShot
        userRef = database.ref(`/profiles/${signedInUser.uid}`);
        userRef.on('value', snap => {
          // Inside dataSnapShot, we have snap.val method to get data from database
          // inform of javaScript object
          const { name, createdAt } = snap.val();

          // passing above data from db below
          // our user state object will have all these data
          const data = {
            name,
            createdAt,
            uid: signedInUser.uid,
            email: signedInUser.email,
          };

          setUser(data);

          // after successful data loading
          setIsLoading(false);
        });
      } else {
        // this is when user is signed off

        // if user is not signed in, don't access database
        if (userRef) {
          userRef.off();
        }
        setUser(null);

        // no user, so it to false
        setIsLoading(false);
      }
    });

    // clean up is when component gets unmounted
    // when we don't need data anymore
    return () => {
      // unsubscribe user after authentication
      authUser();

      // unsubscribe from database
      if (userRef) {
        userRef.off();
      }
    };
  }, []);

  return ( // passing our global state objects
    <AuthContext.Provider value={ { user, isLoading } }>
      {children}
    </AuthContext.Provider>
  );
};

// To consume Context object, we need to use useContext hook
// we have to import AuthContext object on every files to consume it,
// it gets tedious doing so, creating custom wrapper hook to make it more accessible
export const useAuth = () => useContext(AuthContext);
// useAuth is a function that returns whatever useContext going to return - our global state object
// function returning function
