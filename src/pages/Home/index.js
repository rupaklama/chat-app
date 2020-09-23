import React from 'react';
import { Grid, Row, Col } from 'rsuite';
import Sidebar from '../../components/Sidebar';
import { RoomsProvider } from '../../context/rooms.context';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Chat from './Chat';
import { useMediaQuery } from '../../hooks/custom-hooks';

// Grid layout component implemented via CSS Flexbox, providing 24 grids/columns.
const Home = () => {

  // our custom media query hook for laptops/desktops, 992px and up
  const isDesktop = useMediaQuery('(min-width: 992px)');

  // using it to display sidebar on homepage 
  // if we are on homepage, useRouteMatch() object's prop - isExact returns true - url matches
  const match = useRouteMatch();
  // console.log(match)

  // will display sidebar if it's desktop or if it is exact path to home page - url matches
  // isExact is referring to home page, so when we are on home or index page
  // display sidebar
  const canRenderSideBar = isDesktop || match.isExact;

  return (
    
    // creating Nested Layout for Homepage
    <RoomsProvider>
      <Grid fluid className="h-100">
        <Row className="h-100">

        {/** Display sidebar if path is on homepage or 992px and up for laptops/desktops */}
          {canRenderSideBar && 
            <Col xs={24} md={8} className="h-100">
              <Sidebar />
            </Col>
          }

        <Switch>
              {/* Nested Route - "/chat/:chatId" for Nested layout on click- Chat */}
            <Route exact path="/chat/:chatId">
              <Col xs={24} md={16} className="h-100">
                <Chat />
              </Col>
            </Route>

            {/** this is default Nested layout when chatroom is not selected on desktop, fallback route */}
            <Route>
              {isDesktop && <Col xs={24} md={8} className="h-100">
                <h6 className="text-center mt-page">Please, select a chat...</h6>
              </Col>}
            </Route>
          </Switch>
        </Row>
      </Grid>
    </RoomsProvider>
  );
};

export default Home;
