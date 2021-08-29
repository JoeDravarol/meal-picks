import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import MuiTheme from 'components/MuiTheme';
import AppRoutes from 'routes/AppRoutes';
import { useAuth } from 'contexts/auth';
import { initializeFavRecipes } from 'reducers/favoriteRecipeReducer';

const App = () => {
  const dispatch = useDispatch();
  const auth = useAuth();

  useEffect(() => {
    if (auth.isAuthenticated()) {
      dispatch(initializeFavRecipes());
    }
  }, [auth, dispatch]);

  return (
    <MuiTheme>
      <AppRoutes />
    </MuiTheme>
  );
};

export default App;
