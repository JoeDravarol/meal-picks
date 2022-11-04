import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import NavBar from 'components/NavBar';

const useStyles = makeStyles(theme => ({
  '@global': {
    html: {
      scrollBehavior: 'smooth',
    },
  },
  toolbar: {
    minHeight: 32,
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <NavBar />
      <div className={classes.toolbar} />
      <main>{children}</main>
    </>
  );
};

export default Layout;
