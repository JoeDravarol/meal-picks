import axios from 'axios';

const baseUrl = '/api/recipes';
let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`;
};

const getConfig = () => {
  return {
    headers: { Authorization: token },
  };
};

const getPage = async page => {
  const response = await axios.get(baseUrl, {
    params: {
      page,
    },
  });

  return response.data;
};

const getById = async id => {
  const response = await axios.get(`${baseUrl}/${id}`);

  return response.data;
};

const addFavorite = async id => {
  const response = await axios.post(
    `${baseUrl}/${id}/favoriteRecipe`,
    {},
    getConfig()
  );

  return response.data;
};

const removeFavorite = async id => {
  const response = await axios.delete(
    `${baseUrl}/${id}/favoriteRecipe`,
    getConfig()
  );

  return response.data;
};
export default { getPage, getById, addFavorite, removeFavorite, setToken };
