import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../context/auth.context';
import { Container, Loader } from 'rsuite';

// route that requires authentication to access
// Using spread routeProps to make default props of route - match, history & location
// available to your rendered Component
const PrivateRoute = ({ children, ...routeProps }) => {

  // state object
  const { user, isLoading } = useAuth();
  
  // if data is loading & still don't have user
  if (isLoading && !user) {
    return <Container>
      <Loader center vertical size="md" content="Loading" speed="slow" />
    </Container>
  }

  // if no user & isLoading is false 
  if (!user && !isLoading) {
    return <Redirect to="/signin" />;
  }

  return <Route {...routeProps}>{children}</Route>;
};

export default PrivateRoute;
