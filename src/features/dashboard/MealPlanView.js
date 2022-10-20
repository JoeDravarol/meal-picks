import React, { useEffect, useState } from 'react';
import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';
import parseISO from 'date-fns/parseISO';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core';

import FavoriteRecipes from 'features/dashboard/FavoriteRecipes';
import MealPlans from 'features/dashboard/MealPlans';
import WeekDates from 'features/dashboard/WeekDates';
import GroceryList from 'features/dashboard/GroceryList';
import {
  initializeMealPlans,
  createMealPlan,
  updateMealPlan,
} from 'reducers/mealPlanReducer';

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

const MealPlanView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const mealPlan = useSelector(state => state.mealPlans);
  const [existingMealPlan, setExistingMealPlan] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const favoriteRecipes = useSelector(state => state.favoriteRecipes);

  useEffect(() => {
    dispatch(initializeMealPlans());
  }, [dispatch]);

  useEffect(() => {
    setExistingMealPlan(
      mealPlan.find(plan => isSameDay(parseISO(plan.date), selectedDate))
    );
  }, [selectedDate, mealPlan]);

  const addToMealPlan = recipe => {
    // Create new meal plan
    if (!existingMealPlan) {
      const newMealPlan = {
        date: selectedDate,
        recipes: [recipe.id],
        recipeId: recipe.id,
      };

      dispatch(createMealPlan(newMealPlan)).catch(error =>
        console.error(error.response.data.error)
      );
      return;
    }

    // Prevent adding duplicate meal/recipe
    const mealPlanContainRecipe = existingMealPlan.recipes.find(
      r => r.id === recipe.id
    );

    if (mealPlanContainRecipe) return;

    // Update existing meal plan
    const recipesId = existingMealPlan.recipes.map(recipe => recipe.id);
    const newMealPlan = {
      ...existingMealPlan,
      recipes: [...recipesId, recipe.id],
    };

    dispatch(updateMealPlan(existingMealPlan.id, newMealPlan)).catch(error =>
      console.error(error.response.data.error)
    );
  };

  const removeFromMealPlan = async recipe => {
    const recipesId = existingMealPlan.recipes.map(recipe => recipe.id);

    const newRecipesId = recipesId.filter(id => id !== recipe.id);
    const newMealPlan = {
      ...existingMealPlan,
      recipes: newRecipesId,
    };

    dispatch(updateMealPlan(existingMealPlan.id, newMealPlan)).catch(error =>
      console.error(error.response.data.error)
    );
  };

  const getIngredients = () => {
    const selectedMealPlan = mealPlan.find(plan =>
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
    <div className={classes.grid}>
      <WeekDates
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <GroceryList ingredients={getIngredients()} />

      <FavoriteRecipes
        recipes={favoriteRecipes}
        addToMealPlan={addToMealPlan}
      />

      <MealPlans
        recipes={existingMealPlan?.recipes || []}
        date={format(selectedDate, 'dd, LLLL yyy')}
        removeFromMealPlan={removeFromMealPlan}
      />
    </div>
  );
};

export default MealPlanView;
