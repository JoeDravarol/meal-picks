import React, { useState, useEffect } from 'react';

import Hero from 'features/landing/Hero';
import AboutApp from 'features/landing/AboutApp';
import Features from 'features/landing/Features';
import RecipeList from 'features/landing/RecipeList';
import GetStartedBanner from 'features/landing/GetStartedBanner';
import recipeService from 'services/recipes';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReipes = async () => {
      const response = await recipeService.getPage(1);
      // Extract 8 of latest recipes
      setRecipes(response.results.slice(0, 8));
      setLoading(false);
    };

    fetchReipes();
  }, []);

  console.log(recipes);

  return (
    <>
      <Hero />
      <AboutApp />
      <Features />
      <RecipeList recipes={recipes} loading={loading} />
      <GetStartedBanner />
    </>
  );
};

export default HomePage;
