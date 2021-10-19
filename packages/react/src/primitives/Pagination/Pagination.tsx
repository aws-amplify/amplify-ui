import classNames from 'classnames';

import { Flex } from '../Flex';
import { View } from '../View';
import { usePaginationItems } from './usePaginationItems';
import { PaginationProps, Primitive } from '../types';
import { ComponentClassNames } from '../shared/constants';

export const Pagination: Primitive<PaginationProps, 'nav'> = ({
  className,
  currentPage,
  totalPages,
  siblingCount,
  onNext,
  onPrevious,
  onChange,
  role = 'navigation',
  ...rest
}) => {
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
      role={role}
      className={classNames(ComponentClassNames.Pagination, className)}
      {...rest}
    >
      <Flex as="ol" justifyContent="center" alignItems="center" gap="inherit">
        {paginationItems}
      </Flex>
    </View>
  );
};
