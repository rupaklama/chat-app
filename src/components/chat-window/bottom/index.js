import React, { useState, useCallback } from 'react';
import firebase from 'firebase/app';

import { InputGroup, Input, Icon } from 'rsuite';
import { useAuth } from '../../../context/auth.context';
import { useParams } from 'react-router';

// Keeping database structure as flat as possible meaning not creating nested objects in db
// De-normalizing data means that to copy and duplicate data, is to prevent multiple queries
// on our db when we need to display something
// Here, with chat message, we also want to display user profile like name, avatar etc
// So, when we display message if we don't duplicate data, we need to send second request to our db
// To prevent multiple requests, we will duplicate data - normal in no-sql database

// common func to assemble messages takes args
// returning global object
function assembleMessage(profile, chatId) {
  return {
    roomId: chatId,
    author: {
      name: profile.name,
      uid: profile.uid,
      createdAt: profile.createdAt,
      // if user don't have any avatar, we don't put inside this object
      ...(profile.avatar ? { avatar: profile.avatar} : {})
    },
    createdAt: firebase.database.ServerValue.TIMESTAMP,
  }
}
const Bottom = () => {

  const [input, setInput] = useState('');

  const { profile } = useAuth();
  const { chatId } = useParams();

  const onInputChange = useCallback((value) => {
    setInput(value);
  }, []);

  const onSendClick = () => {
    // check to see if input is not empty
    if(input.trim() === '') {
      return null;
    }

    // assemble messages
    const msgData = assembleMessage(profile, chatId);
    msgData.text = input;

    
  }

  return (
    <div>
      <InputGroup>
        <Input placeholder="Write a new message here..." value={input} onChange={onInputChange} />

        <InputGroup.Button color="blue" appearance="primary" onClick={onSendClick}>
          <Icon icon="send" />
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
};

export default Bottom;
