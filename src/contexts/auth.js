import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from 'services/firebase';

import userService from 'services/users';

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

  const handleUser = rawUser => {
    if (rawUser) {
      const user = formatUser(rawUser);

      // Create user in MongoDB
      userService.create(user);

      setLoading(false);
      setUser(user);

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

const formatUser = user => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
  };
};
