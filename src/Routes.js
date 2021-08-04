import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import RecipeListPage from 'pages/RecipeListPage';
import RecipeDetailsPage from 'pages/RecipeDetailsPage';
import DashboardPage from 'pages/DashboardPage';
import Layout from 'components/Layout';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Layout>
          <RecipeListPage />
        </Layout>
      </Route>

      <Route path="/recipes/:id">
        <Layout>
          <RecipeDetailsPage />
        </Layout>
      </Route>

      <Route path="/dashboard" component={DashboardPage} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default Routes;
