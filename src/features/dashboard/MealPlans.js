import React from 'react';

import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import DashboardRecipeCard from 'features/dashboard/DashboardRecipeCard';

const useStyles = makeStyles(theme => ({
  header: {
    marginBottom: theme.spacing(3),
  },
  heading: {
    textTransform: 'capitalize',
  },
}));

const MealPlans = ({ recipes, date, removeFromMealPlan }) => {
  const classes = useStyles();

  const emptyState = (
    <Grid item xs={12}>
      <Typography variant="body1" component="p">
        Add some meals...
      </Typography>
    </Grid>
  );

  const recipeList = recipes.map(recipe => (
    <Grid item xs={12} key={recipe.id}>
      <DashboardRecipeCard
        recipe={recipe}
        miniVariant
        handleClick={() => removeFromMealPlan(recipe)}
      />
    </Grid>
  ));

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <Typography
          className={classes.heading}
          variant="h5"
          component="h3"
          gutterBottom
        >
          Make your day
        </Typography>
        <Typography variant="body1" component="span">
          {date}
        </Typography>
      </header>

      <Grid container spacing={3}>
        {recipes.length === 0 ? emptyState : recipeList}
      </Grid>
    </div>
  );
};

export default MealPlans;
