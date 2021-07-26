import React from 'react';
import classNames from 'classnames';

import { usePaginationItems } from './usePaginationItems';
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

  // invoke usePages hook to get pagination items
  const paginationItems = usePaginationItems(
    currentPage,
    totalPages,
    onNext,
    onPrevious,
    onChange
  );

  return (
    <View
      as="ul"
      role={role}
      ariaLabel={ariaLabel}
      className={classNames(ComponentClassNames.Pagination, className)}
      {...rest}
    >
      {paginationItems}
    </View>
  );
};
