const axios = require('axios');
const recipeScraper = require('recipe-scraper');

const baseUrl = 'http://localhost:3001/recipes';
// Recipes Urls from https://www.epicurious.com/
const recipesUrl = [];

recipesUrl.map(async url => {
  try {
    const recipe = await recipeScraper(url);

    await axios.post(baseUrl, {
      ...recipe,
      url,
    });
  } catch (error) {
    console.log(error.message);
  }
});
