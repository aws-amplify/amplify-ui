import * as React from 'react';
import { classNames } from '@aws-amplify/ui';

import { Flex } from '../Flex';
import { View } from '../View';
import { usePaginationItems } from './usePaginationItems';
import {
  BasePaginationProps,
  PaginationProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { ComponentClassName } from '@aws-amplify/ui';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

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
  const paginationItems = usePaginationItems({
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
    onChange,
  });

  return (
    <View
      as="nav"
      className={classNames(ComponentClassName.Pagination, className)}
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
export const Pagination: ForwardRefPrimitive<BasePaginationProps, 'nav'> =
  primitiveWithForwardRef(PaginationPrimitive);

Pagination.displayName = 'Pagination';
