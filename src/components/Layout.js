import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import NavBar from 'components/NavBar';
import Footer, { StickyFooterContainer } from 'components/Footer';

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
    <StickyFooterContainer>
      <NavBar />
      <div className={classes.toolbar} />
      <main>{children}</main>
      <Footer />
    </StickyFooterContainer>
  );
};

export default Layout;
