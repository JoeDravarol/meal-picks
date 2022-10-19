import React from 'react';

import { Redirect } from 'react-router-dom';

import { useAuth } from 'contexts/AuthContext';
import LoginForm from 'components/LoginForm';

const LoginPage = () => {
  const auth = useAuth();

  if (auth.isAuthenticated()) {
    return <Redirect to="/dashboard" />;
  }

  return <LoginForm />;
};

export default LoginPage;
