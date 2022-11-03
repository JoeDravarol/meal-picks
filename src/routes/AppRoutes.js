import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import RecipeListPage from 'pages/RecipeListPage';
import RecipeDetailsPage from 'pages/RecipeDetailsPage';
import DashboardPage from 'pages/DashboardPage';
import Layout from 'components/Layout';
import AuthRoute from 'routes/AuthRoute';
import SignupForm from 'features/authentication/SignupForm';
import LoginForm from 'features/authentication/LoginForm';

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/recipes">
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

      <AuthRoute path="/login" isAuthFlag redirectTo="/dashboard">
        <Layout>
          <LoginForm />
        </Layout>
      </AuthRoute>

      <AuthRoute path="/signup" isAuthFlag redirectTo="/dashboard">
        <Layout>
          <SignupForm />
        </Layout>
      </AuthRoute>

      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default AppRoutes;
