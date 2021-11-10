import classNames from 'classnames';

import { View } from '..';
import { ComponentClassNames } from '../shared/constants';
import { Primitive, TableBodyProps } from '../types';

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
