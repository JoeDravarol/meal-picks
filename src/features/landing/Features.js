import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

const useStyles = makeStyles(theme => ({
  paper: {
    background: theme.palette.secondary.main,
  },
  container: {
    padding: theme.spacing(5),
    textAlign: 'center',

    [theme.breakpoints.up('md')]: {
      height: 450,
    },
  },
  gridContainer: {
    height: '100%',
  },
  title: {
    marginBottom: theme.spacing(5),
    '&::after': {
      content: '""',
      position: 'absolute',
      display: 'block',
      height: 1,
      width: 80,
      marginTop: 5,
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'black',
    },
  },
  card: {
    minHeight: 200,
    display: 'grid',
    justifyItems: 'center',
    alignContent: 'center',
    gap: theme.spacing(2),
  },
  icon: {
    fontSize: '3rem',
  },
}));

const Features = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} color="primary">
      <Container className={classes.container} maxWidth="lg">
        <Grid
          className={classes.gridContainer}
          container
          alignContent="center"
          spacing={3}
        >
          <Grid item xs="12">
            <Typography className={classes.title} variant="h3" component="h2">
              How it works
            </Typography>
          </Grid>

          <Grid className={classes.card} item xs="12" sm="6" md="3">
            <CalendarTodayIcon className={classes.icon} />
            <Typography variant="h4" component="h3">
              Weekly Plan
            </Typography>
            <Typography variant="body1" component="span">
              Plan your meals for the next week and see how they change.
            </Typography>
          </Grid>

          <Grid className={classes.card} item xs="12" sm="6" md="3">
            <AssignmentOutlinedIcon className={classes.icon} />
            <Typography variant="h4" component="h3">
              Grocery List
            </Typography>
            <Typography variant="body1" component="span">
              See what items you will need to purchase for the next week.
            </Typography>
          </Grid>

          <Grid className={classes.card} item xs="12" sm="6" md="3">
            <FolderOutlinedIcon className={classes.icon} />
            <Typography variant="h4" component="h3">
              Recipes
            </Typography>
            <Typography variant="body1" component="span">
              Browse user submitted recipes or add and share your own.
            </Typography>
          </Grid>

          <Grid className={classes.card} item xs="12" sm="6" md="3">
            <BookmarkBorderIcon className={classes.icon} />
            <Typography variant="h4" component="h3">
              Favourites
            </Typography>
            <Typography variant="body1" component="span">
              Save your favourite recipes or plan to re-use again.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default Features;
