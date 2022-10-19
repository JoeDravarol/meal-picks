import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { useAuth } from 'contexts/AuthContext';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'white',
    padding: theme.spacing(5),
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textAlign: 'right',
    display: 'block',
  },
}));

const SignupForm = () => {
  const classes = useStyles();
  const auth = useAuth();

  const onSubmit = e => {
    e.preventDefault();
    const username = e.target.username.value;
    const name = e.target.name.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    auth.signup({ username, name, password, confirmPassword });
  };

  return (
    <Container className={classes.root} maxWidth="xs">
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>

      <form className={classes.form} onSubmit={onSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm password"
          type="password"
          id="confirmPassword"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
        </Button>
        <Link
          to="/login"
          className={classes.link}
          variant="body2"
          component={RouterLink}
        >
          Already have an account? Sign in
        </Link>
      </form>
    </Container>
  );
};

export default SignupForm;
