module.exports = {
  extends: 'react-app',
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'import/no-anonymous-default-export': [2, { allowObject: true }],
  },
};
