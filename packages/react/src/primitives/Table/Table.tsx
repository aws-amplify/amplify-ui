import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { Primitive, TableProps } from '../types';
import { View } from '../View';

export const Table: Primitive<TableProps, 'table'> = ({
  caption,
  children,
  className,
  highlightOnHover = false,
  size,
  variation,
  ...rest
}) => (
  <View
    as="table"
    className={classNames(ComponentClassNames.Table, className)}
    data-highlightonhover={highlightOnHover}
    data-size={size}
    data-variation={variation}
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
