import axios from 'axios';
import tokenStorage from 'utils/tokenStorage';
import { concatBaseUrl } from 'utils/apiUrl';

const BASE_URL = concatBaseUrl('/api/mealPlans');

const getAll = async () => {
  const response = await axios.get(BASE_URL, tokenStorage.getConfig());

  return response.data;
};

const create = async newObject => {
  const response = await axios.post(
    BASE_URL,
    newObject,
    tokenStorage.getConfig()
  );

  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(
    `${BASE_URL}/${id}`,
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
