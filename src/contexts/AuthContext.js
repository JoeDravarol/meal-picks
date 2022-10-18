import React, { useState, useEffect, useContext, createContext } from 'react';

import loginService from 'services/login';
import tokenStorage from 'utils/tokenStorage';
import useLocalStorage from 'hooks/useLocalStorage';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useProvideAuth = () => {
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

  const isAuthenticated = () => {
    return !!user;
  };

  return {
    user,
    loading,
    login,
    signout,
    isAuthenticated,
  };
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
