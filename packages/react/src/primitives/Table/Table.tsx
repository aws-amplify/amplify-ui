import * as React from 'react';
import classNames from 'classnames';

import { classNameModifier } from '../shared/utils';
import { ComponentClassName } from '@aws-amplify/ui';
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
  const componentClasses = classNames(
    ComponentClassName.Table,
    classNameModifier(ComponentClassName.Table, size),
    classNameModifier(ComponentClassName.Table, variation),
    className
  );

  return (
    <View
      as="table"
      className={componentClasses}
      data-highlightonhover={highlightOnHover}
      ref={ref}
      {...rest}
    >
      {caption && (
        <View as="caption" className={ComponentClassName.TableCaption}>
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
