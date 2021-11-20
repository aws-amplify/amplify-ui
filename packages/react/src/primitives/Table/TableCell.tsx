import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { Primitive, TableCellElement, TableCellProps } from '../types';
import { View } from '../View';

export const TableCell: Primitive<TableCellProps, TableCellElement> = ({
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

TableCell.displayName = 'TableCell';
