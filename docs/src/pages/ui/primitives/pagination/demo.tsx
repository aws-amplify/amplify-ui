import React, { useState, useCallback } from 'react';

import { Pagination } from '@aws-amplify/ui-react';

export const PaginationDemo = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const onNext = useCallback((newPage) => {
    setCurrentPage(newPage);
  }, []);

  const onPrev = useCallback((newPage) => {
    setCurrentPage(newPage);
  }, []);

  const onChange = useCallback((newPage, prevPage) => {
    setCurrentPage(newPage);
  }, []);
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={10}
      onNext={onNext}
      onPrevious={onPrev}
      onChange={onChange}
    />
  );
};
