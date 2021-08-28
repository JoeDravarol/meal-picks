const apiUrl = 'https://meal-picks.herokuapp.com';

export const concatBaseUrl = path => {
  if (process.env.NODE_ENV && process.NODE_ENV === 'production') {
    return apiUrl + path;
  }
  return path;
};
