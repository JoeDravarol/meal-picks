import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import recipeService from 'services/recipes';
import RecipeDetails from 'components/RecipeDetails';
import Loader from 'components/Loader';

const RecipeDetailsPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    recipeService.getById(id).then(recipe => {
      setRecipe(recipe);
    });
  }, [id]);

  if (!recipe) return <Loader />;

  return <RecipeDetails data={recipe} />;
};

export default RecipeDetailsPage;
