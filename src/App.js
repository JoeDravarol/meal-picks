import React, { useState, useEffect } from 'react';
import recipeService from 'services/recipes';
import { totalPageCount } from 'utils/pagination';
import PaginationControlled from 'components/PaginationControlled';

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
    <div>
      MealPicks
      <pre>{JSON.stringify(recipes, null, 2)}</pre>
      <PaginationControlled
        totalPage={totalPage}
        handlePagination={paginateTo}
      />
    </div>
  );
};

export default App;
