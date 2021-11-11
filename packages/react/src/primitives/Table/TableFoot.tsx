import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { Primitive, TableFootProps } from '../types';
import { View } from '../View';

export const TableFoot: Primitive<TableFootProps, 'tfoot'> = ({
  children,
  className,
  ...rest
}) => (
  <View
    as="tfoot"
    className={classNames(ComponentClassNames.TableFoot, className)}
    {...rest}
  >
    {children}
  </View>
);
