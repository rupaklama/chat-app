import React, { Fragment } from 'react';
import { Drawer, Button, Divider, Alert } from 'rsuite';
import { useAuth } from '../../context/auth.context';
import EditableInput from '../EditableInput';
import { database } from '../../api/firebase';

const Dashboard = ({ onSignOut }) => {

  const { user } = useAuth();

  // newData param gets arg value from dashboard component
  const onSave = async newData => {
    // need to specify reference, a path to database
    // set method is to set json string which return promises
    // child is reference to name: in db
    const userNicknameRef = database.ref(`/profiles/${user.uid}`).child('name')

    try {
      // set method is going to write/update database
      await userNicknameRef.set(newData)
      
      // after updating data, display message
      Alert.success('Nickname has been updated!', 4000)
    } catch (error) {
      Alert.error(error.message, 4000)
    }
  }

  return (
    <Fragment>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>

        <Drawer.Body>
          <h3>Hey, {user.name}!</h3>

          <Divider />

          <EditableInput
            name="nickname"
            initialValue={user.name}
            onSave={onSave}
            label={<h6 className="mb-2">Nickname</h6>} 
          />
        </Drawer.Body>

        <Drawer.Footer>
          <Button block color="red" onClick={onSignOut}>Sign out</Button>
        </Drawer.Footer>
  </Fragment>
  )
};

export default Dashboard;
