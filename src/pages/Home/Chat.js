import React from 'react';
import { useParams } from 'react-router';
import { useRooms } from '../../context/rooms.context';
import { Loader } from 'rsuite';
import { CurrentRoomProvider } from '../../context/current-room.context';

import ChatTop from '../../components/chat-window/top';
import Messages from '../../components/chat-window/messages';
import ChatBottom from '../../components/chat-window/bottom';


const Chat = () => {

  const { chatId } = useParams();
  // console.log(params)

  // rooms context object with custom helper hook
  const rooms = useRooms();

  // incase of null, data do not exists
  if (!rooms) {
    return <Loader center vertical size="md" content="Loading" speed="slow" /> 
  }

  // to get current room from rooms array
  const currentRoom = rooms.find(room => room.id === chatId);
  
  // incase not the correct room
  if(!currentRoom) {
    return <h6 className="text-center mt-page">Chat not found...</h6>
  }

  // getting data from rooms context - useRooms()
  const {name, description} = currentRoom;

  // NOTE:
  // Inside this component, useRooms() context is being consumed, so
  // any update on that Context Object will cause re-render to this component
  // even though the update is not related to this component
  // Therefore, inside this component will provide new context - CurrentRoomProvider
  // with data we need using useContextSelector

  // passing above data to our object that will be pass to our context
  const currentRoomData = {
    name, description
  }

  return (
    // using useContextSelector with provider to pass above data to 
    // nested components below
    <CurrentRoomProvider data={currentRoomData}>

      <div className="chat-top">
        <ChatTop />
      </div>

      <div className="chat-middle">
        <Messages />
      </div>

      <div className="chat-bottom">
        <ChatBottom />
      </div>

    </CurrentRoomProvider>
  );
};

export default Chat;
