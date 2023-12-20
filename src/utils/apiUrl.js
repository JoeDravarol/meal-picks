const BASE_URL = 'https://drab-tan-cow-wig.cyclic.app';
// const BASE_URL = 'http://localhost:3001';

export const concatBaseUrl = path => {
  if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
    return BASE_URL + path;
  }
  return path;
};
