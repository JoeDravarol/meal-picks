import axios from 'axios';
import { concatBaseUrl } from 'utils/apiUrl';

const BASE_URL = concatBaseUrl('/api/login');

const login = async credentials => {
  const response = await axios.post(BASE_URL, credentials);
  return response.data;
};

export default { login };
