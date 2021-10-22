import classNames from 'classnames';
import * as React from 'react';

import { View } from '..';
import { ComponentClassNames } from '../shared/constants';
import { TableCellProps } from '../types/table';

export const TableCell: React.FC<TableCellProps> = ({
  as: asElementTag = 'td',
  children,
  className,
  ...rest
}) => (
  <View
    as={asElementTag}
    className={classNames(
      asElementTag === 'td'
        ? ComponentClassNames.TableTd
        : ComponentClassNames.TableTh,
      className
    )}
    {...rest}
  >
    {children}
  </View>
);
