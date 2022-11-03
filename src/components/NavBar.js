import React from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import logoImg from 'assets/images/logo.png';

const useStyles = makeStyles(theme => ({
  logo: {
    color: 'inherit',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
  },
  logoImg: {
    marginRight: theme.spacing(1.5),
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  typography: {
    textDecoration: 'none',
    color: theme.palette.common.white,
  },
}));

const NavBar = () => {
  const classes = useStyles();

  return (
    <nav>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Link to="/recipes?page=1" className={classes.logo}>
            <img className={classes.logoImg} src={logoImg} alt="Logo" />
            <Typography variant="h5" component="h1">
              Meal Picks
            </Typography>
          </Link>

          <Button
            to="/dashboard"
            component={Link}
            color="inherit"
            size="large"
            variant="outlined"
          >
            Dashboard
          </Button>
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default NavBar;
