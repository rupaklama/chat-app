import React, { Fragment } from 'react';
import { useParams } from 'react-router';
import { useRooms } from '../../context/rooms.context';
import { Loader } from 'rsuite';

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

  return (
    <Fragment>

      <div className="chat-top">
        <ChatTop />
      </div>

      <div className="chat-middle">
        <Messages />
      </div>

      <div className="chat-bottom">
        <ChatBottom />
      </div>

    </Fragment>
  );
};

export default Chat;
