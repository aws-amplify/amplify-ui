import classNames from 'classnames';
import * as React from 'react';

import { View } from '..';
import { ComponentClassNames } from '../shared/constants';
import { TableHeadProps } from '../types/table';

export const TableHead: React.FC<TableHeadProps> = ({
  children,
  className,
  ...rest
}) => (
  <View
    as="thead"
    className={classNames(ComponentClassNames.TableHead, className)}
    {...rest}
  >
    {children}
  </View>
);
