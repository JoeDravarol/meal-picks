import axios from 'axios';
import { concatBaseUrl } from 'utils/apiUrl';

const baseUrl = concatBaseUrl('/api/recipes');

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

export default {
  getPage,
  getById,
};
