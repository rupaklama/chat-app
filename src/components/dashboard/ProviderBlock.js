// if user logins with google, logs out & logins with facebook,
// user ends up in same account in database
// User won't have two separate accounts

import React, { useState } from 'react';
import { auth } from '../../api/firebase';
import { Tag, Icon, Button, Alert } from 'rsuite';
import firebase from 'firebase/app';

const ProviderBlock = () => {
  // providerData doesn't work in real time meaning can't access db directly,
  // so it can be done by using react state
  const [isConnected, setIsConnected] = useState({
    // object to indicate whether we are connected to google or facebook
    // we will have object with two keys which is providerID key in providerData

    // We are going to check if we are connected & to verify if some of our array elements
    // has providerId of google.com or facebook.com
    // Some method determines whether the specified callback function returns true for any element of an array.
    'google.com': auth.currentUser.providerData.some(
      data => data.providerId === 'google.com'
    ),
    'facebook.com': auth.currentUser.providerData.some(
      data => data.providerId === 'facebook.com'
    ),

    // this way isConnected variable will indicate if we are connected to google or facebook
  });

  // instead of using context object with our custom hook - useAuth()
  // we can use auth object from firebase & access to current User object
  // In User object, we are interested in providerData,
  // which is array of sign in methods that we are using right now
  // console.log(auth.currentUser);

  // unlink to providers

  const updateIsConnected = (providerId, value) => {
    // p is previous state
    setIsConnected( p => {
      return {
        ...p,
        [providerId]: value,
      }
    })
  }

  const unlink = async (providerId) => {
    try {
      if(auth.currentUser.providerData.length === 1) {
        throw new Error(`You can not disconnect from ${providerId}`)
      }

      await auth.currentUser.unlink(providerId);

      //  when unlink set to false
      updateIsConnected(providerId, false);

      Alert.info(`Disconnected from ${providerId}`, 4000);

    } catch (error) {
      Alert.error(error.message, 4000)
    }
  }

  const unlinkFacebook = () => {
    unlink('facebook.com')
  }

  const unlinkGoogle = () => {
    unlink('google.com')
  }


  // link to providers
  const link = async (provider) => {
    try {
      await auth.currentUser.linkWithPopup(provider);
      Alert.info(`Linked to ${provider.providerId}`, 4000)

      updateIsConnected(provider.providerId, true);
    } catch (error) {
      Alert.error(error.message, 4000)
    }
  }

  const linkFacebook = () => {
    link(new firebase.auth.FacebookAuthProvider())
  }
  const linkGoogle = () => {
    link(new firebase.auth.GoogleAuthProvider())
  }

  return (
    <div>
      {
        /* If connected, we can access it's property since it's an object */
        isConnected['google.com'] && (
          <Tag closable color="green" onClose={unlinkGoogle}>
            <Icon icon="google" /> Connected
          </Tag>
        )
      }

      {isConnected['facebook.com'] && (
        <Tag closable color="blue" onClose={unlinkFacebook}>
          <Icon icon="facebook" /> Connected
        </Tag>
      )}

      {/* button to connect to providers */}
      <div className="mt-2">
        {!isConnected['google.com'] && (
          <Button block color="green" onClick={linkGoogle}>
            <Icon icon="google" /> Link to Google
          </Button>
        )}

        {!isConnected['facebook.com'] && (
          <Button block color="blue" onClick={linkFacebook}>
            <Icon icon="facebook" /> Link to Facebook
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProviderBlock;
