import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { truncateString } from 'utils/truncateString';
import { removeFavRecipe } from 'reducers/favoriteRecipeReducer';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 450,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 0,
  },
  media: {
    height: 200,
    objectFit: 'cover',
    [theme.breakpoints.up('sm')]: {
      height: 400,
    },
  },
  content: {
    padding: theme.spacing(3),
    minHeight: 220, // Keep card height consistent
  },
  actions: {
    padding: theme.spacing(2.5),
    paddingTop: 0,
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: theme.palette.common.black,
    '&:hover': {
      backgroundColor: theme.palette.common.black,
    },
  },
}));

const RecipeCard = ({ id, name, description, image, isDashboard }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleUnfavorite = () => {
    dispatch(removeFavRecipe(id)).catch(error =>
      console.error(error.response.data.error)
    );
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={image}
        title={name}
        component="img"
      />

      <CardContent className={classes.content}>
        <Typography variant="h5" component="h3" gutterBottom>
          {name}
        </Typography>
        <Box className={classes.descriptionContainer}>
          <Typography variant="body1" component="p">
            {truncateString(description)}
          </Typography>
        </Box>
      </CardContent>

      <CardActions className={classes.actions}>
        <Button
          className={classes.button}
          size="large"
          color="primary"
          variant="contained"
          to={`/recipes/${id}`}
          component={Link}
        >
          Get Recipe
        </Button>

        {isDashboard && (
          <Button
            className={classes.button}
            size="large"
            color="primary"
            variant="contained"
            onClick={handleUnfavorite}
          >
            Unfavorite
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
