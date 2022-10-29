import React from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';

import MealPlanView from 'features/dashboard/MealPlanView';
import MealToCookView from 'features/dashboard/MealToCookView';
import FavoriteRecipeListView from 'features/dashboard/FavoriteRecipeListView';
import GroceryListView from 'features/dashboard/GroceryListView';
import CreateRecipeView from 'features/dashboard/CreateRecipeView';

const DashboardRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/home`}>
        <MealToCookView />
      </Route>
      <Route path={`${path}/meals`}>
        <MealPlanView />
      </Route>
      <Route path={`${path}/shopping`}>
        <GroceryListView />
      </Route>
      <Route path={`${path}/favorites`}>
        <FavoriteRecipeListView />
      </Route>
      <Route path={`${path}/create-recipe`}>
        <CreateRecipeView />
      </Route>
      <Redirect from="*" to={`${path}/home`} />
    </Switch>
  );
};

export default DashboardRoutes;
