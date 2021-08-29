import React, { useEffect, useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';

const styles = {
  margin: '5rem auto',
  display: 'grid',
  justifyContent: 'center',
};

const PaginationControlled = ({ totalPage, handlePagination }) => {
  const [page, setPage] = useState(1);

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
