import React, { useMemo } from 'react';
import classNames from 'classnames';

import { useRange, ELLIPSIS } from './useRange';
import { PaginationItem } from './PaginationItem';
import { View } from '../View';
import { PaginationProps } from '../types';
import { ComponentClassNames } from '../shared/constants';

export const Pagination: React.FC<PaginationProps> = (props) => {
  const {
    className,
    currentPage,
    totalPages,
    onNext,
    onPrevious,
    onChange,
    ariaLabel = 'Pagination Navigation',
    role = 'navigation',
    ...rest
  } = props;
  // To get the range of page numbers to be rendered in the pagination primitive
  const range = useRange(currentPage, totalPages);

  const pages = useMemo(
    () =>
      range.map((item) => {
        if (item === ELLIPSIS) {
          return <PaginationItem type="ellipsis" />;
        }
        return (
          <PaginationItem
            type="page"
            page={item as number}
            currentPage={currentPage}
            onClick={onChange}
            isActive={item == currentPage}
          />
        );
      }),
    [currentPage, onChange]
  );

  return (
    <View
      as="ul"
      role={role}
      ariaLabel={ariaLabel}
      className={classNames(ComponentClassNames.Pagination, className)}
      {...rest}
    >
      <PaginationItem
        type="previous"
        currentPage={currentPage}
        onClick={onPrevious}
        isDisabled={currentPage == 1}
      />
      {pages}
      <PaginationItem
        type="next"
        currentPage={currentPage}
        onClick={onNext}
        isDisabled={currentPage == totalPages}
      />
    </View>
  );
};
