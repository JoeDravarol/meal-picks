import React from 'react';
import {
  GithubLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import { useAuth } from 'contexts/auth';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
  },
  box: {
    display: 'grid',
    gridGap: theme.spacing(1),
  },
}));

const buttonStyle = {
  display: 'flex',
  justifyContent: 'center',
};

const LoginForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const { signInWithGithub, signInWithGoogle } = useAuth();

  const handleSignIn = signInProvider => {
    signInProvider().then(() => history.replace('/dashboard'));
  };

  return (
    <Container className={classes.root} maxWidth="sm">
      <Box
        className={classes.box}
        component={Paper}
        p={4}
        maxWidth={400}
        mx="auto"
      >
        <GithubLoginButton
          style={buttonStyle}
          onClick={() => handleSignIn(signInWithGithub)}
        />
        <GoogleLoginButton
          style={buttonStyle}
          onClick={() => handleSignIn(signInWithGoogle)}
        />
      </Box>
    </Container>
  );
};

export default LoginForm;
