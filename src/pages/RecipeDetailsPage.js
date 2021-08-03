import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import recipeService from 'services/recipes';
import RecipeDetails from 'components/RecipeDetails';

const spinnerStyles = {
  display: 'grid',
  margin: '2rem auto',
};

const RecipeDetailsPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    recipeService.getById(id).then(response => {
      setRecipe(response.data);
    });
  }, [id]);

  if (!recipe) return <CircularProgress size={100} style={spinnerStyles} />;

  return <RecipeDetails data={recipe} />;
};

export default RecipeDetailsPage;
