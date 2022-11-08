import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
  },
  footer: {
    padding: theme.spacing(5, 2),
    marginTop: 'auto',
    background: theme.palette.primary.main,
    color: 'white',
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Typography variant="body1" align="center">
          {'Copyright © '}
          <Link color="inherit" component={RouterLink} to="/">
            Meal Picks
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
export const StickyFooterContainer = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};
