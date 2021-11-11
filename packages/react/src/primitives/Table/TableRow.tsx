import classNames from 'classnames';

import { View } from '../View';
import { ComponentClassNames } from '../shared/constants';
import { Primitive, TableRowProps } from '../types';

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
