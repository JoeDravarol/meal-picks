import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import RecipeListPage from 'pages/RecipeListPage';
import RecipeDetailsPage from 'pages/RecipeDetailsPage';
import DashboardPage from 'pages/DashboardPage';
import Layout from 'components/Layout';
import AuthRoute from 'routes/AuthRoute';
import LoginPage from 'pages/LoginPage';

const AppRoutes = () => {
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

      <AuthRoute path="/dashboard" component={DashboardPage} />

      <Route path="/login">
        <Layout>
          <LoginPage />
        </Layout>
      </Route>

      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default AppRoutes;
