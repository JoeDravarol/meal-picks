import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Modal from '@material-ui/core/Modal';

import recipeService from 'services/recipes';
import RecipeDetails from 'components/RecipeDetails';
import Loader from 'components/Loader';
import { useAuth } from 'contexts/AuthContext';
import LoginForm from 'components/LoginForm';

const modalStyles = {
  display: 'grid',
  alignContent: 'center',
};

const RecipeDetailsPage = () => {
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
      <RecipeDetails
        data={recipe}
        isAuth={auth.isAuthenticated()}
        handleModalOpen={handleModalOpen}
      />
    </>
  );
};

export default RecipeDetailsPage;
