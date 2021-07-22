import React, { useCallback } from 'react';

import { PaginationItemProps } from '../types/pagination';

export const PaginationItem: React.FC<PaginationItemProps> = (props) => {
  const { type, page, currentPage, isActive, isDisabled, onClick } = props;

  switch (type) {
    case 'page':
      const onChange = useCallback(() => {
        onClick(page, currentPage);
      }, [page, currentPage]);
      return (
        <li aria-label={`Go to page ${page}`} onClick={onChange}>
          {page}
        </li>
      );
    case 'next':
      const onNext = useCallback(() => {
        onClick(currentPage + 1);
      }, [currentPage]);
      return (
        <li aria-label="Go to next page" onClick={onNext}>
          next icon
        </li>
      );
    case 'previous':
      const onPrevious = useCallback(() => {
        onClick(currentPage - 1);
      }, [currentPage]);
      return (
        <li aria-label="Go to previous page" onClick={onPrevious}>
          next icon
        </li>
      );
    case 'ellipsis':
      return <li aria-label="Ellipsis">...</li>;
    default:
    // No match type found
  }
  return <li></li>;
};
