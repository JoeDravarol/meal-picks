import React from 'react';

import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DashboardRecipeCard from 'features/dashboard/DashboardRecipeCard';

const useStyles = makeStyles(theme => ({
  heading: {
    marginBottom: theme.spacing(2),
    textTransform: 'capitalize',

    [theme.breakpoints.up('lg')]: {},
  },
}));

const FavoriteRecipes = ({ recipes, addToMealPlan }) => {
  const classes = useStyles();

  const emptyList = (
    <Grid item>
      <Typography>You have no favorite recipes...</Typography>
    </Grid>
  );

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

export default FavoriteRecipes;
