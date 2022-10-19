import axios from 'axios';
import { concatBaseUrl } from 'utils/apiUrl';

const baseUrl = concatBaseUrl('/api/login');

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };
