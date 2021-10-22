import classNames from 'classnames';
import * as React from 'react';

import { View } from '..';
import { ComponentClassNames } from '../shared/constants';
import { TableFootProps } from '../types/table';

export const TableFoot: React.FC<TableFootProps> = ({
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
