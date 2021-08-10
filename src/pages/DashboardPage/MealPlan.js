import React, { useState } from 'react';
import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';

import { makeStyles } from '@material-ui/core';

import FavoriteRecipes from 'pages/DashboardPage/FavoriteRecipes';
import MealPlans from 'pages/DashboardPage/MealPlans';
import Dates from 'pages/DashboardPage/Dates';
import GroceryList from 'components/GroceryList';

const useStyles = makeStyles(theme => ({
  grid: {
    display: 'grid',
    gridGap: theme.spacing(3),

    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: '1fr .7fr',
    },
  },
  dates: {
    display: 'flex',
    gridGap: theme.spacing(3),
    gridTemplateColumns: 'repeat(7, 1fr)',
  },
}));

const MealPlan = () => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mealPlan, setMealPlan] = useState([]);

  const getSelectedMealPlan = () => {
    return mealPlan.find(plan => isSameDay(plan.date, selectedDate));
  };

  const addToMealPlan = recipe => {
    const existingMealPlan = mealPlan.find(plan =>
      isSameDay(plan.date, selectedDate)
    );

    if (!existingMealPlan) {
      const newMealPlan = {
        date: selectedDate,
        meals: [recipe],
      };

      return setMealPlan([...mealPlan, newMealPlan]);
    }

    // Prevent adding duplicate meal/recipe
    const mealPlanContainRecipe = existingMealPlan.meals.find(
      meal => meal.name === recipe.name
    );

    if (mealPlanContainRecipe) return;

    const updatedMealPlan = mealPlan.map(plan => {
      if (isSameDay(plan.date, selectedDate)) {
        return {
          date: existingMealPlan.date,
          meals: [...existingMealPlan.meals, recipe],
        };
      }
      return plan;
    });

    return setMealPlan(updatedMealPlan);
  };

  const removeFromMealPlan = recipe => {
    const mealPlanToChange = mealPlan.find(plan =>
      isSameDay(plan.date, selectedDate)
    );
    const updatedMeals = mealPlanToChange.meals.filter(
      meal => meal.name !== recipe.name
    );
    const updatedMealPlan = mealPlan.map(plan =>
      plan.date !== mealPlanToChange.date
        ? plan
        : { date: mealPlanToChange.date, meals: updatedMeals }
    );

    setMealPlan(updatedMealPlan);
  };

  const getIngredients = () => {
    const selectedMealPlan = mealPlan.find(plan =>
      isSameDay(plan.date, selectedDate)
    );

    if (!selectedMealPlan) return [];

    const ingredients = selectedMealPlan.meals.reduce((ingredients, plan) => {
      return ingredients.concat(plan.ingredients);
    }, []);

    return ingredients;
  };

  return (
    <div className={classes.grid}>
      <Dates selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

      <GroceryList ingredients={getIngredients()} />

      <FavoriteRecipes recipes={[]} addToMealPlan={addToMealPlan} />

      <MealPlans
        recipes={getSelectedMealPlan()?.meals || []}
        date={format(selectedDate, 'dd, LLLL yyy')}
        removeFromMealPlan={removeFromMealPlan}
      />
    </div>
  );
};

export default MealPlan;
