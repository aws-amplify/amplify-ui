import classNames from 'classnames';

import { View } from '../View';
import { ComponentClassNames } from '../shared/constants';
import { Primitive, TableCellElement, TableCellProps } from '../types';

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
