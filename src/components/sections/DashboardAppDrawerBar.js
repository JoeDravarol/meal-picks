import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import logoImg from 'images/logo.png';
import { useAuth } from 'contexts/auth';
import { resetMealPlans } from 'reducers/mealPlanReducer';
import { resetFavRecipes } from 'reducers/favoriteRecipeReducer';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    textTransform: 'capitalize',
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerListItem: {
    paddingLeft: theme.spacing(4),
  },
  drawerListIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(1.5),
  },
  selected: {
    '&$selected': {
      backgroundColor: theme.palette.common.white,
      '&:hover': {
        background: theme.palette.common.white,
      },
      '&:active': {},
    },
  },
  appBar: {
    backgroundColor: theme.palette.primary.main,
    textTransform: 'capitalize',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  logo: {
    color: 'inherit',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    background: theme.palette.secondary.main,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const DashboardAppDrawerBar = ({ dashboardRoutes, children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const auth = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { url } = useRouteMatch();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleSignout = () => {
    auth.signout();
    try {
      dispatch(resetMealPlans());
      dispatch(resetFavRecipes());
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  const logo = (
    <div className={classes.toolbar}>
      <List>
        <ListItem className={classes.logo} component={Link} to="/">
          <ListItemIcon>
            <img src={logoImg} alt="logo" />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="h5" component="h1">
                Meal Picks
              </Typography>
            }
          />
        </ListItem>
      </List>
    </div>
  );

  const drawer = (
    <nav>
      {logo}
      <Divider />

      <List>
        {dashboardRoutes.map(({ text, linkTo, icon }, idx) => (
          <ListItem
            key={text}
            className={classes.drawerListItem}
            classes={{ selected: classes.selected }}
            selected={selectedIndex === idx}
            onClick={event => handleListItemClick(event, idx)}
            component={Link}
            to={url + linkTo}
            button
          >
            <ListItemIcon className={classes.drawerListIcon}>
              {icon}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        <ListItem
          className={classes.drawerListItem}
          onClick={handleSignout}
          button
        >
          <ListItemIcon className={classes.drawerListIcon}>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </ListItem>
      </List>
    </nav>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar} elevation={0}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" component="h2" noWrap>
            {dashboardRoutes[selectedIndex].text}
          </Typography>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="js">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="js">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default DashboardAppDrawerBar;
