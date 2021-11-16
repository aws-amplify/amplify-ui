import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { Primitive, TableBodyProps } from '../types';
import { View } from '../View';

export const TableBody: Primitive<TableBodyProps, 'tbody'> = ({
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
