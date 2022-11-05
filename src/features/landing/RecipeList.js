import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Loader from 'components/Loader';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(5, 2, 10),
    minHeight: 600,
  },
  seeAll: {
    display: 'block',
    marginBottom: theme.spacing(2),
  },
  recipeCard: {
    maxWidth: 350,
    color: theme.palette.common.black,
    textDecoration: 'none',
    transition: 'all 100ms ease-in-out',
    '&:hover': {
      transform: 'scale(1.03)',
    },
  },
  img: {
    width: '100%',
    height: 400,
    objectFit: 'cover',
    display: 'block',
    marginBottom: theme.spacing(2),
  },
}));

const RecipeList = ({ recipes, loading }) => {
  const classes = useStyles();

  if (loading) {
    return (
      <Container className={classes.container} maxWidth="lg">
        <Loader />
      </Container>
    );
  }

  return (
    <Container className={classes.container} maxWidth="lg">
      <Typography
        className={classes.seeAll}
        align="right"
        component={Link}
        to="/recipes?page=1"
      >
        See all
      </Typography>

      <Grid container justifyContent="center" spacing={5}>
        {recipes.map(recipe => (
          <Grid
            key={recipe.id}
            className={classes.recipeCard}
            item
            xs="12"
            sm="6"
            md="3"
            component={Link}
            to={`/recipes/${recipe.id}`}
          >
            <img className={classes.img} src={recipe.image} alt={recipe.name} />
            <Typography variant="h5" component="h4" align="justify">
              {recipe.name}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RecipeList;
