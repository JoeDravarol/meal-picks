import React from 'react';

import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DashboardRecipeCard from 'components/DashboardRecipeCard';

const useStyles = makeStyles(theme => ({
  heading: {
    marginBottom: theme.spacing(2),
    textTransform: 'capitalize',

    [theme.breakpoints.up('lg')]: {},
  },
}));

const DashboardFavoriteRecipes = ({ recipes, addToMealPlan }) => {
  const classes = useStyles();

  const emptyList = <Typography>You have no favorite recipes...</Typography>;

  const recipesList = recipes.map(recipe => (
    <Grid item key={recipe.id}>
      <DashboardRecipeCard
        recipe={recipe}
        handleClick={() => addToMealPlan(recipe)}
      />
    </Grid>
  ));

  return (
    <div>
      <Typography className={classes.heading} variant="h5" component="h3">
        My favorite recipes
      </Typography>

      <Grid container spacing={3}>
        {recipes.length === 0 ? emptyList : recipesList}
      </Grid>
    </div>
  );
};

export default DashboardFavoriteRecipes;