import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import RecipeListPage from 'pages/RecipeListPage';
import RecipeDetailsPage from 'pages/RecipeDetailsPage';

const Routes = () => {
  return (
    <Switch>
      <Route path="/recipes/:id" component={RecipeDetailsPage} />
      <Route path="/" component={RecipeListPage} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default Routes;
