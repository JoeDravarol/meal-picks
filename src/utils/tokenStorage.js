let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`;
};

const getConfig = () => {
  return {
    headers: { Authorization: token },
  };
};

export default {
  setToken,
  getConfig,
};
