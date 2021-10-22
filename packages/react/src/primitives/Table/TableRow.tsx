import classNames from 'classnames';
import * as React from 'react';

import { View } from '..';
import { ComponentClassNames } from '../shared/constants';
import { TableRowProps } from '../types/table';

export const TableRow: React.FC<TableRowProps> = ({
  children,
  className,
  ...rest
}) => (
  <View
    as="tr"
    className={classNames(ComponentClassNames.TableRow, className)}
    {...rest}
  >
    {children}
  </View>
);
