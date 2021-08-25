import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from 'services/firebase';

import userService from 'services/users';
import tokenStorage from 'utils/tokenStorage';

const authContext = createContext();

export const useAuth = () => {
  return useContext(authContext);
};

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);

    return () => unsubscribe();
  }, []);

  const handleUser = async rawUser => {
    if (rawUser) {
      const { token, ...userWithoutToken } = await formatUser(rawUser);

      // For Authorization Purpose
      tokenStorage.setToken(token);

      // Create user in MongoDB
      userService.create(userWithoutToken);
      const mongoDBUser = await userService.get(userWithoutToken.uid);

      // SetLoading should always be the last operation
      // If not the auth route will render login form
      setUser(mongoDBUser);
      setLoading(false);

      return user;
    } else {
      setLoading(false);
      setUser(null);

      return false;
    }
  };

  const signInWithGithub = async () => {
    setLoading(true);

    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then(response => handleUser(response.user));
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(null));
  };

  const isAuthenticated = () => {
    return !!user;
  };

  return {
    user,
    loading,
    signInWithGithub,
    signout,
    isAuthenticated,
  };
};

const formatUser = async user => {
  const token = await user.getIdToken();

  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    token,
  };
};
