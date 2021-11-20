import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { Primitive, TableRowProps } from '../types';
import { View } from '../View';

export const TableRow: Primitive<TableRowProps, 'tr'> = ({
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

TableRow.displayName = 'TableRow';
