import axios from 'axios';
const baseUrl = '/recipes';

const getPage = async page => {
  return await axios.get(`${baseUrl}?_page=${page}`);
};

export default { getPage };
