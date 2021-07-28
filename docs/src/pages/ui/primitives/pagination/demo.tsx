import React, { useState, useCallback } from 'react';

import { Flex, Pagination } from '@aws-amplify/ui-react';

export const PaginationDemo = (props) => {
  const {
    defaultCurrentPage,
    defaultTotalPages,
    isDemo = true,
    ...rest
  } = props;
  const [currentPage, setCurrentPage] = useState(defaultCurrentPage);
  const [totalPages, setTotalPages] = useState(defaultTotalPages);

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
    <div>
      {isDemo ? (
        <Flex justifyContent="center">
          <Flex justifyContent="center" alignItems="center">
            <label htmlFor="current-page">currentPage</label>
            <input
              type="text"
              id="current-page"
              value={currentPage}
              placeholder="Enter current page"
              onChange={(e) => setCurrentPage(e.target.value)}
            />
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            <label htmlFor="total-pages">totalPages</label>
            <input
              type="text"
              id="total-pages"
              value={totalPages}
              placeholder="Enter total pages"
              onChange={(e) => setTotalPages(e.target.value)}
            />
          </Flex>
        </Flex>
      ) : null}
      <br />
      <Flex justifyContent="center">
        <Pagination
          currentPage={Number(currentPage)}
          totalPages={Number(totalPages)}
          onNext={onNext}
          onPrevious={onPrev}
          onChange={onChange}
          {...rest}
        />
      </Flex>
    </div>
  );
};
