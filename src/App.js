import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import MuiTheme from 'components/MuiTheme';
import AppRoutes from 'routes/AppRoutes';
import { useAuth } from 'contexts/AuthContext';
import { initializeFavRecipes } from 'reducers/favoriteRecipeReducer';
import tokenStorage from 'utils/tokenStorage';

const App = () => {
  const dispatch = useDispatch();
  const auth = useAuth();

  const hasAuthToken = tokenStorage.getConfig().headers.Authorization;

  useEffect(() => {
    if (auth.isAuthenticated() && hasAuthToken) {
      dispatch(initializeFavRecipes());
    }
  }, [auth, dispatch, hasAuthToken]);

  return (
    <MuiTheme>
      <AppRoutes />
    </MuiTheme>
  );
};

export default App;
