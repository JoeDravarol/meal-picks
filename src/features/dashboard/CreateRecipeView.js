import React from 'react';
import { useHistory } from 'react-router-dom';

import recipeService from 'services/recipes';
import useMultiInputField from 'hooks/useMultiInputField';
import useImageFile from 'hooks/useImageFile';
import useField from 'hooks/useField';
import RecipeForm from 'features/recipe/RecipeForm';

const CreateRecipeView = () => {
  const history = useHistory();
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

  const onSubmit = async e => {
    e.preventDefault();

    const time = {
      prep: prepTime.value,
      active: activeTime.value,
      cook: cookTime.value,
      total: totalTime.value,
    };

    // Turn array & object to JSON so it can be read in backend
    const recipeInfo = {
      name: name.value,
      description: description.value,
      servings: servings.value,
      time: JSON.stringify(time),
      ingredients: JSON.stringify(ingredients.getValue()),
      instructions: JSON.stringify(instructions.getValue()),
      url: recipeLink.value,
    };

    try {
      // FormData set Boundry which enables frontend to send files to server
      const formData = new FormData();

      formData.append('file', image.file);

      for (let key in recipeInfo) {
        formData.append(key, recipeInfo[key]);
      }

      const createdRecipe = await recipeService.create(formData);
      // Redirect to recipe page
      history.push(`/recipes/${createdRecipe.id}`);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <RecipeForm
      formTitle="Create new recipe"
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
      onSubmit={onSubmit}
    />
  );
};

export default CreateRecipeView;
