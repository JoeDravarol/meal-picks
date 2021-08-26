import mealPlanService from 'services/mealPlans';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_MEAL_PLANS':
      return action.payload;
    case 'NEW_MEAL_PLAN':
      return [...state, action.payload];
    case 'UPDATE_MEAL_PLAN':
      const { id, data } = action.payload;
      const updatedMealPlans = state.map(mealPlan =>
        mealPlan.id !== id ? mealPlan : data
      );
      return updatedMealPlans;
    case 'RESET_MEAL_PLANS':
      return [];
    default:
      return state;
  }
};

export const initializeMealPlans = () => {
  return async dispatch => {
    const mealPlans = await mealPlanService.getAll();

    console.log(mealPlans);
    dispatch({
      type: 'INIT_MEAL_PLANS',
      payload: mealPlans,
    });
  };
};

export const createMealPlan = mealPlan => {
  return async dispatch => {
    const returnedMealPlan = await mealPlanService.create(mealPlan);

    dispatch({
      type: 'NEW_MEAL_PLAN',
      payload: returnedMealPlan,
    });
  };
};

export const updateMealPlan = (id, mealPlan) => {
  return async dispatch => {
    const updatedMealPlan = await mealPlanService.update(id, mealPlan);

    console.log(updatedMealPlan);

    dispatch({
      type: 'UPDATE_MEAL_PLAN',
      payload: {
        id,
        data: updatedMealPlan,
      },
    });
  };
};

export const resetMealPlans = () => {
  return dispatch => {
    dispatch({ type: 'RESET_MEAL_PLANS' });
  };
};

export default reducer;
