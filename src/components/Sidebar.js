import React, { useRef, useState, useEffect } from 'react';

import DashboardToggle from './dashboard/DashboardToggle'
import CreateRoomBtnModal from './CreateRoomBtnModal';
import { Divider } from 'rsuite';
import ChatRoomList from './rooms/ChatRoomList';
const Sidebar = () => {

  // to access dom element with useRef hook
  const topSidebarRef = useRef();

  const [height, setHeight] = useState(0);

  useEffect(() => {
    // element can be undefined or not exist sometimes 
    if(topSidebarRef.current) {
      // check to see if element is defined/exist
      // topSidebarRef.current is like accessing element with document.getElementbyId
      setHeight( topSidebarRef.current.scrollHeight)
    }
  }, [topSidebarRef]);

  return (
    <div className="h-100 pt-2">

      <div ref={topSidebarRef}>
        <DashboardToggle />
        <CreateRoomBtnModal />
        <Divider>Join conversation</Divider>
      </div>

      <ChatRoomList aboveElHeight={height} />
    </div>
  );
};

export default Sidebar;
