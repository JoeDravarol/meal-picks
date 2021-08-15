import React from 'react';
import { GithubLoginButton } from 'react-social-login-buttons';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import { useAuth } from 'contexts/auth';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
  },
  logo: {
    color: 'inherit',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
    justifyContent: 'center',
  },
}));

const buttonStyle = {
  display: 'flex',
  justifyContent: 'center',
};

const LoginForm = () => {
  const classes = useStyles();
  const auth = useAuth();

  return (
    <Container className={classes.root} maxWidth="sm">
      <Box component={Paper} p={4} maxWidth={400} mx="auto">
        <GithubLoginButton
          style={buttonStyle}
          onClick={() => auth.signInWithGithub()}
        />
      </Box>
    </Container>
  );
};

export default LoginForm;
