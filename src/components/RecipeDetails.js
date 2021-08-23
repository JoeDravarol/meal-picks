import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Container from '@material-ui/core/Container';

import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import { addFavRecipe, removeFavRecipe } from 'reducers/favoriteRecipeReducer';

const useStyles = makeStyles(theme => ({
  recipeTitleSidebar: {
    borderColor: theme.palette.primary.main,
    minHeight: 220,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      minHeight: 200,
      maxWidth: 800,
      margin: '0 auto',
    },
  },
  recipeTitleSidebarContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      maxWidth: 700,
    },
  },
  recipeTitle: {
    fontSize: '1.5rem',
    textAlign: 'center',
    marginBottom: '1em',
    maxWidth: 400,
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.75rem',
    },
    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
      fontSize: '2rem',
    },
  },
  button: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  img: {
    display: 'block',
    width: 276,
    height: 169,
    objectFit: 'cover',
    marginTop: -45,
    marginBottom: theme.spacing(3),
    margin: '0 auto',
    [theme.breakpoints.up('md')]: {
      width: 620,
      height: 413,
      marginLeft: 0,
      marginRight: 0,
    },
  },
  recipeDetailsContainer: {
    maxWidth: 700,
  },
  dl: {
    gridTemplateColumns: 'auto 1fr',
    justifyItems: 'start',
  },
  dt: {
    display: 'inline',
    fontWeight: 700,
    fontSize: '1rem',
    fontFamily: theme.typography.fontFamilyHeader,
    textTransform: 'uppercase',
    '&::after': {
      content: '": "',
      whiteSpace: 'pre',
    },
  },
  dd: {
    display: 'inline',
    fontSize: '1rem',
    marginLeft: '.25rem',
  },
}));

const RecipeDetails = ({ data }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const favorited = useSelector(state =>
    state.favoriteRecipes.find(r => r.id === data.id)
  );
  const [isFavorite, setIsFavorite] = useState(!!favorited);

  // To avoid stale props
  useEffect(() => {
    setIsFavorite(!!favorited);
  }, [favorited]);

  const handleFavorite = async () => {
    try {
      dispatch(addFavRecipe(data.id));

      setIsFavorite(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleUnfavorite = async () => {
    try {
      dispatch(removeFavRecipe(data.id));

      setIsFavorite(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Box my={3}>
      <Box className={classes.recipeTitleSidebar} border={2} py={3} mx="auto">
        <Container className={classes.recipeTitleSidebarContainer}>
          <Typography
            className={classes.recipeTitle}
            variant="h3"
            component="h2"
          >
            {data.name}
          </Typography>
          <Button
            className={classes.button}
            variant="outlined"
            onClick={isFavorite ? handleUnfavorite : handleFavorite}
            startIcon={
              isFavorite ? <Favorite color="primary" /> : <FavoriteBorderIcon />
            }
          >
            Save Recipe
          </Button>
        </Container>
      </Box>

      <Container className={classes.recipeDetailsContainer}>
        <Box
        // width={625}
        >
          <img className={classes.img} src={data.image} alt={data.name} />
          <Divider />
        </Box>

        <Box
          border={1}
          borderColor="grey.400"
          mt={3}
          p={3}
          // width={625}
        >
          <dl className={classes.dl}>
            <dt className={classes.dt}>Yield</dt>
            <dd className={classes.dd}>{data.servings}</dd>
            <br />

            <dt className={classes.dt}>Prep Time</dt>
            <dd className={classes.dd}>{data.time.active}</dd>
            <br />

            <dt className={classes.dt}>Total Time</dt>
            <dd className={classes.dd}>{data.time.total}</dd>
          </dl>
          <Divider />

          <div>
            <Typography variant="h5" component="h3">
              Ingredients
            </Typography>
            <List styles={{ root: { listStyle: 'circle !important' } }}>
              {data.ingredients.map((ingredient, idx) => (
                <ListItem
                  key={ingredient}
                  divider={idx !== data.ingredients.length - 1}
                  disableGutters
                >
                  {ingredient}
                </ListItem>
              ))}
            </List>
          </div>
          <Divider />

          <div>
            <Typography variant="h5" component="h3">
              Preparation
            </Typography>
            <List component="ol">
              {data.instructions.map((instruction, idx) => (
                <ListItem
                  key={instruction}
                  divider={idx !== data.instructions.length - 1}
                  disableGutters
                >
                  {instruction}
                </ListItem>
              ))}
            </List>
          </div>
        </Box>
      </Container>
    </Box>
  );
};

export default RecipeDetails;
