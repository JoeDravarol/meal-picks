import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import BannerLeft from 'assets/images/banner-left.png';
import BannerRight from 'assets/images/banner-right.png';

const useStyles = makeStyles(theme => ({
  paper: {
    [theme.breakpoints.up('sm')]: {
      backgroundImage: `url(${BannerRight})`,
      backgroundPosition: 'top -48px right -50px',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
    },
    [theme.breakpoints.up('md')]: {
      backgroundImage: `url(${BannerLeft}), url(${BannerRight})`,
      backgroundPosition: 'bottom left -5vw, center right -3vw',
    },
    [theme.breakpoints.up('lg')]: {
      backgroundPosition:
        'bottom left calc(20% - 10rem), center right calc(20% - 10rem)',
    },
    '@media screen and (min-width: 1920px)': {
      backgroundPosition:
        'bottom left calc(30% - 10rem), center right calc(30% - 10rem)',
    },
  },
  container: {
    height: 450,
    display: 'grid',
    alignContent: 'center',
    justifyContent: 'center',
    justifyItems: 'center',
    gap: theme.spacing(1),
  },
  blurb: {
    marginBottom: theme.spacing(2),
  },
  button: {
    maxWidth: 'fit-content',
    padding: theme.spacing(1, 3),
  },
}));

const GetStartedBanner = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Container className={classes.container} maxWidth="sm">
        <Typography variant="h3" component="h3" color="primary" align="center">
          Ready to get started?
        </Typography>
        <Typography
          className={classes.blurb}
          variant="h5"
          component="span"
          display="block"
          align="center"
        >
          Sign up now, 100% free for life. What have you got to lose?
        </Typography>
        <Button className={classes.button} variant="contained" color="primary">
          Sign up
        </Button>
      </Container>
    </Paper>
  );
};

export default GetStartedBanner;
