import classNames from 'classnames';
import * as React from 'react';

import { View } from '..';
import { ComponentClassNames } from '../shared/constants';
import { TableBodyProps } from '../types/table';

export const TableBody: React.FC<TableBodyProps> = ({
  children,
  className,
  ...rest
}) => (
  <View
    as="tbody"
    className={classNames(ComponentClassNames.TableBody, className)}
    {...rest}
  >
    {children}
  </View>
);
