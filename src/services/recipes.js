import axios from 'axios';
import { concatBaseUrl } from 'utils/apiUrl';

const BASE_URL = concatBaseUrl('/api/recipes');

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

export default {
  getPage,
  getById,
};
