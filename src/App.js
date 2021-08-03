import React, { useState, useEffect } from 'react';
import recipeService from 'services/recipes';
import { totalPageCount } from 'utils/pagination';
import PaginationControlled from 'components/PaginationControlled';
import RecipeCard from 'components/RecipeCard';
import Grid from '@material-ui/core/Grid';
import Layout from 'components/Layout';
import RecipeDetails from 'components/RecipeDetails';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [totalPage, setTotalPage] = useState();

  useEffect(() => {
    recipeService.getPage(1).then(response => {
      setTotalPage(totalPageCount(response.headers.link));
      return setRecipes(response.data);
    });
  }, []);

  const paginateTo = async page => {
    const response = await recipeService.getPage(page);
    setRecipes(response.data);
  };

  return (
    <Layout>
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
    </Layout>
  );
};

export default App;
