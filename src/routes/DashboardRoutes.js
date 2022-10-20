import React from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';

import MealPlanView from 'features/dashboard/MealPlanView';
import FavoriteRecipeListView from 'features/dashboard/FavoriteRecipeListView';

const DashboardRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/meals`}>
        <MealPlanView />
      </Route>
      <Route path={`${path}/favorites`}>
        <FavoriteRecipeListView />
      </Route>
      <Redirect from="*" to={`${path}/meals`} />
    </Switch>
  );
};

export default DashboardRoutes;
