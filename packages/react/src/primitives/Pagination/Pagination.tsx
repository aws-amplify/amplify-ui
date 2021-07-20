import React from 'react';
import classNames from 'classnames';

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
    ...rest
  } = props;
  return (
    <View
      as="ul"
      className={classNames(ComponentClassNames.Pagination, className)}
      {...rest}
    >
      Hello!, I'm a pagination component
    </View>
  );
};
