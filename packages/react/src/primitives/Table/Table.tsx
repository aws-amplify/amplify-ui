import * as React from 'react';
import { tableClasses } from '@aws-amplify/ui';

import {
  ForwardRefPrimitive,
  Primitive,
  BaseTableProps,
  TableProps,
} from '../types';
import { View } from '../View';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

const TablePrimitive: Primitive<TableProps, 'table'> = (
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
) => {
  return (
    <View
      as="table"
      className={tableClasses(
        {
          _modifiers: [size, variation],
        },
        [className]
      )}
      data-highlightonhover={highlightOnHover}
      ref={ref}
      {...rest}
    >
      {caption && (
        <View as="caption" className={tableClasses({ _element: 'caption' })}>
          {caption}
        </View>
      )}
      {children}
    </View>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/table)
 */
export const Table: ForwardRefPrimitive<BaseTableProps, 'table'> =
  primitiveWithForwardRef(TablePrimitive);

Table.displayName = 'Table';
