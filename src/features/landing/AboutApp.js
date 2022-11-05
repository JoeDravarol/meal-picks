import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import DashboardPreview from 'assets/images/dashboard-preview.png';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),

    [theme.breakpoints.up('md')]: {
      paddingBottom: 0,
    },
  },
  textContainer: {
    [theme.breakpoints.up('sm')]: {
      display: 'grid',
      justifyContent: 'center',
      alignContent: 'center',
    },
  },
  title: {
    fontSize: '2rem',
    textTransform: 'capitalize',
    [theme.breakpoints.up('md')]: {
      fontSize: '2.5rem',
    },
  },
  paragraph: {
    maxWidth: 400,
    [theme.breakpoints.up('lg')]: {
      maxWidth: 480,
    },
  },
  img: {
    display: 'block',
    maxWidth: '100%',
    '@media screen and (min-width: 1350px)': {
      maxWidth: 650,
    },
  },
}));

const AboutApp = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper id="how-it-works">
      <Container className={classes.container} maxWidth="lg">
        <Grid container spacing={isSmall ? 2 : 5}>
          <Grid className={classes.textContainer} item xs="12" sm="6">
            <Typography
              className={classes.title}
              variant="h3"
              component="h2"
              gutterBottom
            >
              Your meal preparation. Organized.
            </Typography>
            <Typography className={classes.paragraph} variant="body1" paragraph>
              Meal Picks pull down all of your favourite recipes, and allows you
              to plan and organize them into a meal plan using simple & inuitive
              system.
            </Typography>
          </Grid>

          <Grid item xs="12" sm="6">
            <img
              className={classes.img}
              src={DashboardPreview}
              alt="Meal Picks dashboard"
            />
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default AboutApp;
