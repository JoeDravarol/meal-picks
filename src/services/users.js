import axios from 'axios';
import { concatBaseUrl } from 'utils/apiUrl';
import tokenStorage from 'utils/tokenStorage';

const BASE_URL = concatBaseUrl('/api/users');

const me = async () => {
  const response = await axios.get(`${BASE_URL}/me`, tokenStorage.getConfig());

  return response.data;
};

const get = async uid => {
  const response = await axios.get(`${BASE_URL}/${uid}`);

  return response.data;
};

const create = async user => {
  const response = await axios.post(BASE_URL, user);

  return response.data;
};

export default { get, create, me };
