import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../context/auth.context';
import { Container, Loader } from 'rsuite';
const PublicRoute = ({ children, ...routeProps }) => {
  
  const { user, isLoading } = useAuth();

  // if data is loading & still don't have user
  if (isLoading && !user) {
    return <Container>
      <Loader center vertical size="md" content="Loading" speed="slow" />
    </Container>
  }

  // if we have a user & loading is false, redirect to home page,
  // this way if we are signed in, we are not able to see the SignIn page
  if (user && !isLoading) {
    return <Redirect to="/" />;
  }

  return <Route {...routeProps}>{children}</Route>;
};

export default PublicRoute;