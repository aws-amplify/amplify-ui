import classNames from 'classnames';
import { Item, Header, Trigger, Content } from '@radix-ui/react-accordion';

import { Heading } from '../Heading';
import { IconExpandMore } from '../Icon';
import { View } from '../View';
import { Primitive } from '../types/view';
import { ExpanderItemProps } from '../types/expander';
import { splitPrimitiveProps } from '../shared/styleUtils';
import { ComponentClassNames } from 'src';

export const ExpanderItem: Primitive<ExpanderItemProps, typeof Item> = ({
  children,
  className,
  content,
  heading,
  level,
  ..._rest
}) => {
  const { baseStyleProps, rest } = splitPrimitiveProps(_rest);
  return (
    <View
      as={Item}
      className={classNames(ComponentClassNames.ExpanderItem, className)}
      {...baseStyleProps}
      {...rest}
    >
      <View as={Header} asChild>
        <Heading level={level}>
          <View as={Trigger}>
            {heading}
            <IconExpandMore aria-hidden />
          </View>
        </Heading>
      </View>
      <View as={Content}>{content}</View>
    </View>
  );
};
