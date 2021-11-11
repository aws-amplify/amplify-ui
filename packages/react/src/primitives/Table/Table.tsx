import classNames from 'classnames';

import { Flex } from '../Flex';
import { View } from '../View';
import { ComponentClassNames } from '../shared/constants';
import { Primitive, TableProps } from '../types';

export const Table: Primitive<TableProps, 'table'> = ({
  caption,
  children,
  className,
  highlightOnHover = false,
  size,
  variation,
  ...rest
}) => (
  <Flex>
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
  </Flex>
);
