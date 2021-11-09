import React, { useState, useCallback } from 'react';

import { Flex, Pagination } from '@aws-amplify/ui-react';
import { Example } from '@/components/Example';

interface PaginationDemoProps {
  isDemo?: boolean;
  defaultCurrentPage?: number;
  defaultTotalPages?: number;
  defaultSiblingCount?: number;
}
export const PaginationDemo: React.FC<PaginationDemoProps> = (props) => {
  const {
    isDemo = true,
    defaultCurrentPage = 1,
    defaultTotalPages = 10,
    defaultSiblingCount = 1,
    ...rest
  } = props;

  const [currentPage, setCurrentPage] = useState(defaultCurrentPage);
  const [totalPages, setTotalPages] = useState(defaultTotalPages);
  const [siblingCount, setSiblingCount] = useState(defaultSiblingCount);

  const onNext = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages]);

  const onPrev = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const onChange = useCallback((newPage, prevPage) => {
    setCurrentPage(newPage);
  }, []);
  return (
    <div className="amplify-pagination-demo">
      {isDemo ? (
        <Flex justifyContent="center">
          <Flex justifyContent="center" alignItems="center">
            <label htmlFor="current-page">currentPage</label>
            <input
              type="text"
              id="current-page"
              value={currentPage}
              placeholder="Enter current page"
              onChange={(e) => {
                const newCurrentPage = isNaN(Number(e.target.value))
                  ? defaultCurrentPage
                  : Number(e.target.value);
                setCurrentPage(newCurrentPage);
              }}
            />
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            <label htmlFor="total-pages">totalPages</label>
            <input
              type="text"
              id="total-pages"
              value={totalPages}
              placeholder="Enter total pages"
              onChange={(e) => {
                const newTotalPages = isNaN(Number(e.target.value))
                  ? defaultTotalPages
                  : Number(e.target.value);
                setTotalPages(newTotalPages);
              }}
            />
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            <label htmlFor="sibling-count">siblingCount</label>
            <input
              type="text"
              id="sibling-count"
              value={siblingCount}
              placeholder="Enter sibling count"
              onChange={(e) => {
                const newSiblingCount = isNaN(Number(e.target.value))
                  ? defaultSiblingCount
                  : Number(e.target.value);
                setSiblingCount(newSiblingCount);
              }}
            />
          </Flex>
        </Flex>
      ) : null}
      <br />
      <Flex justifyContent="center">
        <Example>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            siblingCount={siblingCount}
            onNext={onNext}
            onPrevious={onPrev}
            onChange={onChange}
            {...rest}
          />
        </Example>
      </Flex>
    </div>
  );
};
