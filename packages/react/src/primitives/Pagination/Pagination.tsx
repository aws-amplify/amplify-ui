import * as React from 'react';
import classNames from 'classnames';

import { Flex } from '../Flex';
import { View } from '../View';
import { usePaginationItems } from './usePaginationItems';
import { PaginationProps, PrimitiveWithForwardRef } from '../types';
import { ComponentClassNames } from '../shared/constants';

const PaginationPrimitive: PrimitiveWithForwardRef<PaginationProps, 'nav'> = (
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
