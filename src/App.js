import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import MuiTheme from 'components/MuiTheme';
import Content from './Routes';
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
      <Content />
    </MuiTheme>
  );
};

export default App;
