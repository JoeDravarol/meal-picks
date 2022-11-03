import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';

const styles = {
  margin: '5rem auto',
  display: 'grid',
  justifyContent: 'center',
};

const PaginationControlled = ({ currentPage, totalPage, handlePagination }) => {
  const history = useHistory();
  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [page]);

  const handleChange = (event, value) => {
    if (value !== page) {
      setPage(value);
      handlePagination(value);
      history.push(`/recipes?page=${value}`);
    }
  };

  return (
    <Pagination
      style={styles}
      shape="rounded"
      count={totalPage}
      page={page}
      onChange={handleChange}
    />
  );
};

export default PaginationControlled;
