import React, { useCallback } from 'react';

import { IconChevronLeft, IconChevronRight } from '../Icon';
import { PaginationItemProps } from '../types/pagination';

export const PaginationItem: React.FC<PaginationItemProps> = (props) => {
  const { type, page, currentPage, totalPages, onClick } = props;

  switch (type) {
    case 'page':
      const onChange = useCallback(() => {
        onClick(page, currentPage);
      }, [page, currentPage]);
      const ariaCurrent = page === currentPage ? 'page' : undefined;
      return (
        <li
          aria-label={`Go to page ${page}`}
          aria-current={ariaCurrent}
          onClick={onChange}
        >
          <a>{page}</a>
        </li>
      );
    case 'next':
      const onNext = useCallback(() => {
        onClick(currentPage + 1);
      }, [currentPage]);
      return (
        <li
          aria-label="Go to next page"
          aria-disabled={currentPage === totalPages}
          onClick={onNext}
        >
          <a>
            <IconChevronRight size="large" />
          </a>
        </li>
      );
    case 'previous':
      const onPrevious = useCallback(() => {
        onClick(currentPage - 1);
      }, [currentPage]);
      return (
        <li
          aria-label="Go to previous page"
          aria-disabled={currentPage === 1}
          onClick={onPrevious}
        >
          <a>
            <IconChevronLeft size="large" />
          </a>
        </li>
      );
    case 'ellipsis':
      return <li aria-label="ellipsis">...</li>;
    default:
    // No match type found
  }
  return <li></li>;
};
