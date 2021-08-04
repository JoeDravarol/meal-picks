import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import RecipeListPage from 'pages/RecipeListPage';
import RecipeDetailsPage from 'pages/RecipeDetailsPage';
import DashboardPage from 'pages/DashboardPage';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={RecipeListPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/recipes/:id" component={RecipeDetailsPage} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default Routes;
