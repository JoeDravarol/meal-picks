import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import recipeService from 'services/recipes';
import RecipeDetails from 'features/recipe/RecipeDetails';
import Loader from 'components/Loader';
import { useAuth } from 'contexts/AuthContext';
import LoginForm from 'features/authentication/LoginForm';

const modalStyles = {
  display: 'grid',
  alignContent: 'center',
};

const useStyles = makeStyles(theme => ({
  container: {
    [theme.breakpoints.up('md')]: {
      maxWidth: 850,
    },
  },
  arrowBackIcon: {
    marginRight: theme.spacing(1),
  },
}));

const RecipeDetailsPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const auth = useAuth();
  const [recipe, setRecipe] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    recipeService.getById(id).then(recipe => {
      setRecipe(recipe);
    });
  }, [id]);

  if (!recipe) return <Loader />;

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Modal
        style={modalStyles}
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="login form modal"
        aria-describedby="a modal for user to login to the website"
      >
        <div>
          <LoginForm />
        </div>
      </Modal>
      <Container className={classes.container}>
        <Button onClick={history.goBack}>
          <ArrowBackIcon className={classes.arrowBackIcon} />
          Go back
        </Button>
      </Container>
      <RecipeDetails
        data={recipe}
        isAuth={auth.isAuthenticated()}
        handleModalOpen={handleModalOpen}
      />
    </>
  );
};

export default RecipeDetailsPage;
