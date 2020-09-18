import React from 'react';
import firebase from 'firebase/app';
import { Container, Grid, Row, Panel, Col, Button, Icon, Alert } from 'rsuite';
import { auth, database } from '../api/firebase';
const SignIn = () => {
  // need it import provider object from firebase/app library
  const signInWithProvider = async provider => {

    // using signInWithPopup method of auth object
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider);

      // creating user data to save in db
      if (additionalUserInfo.isNewUser) {
        // if user is new, store it inside database
        // .ref - need to specify reference, a path to database under which we will store data
        // set method is to set js objects to json string which return promises
        await database.ref(`/profiles/${user.uid}`).set({
          name: user.displayName,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        });
      }

      Alert.success('Signed in, welcome!', 4000);
    } catch (error) {
      // display message & duration
      Alert.error(error.message, 4000);
    }
  };

  // passing new provider object from firebase
  const onFacebookSignIn = () => {
    signInWithProvider(new firebase.auth.FacebookAuthProvider());
  };

  const onGoogleSignIn = () => {
    signInWithProvider(new firebase.auth.GoogleAuthProvider());
  };

  // Grid layout component implemented via CSS Flexbox, providing 24 grids/columns.
  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          {/* In very small devices, we will put 24 columns, 
            on medium & above, we are going to put 12. Using offset to center it perfectly. */}
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h2>Chat Share</h2>
                <p>Progressive Chat & Classified platform for everyone!</p>
              </div>

              <div className="mt-3">
                <Button block color="blue" onClick={onFacebookSignIn}>
                  <Icon icon="facebook" /> Login with Facebook
                </Button>

                <Button block color="green" onClick={onGoogleSignIn}>
                  <Icon icon="google" /> Login with Google
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

export default SignIn;
