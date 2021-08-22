import axios from 'axios';

const baseUrl = '/api/users';

const get = async uid => {
  const response = await axios.get(`${baseUrl}/${uid}`);

  return response.data;
};

const create = async user => {
  const response = await axios.post(baseUrl, user);

  return response.data;
};

export default { get, create };
