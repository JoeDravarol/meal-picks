import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { useAuth } from 'contexts/AuthContext';
import recipeService from 'services/recipes';
import useMultiInputField from 'hooks/useMultiInputField';
import useImageFile from 'hooks/useImageFile';
import useField from 'hooks/useField';
import RecipeForm from 'features/recipe/RecipeForm';

const RecipeEditPage = () => {
  const history = useHistory();
  const { id } = useParams();
  const auth = useAuth();
  const [recipe, setRecipe] = useState();
  // Form Inputs
  const recipeLink = useField('Link to recipe', 'text', { autoFocus: true });
  const name = useField('Name', 'text', { required: true });
  const description = useField('Description', 'text', {
    required: true,
    multiline: true,
  });
  const prepTime = useField('Prep Time', 'text', { placeholder: '30 minutes' });
  const activeTime = useField('Active Time', 'text', {
    required: true,
    placeholder: '30 minutes',
  });
  const cookTime = useField('Cook Time', 'text', { placeholder: '1:30 hours' });
  const totalTime = useField('Total Time', 'text', {
    required: true,
    placeholder: '2 hours',
  });
  const servings = useField('Servings', 'number', { required: true });
  const ingredients = useMultiInputField();
  const instructions = useMultiInputField();
  const image = useImageFile();
  const isNotAuthorizedUser = auth.user?.username !== recipe?.user.username;

  useEffect(() => {
    if (auth.user) {
      recipeService.getById(id).then(recipe => {
        setRecipe(recipe);
      });
    }
  }, [id, auth]);

  // Initialize form fields with recipe data
  useEffect(() => {
    recipeLink.initValue(recipe?.url);
    name.initValue(recipe?.name);
    description.initValue(recipe?.description);
    prepTime.initValue(recipe?.time.prep);
    activeTime.initValue(recipe?.time.active);
    cookTime.initValue(recipe?.time.cook);
    totalTime.initValue(recipe?.time.total);
    servings.initValue(recipe?.servings);
    ingredients.initValue(recipe?.ingredients);
    instructions.initValue(recipe?.instructions);
    image.initValue(recipe?.image);
  }, [recipe]);

  // Prevent unauthorized user from accessing page
  if (!auth.user && isNotAuthorizedUser) {
    history.goBack();
    return null;
  }

  const onSubmit = async e => {
    e.preventDefault();

    const time = {
      prep: prepTime.value,
      active: activeTime.value,
      cook: cookTime.value,
      total: totalTime.value,
    };

    // Turn array & object to JSON so it can be read in backend
    const newRecipeInfo = {
      ...recipe,
      name: name.value,
      description: description.value,
      servings: servings.value,
      time: JSON.stringify(time),
      ingredients: JSON.stringify(ingredients.getValue()),
      instructions: JSON.stringify(instructions.getValue()),
      url: recipeLink.value,
    };

    try {
      const updatedRecipe = await recipeService.update(
        recipe.id,
        newRecipeInfo
      );
      // Redirect to recipe page
      history.push(`/recipes/${updatedRecipe.id}`);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <RecipeForm
      formTitle="Edit recipe"
      recipeLink={recipeLink}
      name={name}
      description={description}
      prepTime={prepTime}
      activeTime={activeTime}
      cookTime={cookTime}
      totalTime={totalTime}
      servings={servings}
      ingredients={ingredients}
      instructions={instructions}
      image={image}
      disbledImageButton
      onSubmit={onSubmit}
    />
  );
};

export default RecipeEditPage;
