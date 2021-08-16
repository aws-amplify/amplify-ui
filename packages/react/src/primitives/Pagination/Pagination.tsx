import * as React from 'react';
import classNames from 'classnames';

import { Flex } from '../Flex';
import { View } from '../View';
import { usePaginationItems } from './usePaginationItems';
import { PaginationProps } from '../types';
import { ComponentClassNames } from '../shared/constants';

export const Pagination: React.FC<PaginationProps> = (props) => {
  const {
    className,
    currentPage,
    totalPages,
    siblingCount,
    onNext,
    onPrevious,
    onChange,
    ...rest
  } = props;

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
      {...rest}
    >
      <Flex as="ol" justifyContent="center" alignItems="center" gap="inherit">
        {paginationItems}
      </Flex>
    </View>
  );
};
