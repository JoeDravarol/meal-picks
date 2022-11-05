import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2.5),
    paddingTop: 0,
    marginBottom: theme.spacing(5),

    '@media screen and (min-width: 750px)': {
      padding: theme.spacing(5),
      paddingTop: 0,
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(8),
      paddingTop: 0,
    },
    '@media screen and (min-width: 1240px)': {
      height: '100vh',
      maxHeight: 700,
    },
  },
  textContainer: {
    marginBottom: theme.spacing(3),
  },
  paragraph: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),

    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
    },
  },
  heroBackground: {
    objectFit: 'cover',
    objectPosition: 'center',
    width: '100%',
    height: '350px',

    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(3),
      height: '100%',
    },
  },
  button: {
    padding: theme.spacing(1),
  },
}));

const Hero = () => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.container}
      container
      component={Container}
      maxWidth="lg"
    >
      <Grid
        className={classes.textContainer}
        container
        alignContent="center"
        xs={12}
        sm={6}
      >
        <Typography variant="h2" component="h1" colorInherit>
          Online weekly meal planning made easy
        </Typography>
        <Typography
          className={classes.paragraph}
          variant="h5"
          component="p"
          colorInherit
        >
          <Typography variant="h5" component="span" color="primary">
            Meal Picks
          </Typography>{' '}
          is the best way to manage your weekly meal plans. Create, browse, and
          find a meal plan that fits your lifestyle!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Box}
          py={1.5}
          mr={2}
        >
          Sign up now
        </Button>
        <Button
          variant="outlined"
          component={Link}
          href="#how-it-works"
          color="common"
          underline="none"
        >
          Learn more
        </Button>
      </Grid>

      <Grid item xs={12} sm={6}>
        <img
          className={classes.heroBackground}
          src="https://images.unsplash.com/photo-1606858630066-b7dfd4857909?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="assorted salad plate"
        />
      </Grid>
    </Grid>
  );
};

export default Hero;
