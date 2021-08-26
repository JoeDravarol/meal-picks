import favoriteRecipeService from 'services/favoriteRecipes';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_FAV_RECIPES':
      return action.payload;
    case 'ADD_FAV_RECIPE':
      return [...state, action.payload];
    case 'REMOVE_FAV_RECIPE':
      const id = action.payload.id;
      return state.filter(recipe => recipe.id !== id);
    case 'RESET_FAV_RECIPES':
      return [];
    default:
      return state;
  }
};

export const initializeFavRecipes = () => {
  return async dispatch => {
    const recipes = await favoriteRecipeService.getAllFavorite();

    dispatch({
      type: 'INIT_FAV_RECIPES',
      payload: recipes,
    });
  };
};

export const addFavRecipe = id => {
  return async dispatch => {
    const recipe = await favoriteRecipeService.addFavorite(id);

    dispatch({
      type: 'ADD_FAV_RECIPE',
      payload: recipe,
    });
  };
};

export const removeFavRecipe = id => {
  return async dispatch => {
    await favoriteRecipeService.removeFavorite(id);

    dispatch({
      type: 'REMOVE_FAV_RECIPE',
      payload: { id },
    });
  };
};

export const resetFavRecipes = () => {
  return dispatch => {
    dispatch({
      type: 'RESET_FAV_RECIPES',
    });
  };
};

export default reducer;
