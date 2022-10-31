import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import FastfoodIcon from '@material-ui/icons/Fastfood';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import OutdoorGrillIcon from '@material-ui/icons/OutdoorGrill';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

import { initializeFavRecipes } from 'reducers/favoriteRecipeReducer';
import DashboardAppDrawerBar from 'features/dashboard/DashboardAppDrawerBar';
import DashboardRoutes from 'routes/DashboardRoutes';

const dashboardRoutes = [
  {
    text: `Home`,
    linkTo: '/home',
    icon: <OutdoorGrillIcon />,
  },
  {
    text: 'Meal plan',
    linkTo: '/meals',
    icon: <FastfoodIcon />,
  },
  {
    text: 'Shopping List',
    linkTo: '/shopping',
    icon: <ShoppingBasketIcon />,
  },
  {
    text: 'Favorite Recipes',
    linkTo: '/favorites',
    icon: <FavoriteBorderIcon />,
  },
  {
    text: 'Create Recipe',
    linkTo: '/create-recipe',
    icon: <NoteAddIcon />,
  },
];

const DashboardPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeFavRecipes());
  }, [dispatch]);

  return (
    <DashboardAppDrawerBar dashboardRoutes={dashboardRoutes}>
      <DashboardRoutes />
    </DashboardAppDrawerBar>
  );
};

export default DashboardPage;
