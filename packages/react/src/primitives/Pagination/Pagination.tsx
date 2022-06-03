import * as React from 'react';
import classNames from 'classnames';

import { Flex } from '../Flex';
import { View } from '../View';
import { usePaginationItems } from './usePaginationItems';
import { PaginationProps, Primitive } from '../types';
import { ComponentClassNames } from '../shared/constants';

const PaginationPrimitive: Primitive<PaginationProps, 'nav'> = (
  {
    className,
    currentPage = 1,
    totalPages,
    hasMorePages = false,
    siblingCount,
    currentPageLabel,
    pageLabel,
    previousLabel,
    nextLabel,
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
    hasMorePages,
    siblingCount,
    currentPageLabel,
    pageLabel,
    previousLabel,
    nextLabel,
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

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/pagination)
 */
export const Pagination = React.forwardRef(PaginationPrimitive);

Pagination.displayName = 'Pagination';
