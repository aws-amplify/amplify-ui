import classNames from 'classnames';

import { Flex, Text, View } from '..';
import { ComponentClassNames } from '../shared/constants';
import { Primitive, TableProps } from '../types';

export const Table: Primitive<TableProps, 'table'> = ({
  caption,
  children,
  className,
  highlightOnHover = false,
  size = '',
  summary,
  variation = '',
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
      {caption || summary ? (
        <View as="caption">
          {caption}
          {caption && summary ? <br /> : null}
          {summary && (
            <Text as="span" className={ComponentClassNames.TableSummary}>
              {summary}
            </Text>
          )}
        </View>
      ) : null}
      {children}
    </View>
  </Flex>
);
