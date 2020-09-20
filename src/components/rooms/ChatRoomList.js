import React from 'react';
import { Nav, Loader } from 'rsuite';
import RoomItem from './RoomItem';
import { useRooms } from '../../context/rooms.context';
import { Link, useLocation } from 'react-router-dom';

const ChatRoomList = ({ aboveElHeight }) => {
  // rooms context object
  const rooms = useRooms();

  // The useLocation hook returns the location object that represents the current URL. 
  // You can think about it like a useState that returns a new location whenever the URL changes.
  const location = useLocation();

  return (
    <Nav
      appearance="subtle"
      vertical
      reversed
      className="overflow-y-scroll custom-scroll"
      style={{
        // css calc func
        height: `calc(100% - ${aboveElHeight}px)`,
      }}
      activeKey={location.pathname}
    >
      {!rooms && (
        <Loader center vertical content="Loading" speed="slow" size="md" />
      )}

      {rooms &&
        rooms.length > 0 &&
        rooms.map(room => (
          <Nav.Item
            componentClass={Link}
            to={`/chat/${room.id}`}
            key={room.id}
            eventKey={`/chat/${room.id}`}
          >
            <RoomItem room={room} />
          </Nav.Item>
        ))}
    </Nav>
  );
};

export default ChatRoomList;
