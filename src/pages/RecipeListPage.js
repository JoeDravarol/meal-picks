import React, { useState, useEffect } from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import recipeService from 'services/recipes';
import PaginationControlled from 'components/PaginationControlled';
import RecipeCard from 'components/RecipeCard';
import Loader from 'components/Loader';

const RecipeListPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [totalPage, setTotalPage] = useState();

  useEffect(() => {
    recipeService.getPage(1).then(data => {
      setTotalPage(data.totalPage);
      setRecipes(data.results);
    });
  }, []);

  if (recipes.length === 0) return <Loader />;

  const paginateTo = async page => {
    const data = await recipeService.getPage(page);
    setRecipes(data.results);
  };

  return (
    <Container maxWidth="xl">
      <Grid container justifyContent="center" spacing={3}>
        {recipes.map(recipe => (
          <Grid item key={recipe.id}>
            <RecipeCard {...recipe} />
          </Grid>
        ))}
      </Grid>

      <PaginationControlled
        totalPage={totalPage}
        handlePagination={paginateTo}
      />
    </Container>
  );
};

export default RecipeListPage;
