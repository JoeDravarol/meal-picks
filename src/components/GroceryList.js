import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';

import AssignmentIcon from '@material-ui/icons/Assignment';

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.secondary.dark,
  },
  header: {
    padding: theme.spacing(2),
    textTransform: 'uppercase',
  },
  headerIcon: {
    marginRight: theme.spacing(1),
  },
  list: {
    padding: 0,
    height: 400,
    maxHeight: 800,
    overflow: 'auto',
    // For Firefox
    scrollbarColor: `${theme.palette.common.white} ${theme.palette.secondary.dark}`,
    scrollbarWidth: 'auto',
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: theme.palette.secondary.dark,
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.common.white,
      borderRadius: 25,
    },
  },
  listIcon: {
    minWidth: 'auto',
  },
}));

const GroceryList = ({ ingredients }) => {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const emptyList = (
    <ListItem>
      <ListItemText primary="No grocery list ..." />
    </ListItem>
  );

  const shoppingList = ingredients.map(ingredient => {
    const labelId = `checkbox-list-label-${ingredient}`;

    return (
      <ListItem
        key={ingredient}
        button
        disableRipple
        onClick={handleToggle(ingredient)}
      >
        <ListItemIcon className={classes.listIcon}>
          <Checkbox
            color="primary"
            edge="start"
            checked={checked.indexOf(ingredient) !== -1}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={ingredient} />
      </ListItem>
    );
  });

  return (
    <Paper className={classes.paper}>
      <header className={classes.header}>
        <AssignmentIcon className={classes.headerIcon} />
        <Typography variant="h4" component="h3" display="inline">
          Grocery List
        </Typography>
      </header>

      <Divider />

      <List className={classes.list}>
        {ingredients.length === 0 ? emptyList : shoppingList}
      </List>
    </Paper>
  );
};

export default GroceryList;
