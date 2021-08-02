import React, { useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';

const PaginationControlled = ({ totalPage, handlePagination }) => {
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    if (value !== page) {
      setPage(value);
      handlePagination(value);
    }
  };

  return (
    <Pagination
      shape="rounded"
      count={totalPage}
      page={page}
      onChange={handleChange}
    />
  );
};

export default PaginationControlled;
