import React from 'react';
import { Redirect, Route } from 'react-router-dom';
const PublicRoute = ({ children, ...routeProps }) => {
  const profile = false;

  // if we have a profile, redirect to home page,
  // this way if we are signed in, we are not able to see the SignIn page
  if (profile) {
    return <Redirect to="/" />;
  }

  return <Route {...routeProps}>{children}</Route>;
};

export default PublicRoute;