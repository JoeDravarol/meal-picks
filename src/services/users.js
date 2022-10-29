import axios from 'axios';
import { concatBaseUrl } from 'utils/apiUrl';

const BASE_URL = concatBaseUrl('/api/users');

const get = async uid => {
  const response = await axios.get(`${BASE_URL}/${uid}`);

  return response.data;
};

const create = async user => {
  const response = await axios.post(BASE_URL, user);

  return response.data;
};

export default { get, create };
