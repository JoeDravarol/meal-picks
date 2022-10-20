import axios from 'axios';
import { concatBaseUrl } from 'utils/apiUrl';
import tokenStorage from 'utils/tokenStorage';

const BASE_URL = concatBaseUrl('/api/recipes');
const BASE_URL_FAVORITE = concatBaseUrl('/api/favoriteRecipes');

const getPage = async page => {
  const response = await axios.get(BASE_URL, {
    params: {
      page,
    },
  });

  return response.data;
};

const getById = async id => {
  const response = await axios.get(`${BASE_URL}/${id}`);

  return response.data;
};

const getAllFavorite = async () => {
  const response = await axios.get(BASE_URL_FAVORITE, tokenStorage.getConfig());

  return response.data;
};

const addFavorite = async id => {
  const response = await axios.post(
    `${BASE_URL_FAVORITE}`,
    { recipeId: id },
    tokenStorage.getConfig()
  );

  return response.data;
};

const removeFavorite = async id => {
  const response = await axios.delete(
    `${BASE_URL_FAVORITE}/${id}`,
    tokenStorage.getConfig()
  );

  return response.data;
};

export default {
  getPage,
  getById,
  getAllFavorite,
  addFavorite,
  removeFavorite,
};
