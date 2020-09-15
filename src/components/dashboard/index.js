import React, { Fragment } from 'react';
import { Drawer, Button } from 'rsuite';
import { useAuth } from '../../context/auth.context';

const Dashboard = ({ onSignOut }) => {

  const { user } = useAuth();

  return <Fragment>
    <Drawer.Header>
      <Drawer.Title>Dashboard</Drawer.Title>

      <Drawer.Body>
        <h3>Hey, {user.name}!</h3>
      </Drawer.Body>

      <Drawer.Footer>
        <Button block color="red" onClick={onSignOut}>Sign out</Button>
      </Drawer.Footer>

    </Drawer.Header>
  </Fragment>
};

export default Dashboard;
