import React from 'react';
import { useRouteMatch, Route, Switch, Redirect } from 'react-router-dom';

import FastfoodIcon from '@material-ui/icons/Fastfood';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import DashboardAppDrawerBar from 'components/DashboardAppDrawerBar';

const dashboardRoutes = [
  {
    text: 'Meal plan',
    linkTo: '/meals',
    icon: <FastfoodIcon />,
  },
  {
    text: 'Favorite Recipes',
    linkTo: '/favorites',
    icon: <FavoriteBorderIcon />,
  },
];

const DashboardPage = () => {
  const { path } = useRouteMatch();

  return (
    <DashboardAppDrawerBar dashboardRoutes={dashboardRoutes}>
      <Switch>
        <Route path={`${path}/meals`}>Meal Plan</Route>
        <Route path={`${path}/favorites`}>My favorites</Route>
        <Redirect from="*" to={`${path}/meals`} />
      </Switch>
    </DashboardAppDrawerBar>
  );
};

export default DashboardPage;
