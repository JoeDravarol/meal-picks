import React from 'react';
import { useSelector } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import RecipeCard from 'features/recipe/RecipeCard';

const FavoriteRecipeListView = () => {
  const favoriteRecipes = useSelector(state => state.favoriteRecipes);

  return (
    <Grid container justifyContent="space-around" spacing={3}>
      {favoriteRecipes.map(recipe => (
        <Grid item key={recipe.id}>
          <RecipeCard {...recipe} isDashboard={true} />
        </Grid>
      ))}
    </Grid>
  );
};

export default FavoriteRecipeListView;
