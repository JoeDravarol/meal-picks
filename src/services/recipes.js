import axios from 'axios';
const baseUrl = '/recipes';

const getPage = async page => {
  return await axios.get(`${baseUrl}?_page=${page}`);
};

const getById = async id => {
  return await axios.get(`${baseUrl}/${id}`);
};

export default { getPage, getById };
