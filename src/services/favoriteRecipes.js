import axios from 'axios';
import tokenStorage from 'utils/tokenStorage';
import { concatBaseUrl } from 'utils/apiUrl';

const BASE_URL = concatBaseUrl('/api/favoriteRecipes');

const getAllFavorite = async () => {
  const response = await axios.get(BASE_URL, tokenStorage.getConfig());

  return response.data;
};

const addFavorite = async id => {
  const response = await axios.post(
    `${BASE_URL}`,
    { recipeId: id },
    tokenStorage.getConfig()
  );

  return response.data;
};

const removeFavorite = async id => {
  const response = await axios.delete(
    `${BASE_URL}/${id}`,
    tokenStorage.getConfig()
  );

  return response.data;
};

export default {
  getAllFavorite,
  addFavorite,
  removeFavorite,
};
