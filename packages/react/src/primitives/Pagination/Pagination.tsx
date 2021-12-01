import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { Flex } from '../Flex';
import { PaginationProps, Primitive } from '../types';
import { usePaginationItems } from './usePaginationItems';
import { View } from '../View';

const PaginationPrimitive: Primitive<PaginationProps, 'nav'> = (
  {
    className,
    currentPage,
    totalPages,
    siblingCount,
    onNext,
    onPrevious,
    onChange,
    ...rest
  },
  ref
) => {
  const paginationItems = usePaginationItems(
    currentPage,
    totalPages,
    siblingCount,
    onNext,
    onPrevious,
    onChange
  );

  return (
    <View
      as="nav"
      className={classNames(ComponentClassNames.Pagination, className)}
      ref={ref}
      {...rest}
    >
      <Flex as="ol" justifyContent="center" alignItems="center" gap="inherit">
        {paginationItems}
      </Flex>
    </View>
  );
};

export const Pagination = React.forwardRef(PaginationPrimitive);

Pagination.displayName = 'Pagination';
