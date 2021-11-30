import classNames from 'classnames';
import { Item, Header, Trigger, Content } from '@radix-ui/react-accordion';
import * as React from 'react';

import { IconExpandMore } from '../Icon';
import { View } from '../View';
import { PrimitiveWithForwardRef } from '../types/view';
import { ExpanderItemProps } from '../types/expander';
import { ComponentClassNames } from '../shared/constants';
import { splitPrimitiveProps } from '../shared/styleUtils';
import { useStableId } from '../shared/utils';

export const EXPANDER_ITEM_TEST_ID = 'expander-item';
export const EXPANDER_HEADER_TEST_ID = 'expander-header';
export const EXPANDER_ICON_TEST_ID = 'expander-icon';
export const EXPANDER_CONTENT_TEXT_TEST_ID = 'expander-content-text';

const ExpanderItemPrimitive: PrimitiveWithForwardRef<
  ExpanderItemProps,
  typeof Item
> = ({ children, className, title, ..._rest }, ref) => {
  const triggerId = useStableId();
  const contentId = useStableId();
  const { rest } = splitPrimitiveProps(_rest);
  return (
    <Item
      className={classNames(ComponentClassNames.ExpanderItem, className)}
      data-testid={EXPANDER_ITEM_TEST_ID}
      ref={ref}
      {...rest}
    >
      <Header
        className={ComponentClassNames.ExpanderHeader}
        data-testid={EXPANDER_HEADER_TEST_ID}
      >
        <Trigger
          aria-controls={contentId}
          className={ComponentClassNames.ExpanderTrigger}
          id={triggerId}
        >
          {title}
          <IconExpandMore
            aria-hidden
            className={ComponentClassNames.ExpanderIcon}
            data-testid={EXPANDER_ICON_TEST_ID}
          />
        </Trigger>
      </Header>
      <Content
        aria-labelledby={triggerId}
        className={ComponentClassNames.ExpanderContent}
        id={contentId}
      >
        <View
          className={ComponentClassNames.ExpanderContentText}
          testId={EXPANDER_CONTENT_TEXT_TEST_ID}
        >
          {children}
        </View>
      </Content>
    </Item>
  );
};

export const ExpanderItem = React.forwardRef(ExpanderItemPrimitive);

ExpanderItem.displayName = 'ExpanderItem';
