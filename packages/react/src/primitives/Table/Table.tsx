import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { PrimitiveWithForwardRef, TableProps } from '../types';
import { View } from '../View';

const TablePrimitive: PrimitiveWithForwardRef<TableProps, 'table'> = (
  {
    caption,
    children,
    className,
    highlightOnHover = false,
    size,
    variation,
    ...rest
  },
  ref
) => (
  <View
    as="table"
    className={classNames(ComponentClassNames.Table, className)}
    data-highlightonhover={highlightOnHover}
    data-size={size}
    data-variation={variation}
    ref={ref}
    {...rest}
  >
    {caption && (
      <View as="caption" className={ComponentClassNames.TableCaption}>
        {caption}
      </View>
    )}
    {children}
  </View>
);

export const Table = React.forwardRef(TablePrimitive);

Table.displayName = 'Table';
