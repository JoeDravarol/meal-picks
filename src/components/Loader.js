import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const loaderStyles = {
  display: 'grid',
  margin: '2rem auto',
};

const Loader = () => {
  return <CircularProgress size={100} style={loaderStyles} />;
};

export default Loader;
