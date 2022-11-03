import React, { useState, useEffect } from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import recipeService from 'services/recipes';
import PaginationControlled from 'components/PaginationControlled';
import RecipeCard from 'features/recipe/RecipeCard';
import Loader from 'components/Loader';
import useQuery from 'hooks/useQuery';

const RecipeListPage = () => {
  const query = useQuery();
  const [recipes, setRecipes] = useState([]);
  const [totalPage, setTotalPage] = useState();
  let page = Number(query.get('page'));

  useEffect(() => {
    recipeService.getPage(page).then(data => {
      setTotalPage(data.totalPage);
      setRecipes(data.results);
    });
  }, [page]);

  if (recipes.length === 0) return <Loader />;

  if (page > totalPage) {
    // Replace url without re-rendering
    window.history.replaceState(null, '', `/recipes?page=${totalPage}`);
    page = totalPage;
  }

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
        currentPage={page}
        totalPage={totalPage}
        handlePagination={paginateTo}
      />
    </Container>
  );
};

export default RecipeListPage;
