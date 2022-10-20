import React from 'react';

import FastfoodIcon from '@material-ui/icons/Fastfood';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import DashboardAppDrawerBar from 'features/dashboard/DashboardAppDrawerBar';
import DashboardRoutes from 'routes/DashboardRoutes';

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
  return (
    <DashboardAppDrawerBar dashboardRoutes={dashboardRoutes}>
      <DashboardRoutes />
    </DashboardAppDrawerBar>
  );
};

export default DashboardPage;
