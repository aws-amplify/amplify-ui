import classNames from 'classnames';

import { View } from '..';
import { ComponentClassNames } from '../shared/constants';
import { Primitive, TableHeadProps } from '../types';

export const TableHead: Primitive<TableHeadProps, 'thead'> = ({
  children,
  className,
  ...rest
}) => (
  <View
    as="thead"
    className={classNames(ComponentClassNames.TableHead, className)}
    {...rest}
  >
    {children}
  </View>
);
