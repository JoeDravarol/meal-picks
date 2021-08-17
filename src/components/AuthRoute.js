import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from 'contexts/auth';

const AuthRoute = ({ component, children, ...rest }) => {
  const auth = useAuth();

  if (!auth.isAuthenticated()) {
    return <Redirect to="/login" />;
  }

  return (
    <Route {...rest} component={component}>
      {children}
    </Route>
  );
};

export default AuthRoute;
