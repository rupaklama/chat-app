import React, { Fragment, useCallback } from 'react';
import { Button, Icon, Drawer, Alert } from 'rsuite';
import { useModalState, useMediaQuery } from '../../hooks/custom-hooks';
import Dashboard from '.';
import { auth } from '../../api/firebase';

const DashboardToggle = () => {

  const { isOpen, close, open } = useModalState();
  
  // media break points
  // this hook returns a boolean to check whether true or false
  // using this hook, we can check if we are currently on device with 992 px
  const isMobile = useMediaQuery('max-width: 992px')

  const onSignOut = useCallback(
    () => {
      // to sign out user from firebase
      auth.signOut()

      Alert.info('Signed out, see you soon!', 4000)

      // close the drawer
      close();
    },[close]
  )

  return <Fragment>
    <Button block color="blue" onClick={open}>
      <Icon icon="dashboard" /> Dashboard
    </Button>

    {/* when we are on mobile devices, full prop enabled, 
        when we are on desktop devices, isMobile will be set to false &
        not going to have full prop
    */}
    <Drawer full={isMobile} show={isOpen} onHide={close} placement={"left"}>
      <Dashboard onSignOut={onSignOut} />
    </Drawer>
  </Fragment>
};

export default DashboardToggle;
