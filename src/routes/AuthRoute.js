import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from 'contexts/AuthContext';
import Loader from 'components/Loader';

const AuthRoute = ({
  component,
  children,
  isAuthFlag,
  redirectTo,
  ...rest
}) => {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  // Redirect to another page/route when authenticated
  // Example: prevent user from accessing login page when login
  if (isAuthFlag && auth.isAuthenticated()) {
    return <Redirect to={redirectTo} />;
  }

  if (!isAuthFlag && !auth.isAuthenticated()) {
    return <Redirect to="/login" />;
  }

  return (
    <Route {...rest} component={component}>
      {children}
    </Route>
  );
};

export default AuthRoute;
