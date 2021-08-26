import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import favoriteRecipeReducer from 'reducers/favoriteRecipeReducer';
import mealPlanReducer from 'reducers/mealPlanReducer';

const reducer = combineReducers({
  favoriteRecipes: favoriteRecipeReducer,
  mealPlans: mealPlanReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
