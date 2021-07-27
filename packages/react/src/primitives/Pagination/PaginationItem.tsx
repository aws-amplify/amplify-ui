import React, { useCallback } from 'react';

import { IconChevronLeft, IconChevronRight } from '../Icon';
import { PaginationItemProps } from '../types/pagination';

export const PaginationItem: React.FC<PaginationItemProps> = (props) => {
  const {
    type,
    page,
    currentPage,
    onClick,
    ariaLabel,
    ariaDisabled,
    ariaCurrent,
    ...rest
  } = props;

  switch (type) {
    case 'page':
      const onChange = useCallback(() => {
        onClick(page, currentPage);
      }, [page, currentPage]);
      return (
        <li
          aria-label={ariaLabel}
          aria-current={ariaCurrent}
          onClick={onChange}
          {...rest}
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
          aria-label={ariaLabel}
          aria-disabled={ariaDisabled}
          onClick={onNext}
          {...rest}
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
          aria-label={ariaLabel}
          aria-disabled={ariaDisabled}
          onClick={onPrevious}
          {...rest}
        >
          <a>
            <IconChevronLeft size="large" />
          </a>
        </li>
      );
    case 'ellipsis':
      return (
        <li aria-label={ariaLabel} {...rest}>
          ...
        </li>
      );
    default:
    // No match type found
  }
  return <li></li>;
};
