import React, { useState, useEffect, useContext, createContext } from 'react';
import { useHistory } from 'react-router-dom';

import loginService from 'services/login';
import userService from 'services/users';
import tokenStorage from 'utils/tokenStorage';
import useLocalStorage from 'hooks/useLocalStorage';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useProvideAuth = () => {
  const history = useHistory();
  const [user, setUser] = useLocalStorage('user', null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Prevent unauthorized user from accessing /dashboard
    // 2. Set authorized user token
    handleUser(user);
  }, [user]);

  const handleUser = async user => {
    if (user) {
      setUser(user);
      setLoading(false);

      tokenStorage.setToken(user.token);

      return user;
    } else {
      setUser(null);
      setLoading(false);

      return false;
    }
  };

  const login = async (username, password) => {
    try {
      setLoading(true);

      const user = await loginService.login({
        username,
        password,
      });

      handleUser(user);
    } catch (exception) {
      console.error(exception.response.data.error);
    }
  };

  const signout = () => {
    handleUser(null);
  };

  const signup = async newUser => {
    try {
      setLoading(true);

      await userService.create({
        username: newUser.username,
        name: newUser.name,
        password: newUser.password,
        confirmPassword: newUser.confirmPassword,
      });

      history.replace('/login');
    } catch (exception) {
      console.error(exception.response.data.error);
    }
  };

  const isAuthenticated = () => {
    return !!user;
  };

  return {
    user,
    loading,
    login,
    signout,
    signup,
    isAuthenticated,
  };
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
