import React from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import './styles/main.scss';

import { Switch } from 'react-router-dom';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import SignIn from './pages/SignIn';
import { AuthProvider } from './context/auth.context';

// creating custom route components like Route
function App() {
  return (
    <div>
      <AuthProvider>
        <Switch>
          <PublicRoute path="/signin">
            <SignIn />
          </PublicRoute>
          <PrivateRoute path="/">
            <Home />
          </PrivateRoute>
        </Switch>
      </AuthProvider>
    </div>
  );
}

export default App;
