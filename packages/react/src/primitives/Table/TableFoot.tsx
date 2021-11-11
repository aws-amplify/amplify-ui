import classNames from 'classnames';

import { View } from '../View';
import { ComponentClassNames } from '../shared/constants';
import { Primitive, TableFootProps } from '../types';

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
