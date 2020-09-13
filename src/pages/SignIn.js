import React from 'react';
import firebase from 'firebase/app';
import { Container, Grid, Row, Panel, Col, Button, Icon, Alert } from 'rsuite';
import { auth, database } from '../api/firebase';
const SignIn = () => {
  // need it import provider object from firebase library
  const signInWithProvider = async provider => {
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider);

      if (additionalUserInfo.isNewUser) {
        // if user is new, store it inside database
        // need to specify reference, a path to database
        // set method is to set json string which return promises
        await database.ref(`/profiles/${user.uid}`).set({
          name: user.displayName,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        });
      }

      Alert.success('Signed in!', 4000);
    } catch (error) {
      // message & duration
      Alert.error(error.message, 4000);
    }
  };

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
            on medium & above, we are going to put 12 */}
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h2>Welcome to Chat</h2>
                <p>Progressive Chat platform for everyone!</p>
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
