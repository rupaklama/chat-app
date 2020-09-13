import React from 'react';
import { Redirect, Route } from 'react-router-dom';

// route that requires authentication to access
// Using spread routeProps to make default props of route - match, history & location
// available to your rendered Component
const PrivateRoute = ({ children, ...routeProps }) => {
  const profile = false;

  if (!profile) {
    return <Redirect to="/signin" />;
  }

  return <Route {...routeProps}>{children}</Route>;
};

export default PrivateRoute;
