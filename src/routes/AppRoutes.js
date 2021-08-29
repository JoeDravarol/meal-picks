import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import RecipeListPage from 'pages/RecipeListPage';
import RecipeDetailsPage from 'pages/RecipeDetailsPage';
import DashboardPage from 'pages/DashboardPage';
import LoginForm from 'components/LoginForm';
import Layout from 'components/Layout';
import AuthRoute from 'routes/AuthRoute';

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
          <LoginForm />
        </Layout>
      </Route>
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default AppRoutes;
