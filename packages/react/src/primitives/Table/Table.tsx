import * as React from 'react';
import classNames from 'classnames';

import { classNameModifier } from '../shared/utils';
import { ComponentClassNames } from '../shared/constants';
import {
  ForwardRefPrimitive,
  Primitive,
  BaseTableProps,
  TableProps,
} from '../types';
import { View } from '../View';

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
    ComponentClassNames.Table,
    classNameModifier(ComponentClassNames.Table, size),
    classNameModifier(ComponentClassNames.Table, variation),
    className
  );

  return (
    <View
      as="table"
      className={componentClasses}
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
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/table)
 */
export const Table: ForwardRefPrimitive<BaseTableProps, 'table'> =
  React.forwardRef(TablePrimitive);

Table.displayName = 'Table';
