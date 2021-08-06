import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import AddBoxIcon from '@material-ui/icons/AddBox';

import { truncateString } from 'utils/truncateString';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: 15,
    maxWidth: 1000,

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3),
      display: 'flex',
    },
  },
  media: {
    height: 150,
    margin: '0 auto',
    objectFit: 'cover',

    [theme.breakpoints.up('md')]: {
      width: 150,
      borderRadius: 15,
      margin: 0,
    },
  },
  content: {
    padding: theme.spacing(3),
    paddingTop: theme.spacing(2),

    [theme.breakpoints.up('md')]: {
      paddingTop: 0,
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
  },
  actions: {
    paddingTop: 0,

    [theme.breakpoints.up('md')]: {
      padding: 0,
      alignSelf: 'flex-end',
    },
  },
  iconButton: {
    fontSize: '3rem',
    color: theme.palette.primary.light,
    padding: 0,
    marginLeft: 'auto',
    borderRadius: 5,
  },
}));

const DashboardRecipeCard = ({ recipe, handleClick }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={recipe.image}
        title={recipe.name}
        component="img"
      />

      <CardContent className={classes.content}>
        <Typography variant="h5" component="h3" gutterBottom>
          {recipe.name}
        </Typography>
        <Box className={classes.descriptionContainer}>
          <Typography variant="body1" component="p">
            {truncateString(recipe.description, 135)}
          </Typography>
        </Box>
      </CardContent>

      <CardActions className={classes.actions}>
        <IconButton
          className={classes.iconButton}
          aria-label="add to meal plan"
          onClick={handleClick}
        >
          <AddBoxIcon fontSize="inherit" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default DashboardRecipeCard;
