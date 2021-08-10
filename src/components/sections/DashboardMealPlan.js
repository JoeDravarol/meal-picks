import React, { useState } from 'react';
import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';

import { makeStyles } from '@material-ui/core';

import DashboardFavoriteRecipes from 'components/sections/DashboardFavoriteRecipes';
import DashboardMealsPlan from 'components/sections/DashboardMealsPlan';
import DashboardDates from 'components/sections/DashboardDates';
import GroceryList from 'components/GroceryList';

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

const DashboardMealPlan = () => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mealPlan, setMealPlan] = useState([]);

  const getSelectedMealPlan = () => {
    return mealPlan.find(plan => isSameDay(plan.date, selectedDate));
  };

  const addToMealPlan = recipe => {
    const existingMealPlan = mealPlan.find(plan =>
      isSameDay(plan.date, selectedDate)
    );

    if (existingMealPlan) {
      const updatedMealPlan = mealPlan.map(plan => {
        if (isSameDay(plan.date, selectedDate)) {
          return {
            date: existingMealPlan.date,
            meals: [...existingMealPlan.meals, recipe],
          };
        }
        return plan;
      });

      return setMealPlan(updatedMealPlan);
    }

    const newMealPlan = {
      date: selectedDate,
      meals: [recipe],
    };

    setMealPlan([...mealPlan, newMealPlan]);
  };

  const removeFromMealPlan = recipe => {
    const mealPlanToChange = mealPlan.find(plan =>
      isSameDay(plan.date, selectedDate)
    );
    const updatedMeals = mealPlanToChange.meals.filter(
      meal => meal.name !== recipe.name
    );
    const updatedMealPlan = mealPlan.map(plan =>
      plan.date !== mealPlanToChange.date
        ? plan
        : { date: mealPlanToChange.date, meals: updatedMeals }
    );

    setMealPlan(updatedMealPlan);
  };

  const getIngredients = () => {
    const selectedMealPlan = mealPlan.find(plan =>
      isSameDay(plan.date, selectedDate)
    );

    if (!selectedMealPlan) return [];

    const ingredients = selectedMealPlan.meals.reduce((ingredients, plan) => {
      return ingredients.concat(plan.ingredients);
    }, []);

    return ingredients;
  };

  return (
    <div className={classes.grid}>
      <DashboardDates
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <GroceryList ingredients={getIngredients()} />

      <DashboardFavoriteRecipes
        recipes={dummyFavorites}
        addToMealPlan={addToMealPlan}
      />

      <DashboardMealsPlan
        recipes={getSelectedMealPlan()?.meals || []}
        date={format(selectedDate, 'dd, LLLL yyy')}
        removeFromMealPlan={removeFromMealPlan}
      />
    </div>
  );
};

