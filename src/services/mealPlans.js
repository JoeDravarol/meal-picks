import axios from 'axios';
import tokenStorage from 'utils/tokenStorage';
import { concatBaseUrl } from 'utils/apiUrl';

const baseUrl = concatBaseUrl('/api/mealPlans');

const getAll = async () => {
  const response = await axios.get(baseUrl, tokenStorage.getConfig());

  return response.data;
};

const create = async newObject => {
  const response = await axios.post(
    baseUrl,
    newObject,
    tokenStorage.getConfig()
  );

  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(
    `${baseUrl}/${id}`,
    newObject,
    tokenStorage.getConfig()
  );

  return response.data;
};

export default {
  getAll,
  create,
  update,
};
