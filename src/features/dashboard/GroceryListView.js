import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import isSameDay from 'date-fns/isSameDay';
import parseISO from 'date-fns/parseISO';

import { makeStyles } from '@material-ui/core';

import GroceryList from 'features/dashboard/GroceryList';
import WeekDates from 'features/dashboard/WeekDates';

import { initializeMealPlans } from 'reducers/mealPlanReducer';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridGap: theme.spacing(3),
  },
}));

const GroceryListView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const mealPlans = useSelector(state => state.mealPlans);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    dispatch(initializeMealPlans());
  }, [dispatch]);

  const getIngredients = () => {
    const selectedMealPlan = mealPlans.find(plan =>
      isSameDay(parseISO(plan.date), selectedDate)
    );

    if (!selectedMealPlan) return [];

    const ingredients = selectedMealPlan.recipes.reduce(
      (ingredients, recipe) => {
        return ingredients.concat(recipe.ingredients);
      },
      []
    );

    return ingredients;
  };

  return (
    <div className={classes.root}>
      <WeekDates
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <GroceryList ingredients={getIngredients()} />
    </div>
  );
};

export default GroceryListView;
