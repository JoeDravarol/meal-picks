import React, { useEffect, useState } from 'react';
import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';
import parseISO from 'date-fns/parseISO';
import { useSelector, useDispatch } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import RecipeCard from 'features/recipe/RecipeCard';
import { initializeMealPlans } from 'reducers/mealPlanReducer';

const todayDate = format(new Date(), 'dd, LLLL yyy');

const MealPlanView = () => {
  const dispatch = useDispatch();
  const allMealPlans = useSelector(state => state.mealPlans);
  const [todayMealPlan, setTodayMealPlan] = useState([]);

  useEffect(() => {
    dispatch(initializeMealPlans());
  }, [dispatch]);

  useEffect(() => {
    const todaysMeal = allMealPlans.find(plan =>
      isSameDay(parseISO(plan.date), new Date())
    );

    setTodayMealPlan(todaysMeal?.recipes || []);
  }, [allMealPlans]);

  console.log(todayMealPlan);

  return (
    <div>
      <Box mb={3}>
        <Typography variant="h5" component="h3" gutterBottom>
          Today's meal
        </Typography>
        <Typography variant="body1" component="span">
          {todayDate}
        </Typography>
      </Box>

      {todayMealPlan.length ? (
        <Grid container spacing={3}>
          {todayMealPlan.map(recipe => (
            <Grid item key={recipe.id}>
              <RecipeCard {...recipe} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" component="span">
          You have no meal plans for today...
        </Typography>
      )}
    </div>
  );
};

export default MealPlanView;
