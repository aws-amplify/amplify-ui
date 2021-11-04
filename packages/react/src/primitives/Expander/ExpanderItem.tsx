import classNames from 'classnames';
import { Item, Header, Trigger, Content } from '@radix-ui/react-accordion';

import { Heading } from '../Heading';
import { IconExpandMore } from '../Icon';
import { View } from '../View';
import { Primitive } from '../types/view';
import { ExpanderItemProps } from '../types/expander';
import { ComponentClassNames } from '../shared/constants';
import { splitPrimitiveProps } from '../shared/styleUtils';
import { useStableId } from '../shared/utils';

export const ExpanderItem: Primitive<ExpanderItemProps, typeof Item> = ({
  children,
  className,
  level,
  title,
  ..._rest
}) => {
  const triggerId = useStableId();
  const contentId = useStableId();
  const { baseStyleProps, rest } = splitPrimitiveProps(_rest);
  return (
    <View
      as={Item}
      className={classNames(ComponentClassNames.ExpanderItem, className)}
      {...baseStyleProps}
      {...rest}
    >
      <View as={Header} asChild>
        <Heading className={ComponentClassNames.ExpanderHeading} level={level}>
          <View
            aria-controls={contentId}
            as={Trigger}
            className={ComponentClassNames.ExpanderTrigger}
            id={triggerId}
          >
            {title}
            <IconExpandMore
              aria-hidden
              className={ComponentClassNames.ExpanderIcon}
              size="large"
            />
          </View>
        </Heading>
      </View>
      <View
        aria-labelledby={triggerId}
        as={Content}
        className={ComponentClassNames.ExpanderContent}
        id={contentId}
      >
        <View className={ComponentClassNames.ExpanderContentText}>
          {children}
        </View>
      </View>
    </View>
  );
};
