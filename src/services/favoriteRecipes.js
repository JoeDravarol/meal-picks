import axios from 'axios';
import tokenStorage from 'utils/tokenStorage';

const baseUrl = '/api/favoriteRecipes';

const getAllFavorite = async () => {
  const response = await axios.get(baseUrl, tokenStorage.getConfig());

  return response.data;
};

const addFavorite = async id => {
  const response = await axios.post(
    `${baseUrl}`,
    { recipeId: id },
    tokenStorage.getConfig()
  );

  return response.data;
};

const removeFavorite = async id => {
  const response = await axios.delete(
    `${baseUrl}/${id}`,
    tokenStorage.getConfig()
  );

  return response.data;
};

export default {
  getAllFavorite,
  addFavorite,
  removeFavorite,
};
