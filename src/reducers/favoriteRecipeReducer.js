import recipeService from 'services/recipes';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_FAV_RECIPES':
      return action.payload;
    default:
      return state;
  }
};

export const initializeFavRecipes = () => {
  return async dispatch => {
    const recipes = await recipeService.getAllFavorite();

    dispatch({
      type: 'INIT_FAV_RECIPES',
      payload: recipes,
    });
  };
};

export default reducer;