const dummyFavorites = [
  {
    name: 'Oven Risotto with Crispy Roasted Mushrooms',
    description:
      'Yes, you can make risotto without all the stirring—just pop it in the oven. And while that oven is on, use it to crisp up a bunch of mushrooms.',
    ingredients: [
      '1 lb. mixed wild, shiitake, and/or crimini mushrooms, broken into pieces or sliced 1/4" thick (about 4 cups)',
      '3 garlic cloves, peeled, thinly sliced',
      '6 thyme sprigs',
      '1/4 tsp. crushed red pepper flakes',
      '1/4 cup plus 2 Tbsp. extra-virgin olive oil, plus more for drizzling',
      '1 3/4 tsp. (or more) kosher salt, divided',
      '1 medium onion, finely chopped',
      '1 cup arborio rice',
      '1/2 tsp. freshly ground black pepper',
      '1/2 cup dry vermouth or white wine',
      '3 cups homemade chicken stock or low-sodium chicken broth, divided',
      '2 oz. finely grated Parmesan (about 1 cup)',
      '2 Tbsp. cold unsalted butter, cut into pieces',
      '1/2 tsp. finely grated lemon zest',
      '1/3 cup coarsely chopped parsley leaves',
      'Lemon wedges (for serving)',
    ],
    instructions: [
      'Place racks in bottom third and middle of oven; preheat to 350°F. Toss mushrooms, garlic, thyme, red pepper flakes, 1/4 cup oil, and 1/2 tsp. salt on a rimmed baking sheet. Roast on bottom rack, tossing halfway through, until deeply golden brown and crisped, 25–30 minutes.',
      'Meanwhile, heat 2 Tbsp. oil in a large ovenproof Dutch oven or heavy pot over medium-high. Add onion and cook, stirring often, until softened and slightly translucent, 3–5 minutes. Stir in rice; season with pepper and 1/2 tsp. salt. Cook, stirring occasionally, until some grains are translucent, about 2 minutes. Add vermouth, bring to a simmer, and cook, stirring occasionally, until pan is almost dry, about 2 minutes. Add 2 1/2 cups stock. Bring to a simmer, then cover and bake in oven until liquid is mostly absorbed but rice is still slightly firm in the center, 16–18 minutes.',
      'Return pot to stove and heat over medium. Add remaining 1/2 cup stock and cook, stirring constantly, until rice is tender but still has some bite and sauce is creamy, about 2 minutes. Remove from heat and stir in Parmesan, butter, and lemon zest; season to taste with salt, if needed. Add a little bit of warm water, if needed, until risotto is thick but still pourable.',
      'Transfer risotto to a platter. Top with crispy mushrooms and parsley. Drizzle with oil. Serve with lemon wedges alongside.',
    ],
    tags: [
      'Risotto',
      'Mushroom',
      'Garlic',
      'Thyme',
      'Onion',
      'Rice',
      'Vermouth',
      'Wine',
      'Stock',
      'Parmesan',
      'Butter',
      'Lemon',
      'Parsley',
      'Dinner',
      'Winter',
      'Wheat/Gluten-Free',
    ],
    time: {
      prep: '',
      cook: '',
      active: '30 minutes',
      inactive: '',
      ready: '',
      total: '50 minutes',
    },
    servings: '4 servings',
    image:
      'https://assets.epicurious.com/photos/5c191ba2b950cf635908c333/2:1/w_1260%2Ch_630/Oven-Risotto-with-Mushrooms-recipe-13122018.jpg',
    url: 'https://www.epicurious.com/recipes/food/views/oven-risotto-with-crispy-roasted-mushrooms',
    id: 31,
  },
  {
    name: 'Ros Omelette',
    description:
      "Make this Goan omelet, with its rich and comforting, fiery gravy, for breakfast, lunch, or dinner. It's the ideal dinner for one.",
    ingredients: [
      '1 tablespoon coconut oil',
      '1 small yellow onion, finely chopped',
      '1 medium tomato, coarsely chopped',
      '1 tablespoon store-bought ginger-garlic paste',
      '1 teaspoon ground turmeric',
      '½ teaspoon Kashmiri or other red chile powder',
      '1 tablespoon store-bought coconut paste',
      '1 teaspoon garam masala',
      'Kosher salt',
      '10 large eggs',
      '1 teaspoon Kashmiri or other red chile powder',
      'Kosher salt',
      '2 tablespoons vegetable oil or coconut oil',
      '1 medium yellow onion, finely chopped',
      '2 green chiles, finely chopped',
      'Lime wedges, for serving',
      'Finely chopped onion, for serving',
    ],
    instructions: [
      'In a medium sauté pan, heat the oil over medium-high heat until glistening, about 2 minutes. Add the onion and sauté until translucent, about 5 minutes. Add the tomato, ginger-garlic paste, turmeric, and chile powder and sauté, stirring occasionally, until the tomatoes begin to break apart, about 5 minutes longer. Stir in the coconut paste and garam masala and cook until everything is well incorporated and the smell of coconut perfumes the air, about 5 more minutes. Add a little water, if needed, to achieve a loose gravy texture. Season with salt and set aside.',
      'In a large bowl, whisk together the eggs and season with the chile powder and salt. In a sauté pan, heat the oil over medium-high heat and sauté the onion and chile peppers, stirring occasionally, until the onions are translucent, about 5 minutes. Reduce the heat to medium and pour the eggs into the pan. Rotate the pan in a circle as the omelet cooks to ensure even distribution of the eggs. Once the center of the omelet is just set, 4 to 6 minutes, flip the omelet onto itself to form a half-moon shape. Season with salt, transfer to a plate, and spoon the warm ros on top. Garnish with a lime wedge and raw onions.',
    ],
    tags: ['Omelet', 'Egg', 'Vegetarian', 'Breakfast', 'Dinner', 'Lunch'],
    time: {
      prep: '',
      cook: '',
      active: '',
      inactive: '',
      ready: '',
      total: '30 minutes',
    },
    servings: '4 servings',
    image:
      'https://assets.epicurious.com/photos/601db1396f4da5d34165cba8/2:1/w_1260%2Ch_630/Ros%20omlette_Page_1_Image_0001.jpg',
    url: 'https://www.epicurious.com/recipes/food/views/ros-omelette-chaat',
    id: 30,
  },
];

export default DashboardMealPlan;
