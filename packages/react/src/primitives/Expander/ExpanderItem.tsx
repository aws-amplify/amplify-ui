import * as React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';

import { sanitizeNamespaceImport } from '@aws-amplify/ui';

import { ComponentClassNames } from '../shared/constants';
import { BaseExpanderItemProps, ExpanderItemProps } from '../types/expander';
import { IconExpandMore } from '../Icon/internal';
import { ForwardRefPrimitive, Primitive } from '../types/view';
import { splitPrimitiveProps } from '../utils/splitPrimitiveProps';
import { useStableId } from '../utils/useStableId';
import { View } from '../View';

// Radix packages don't support ESM in Node, in some scenarios(e.g. SSR)
// We have to use namespace import and sanitize it to ensure the interoperablity between ESM and CJS
const { Item, Header, Trigger, Content } = sanitizeNamespaceImport(Accordion);

export const EXPANDER_ITEM_TEST_ID = 'expander-item';
export const EXPANDER_HEADER_TEST_ID = 'expander-header';
export const EXPANDER_ICON_TEST_ID = 'expander-icon';
export const EXPANDER_CONTENT_TEXT_TEST_ID = 'expander-content-text';

const ExpanderItemPrimitive: Primitive<ExpanderItemProps, 'div'> = (
  { children, className, title, value, ..._rest },
  ref
) => {
  const triggerId = useStableId();
  const contentId = useStableId();
  const { rest } = splitPrimitiveProps(_rest);
  return (
    <Item
      className={classNames(ComponentClassNames.ExpanderItem, className)}
      data-testid={EXPANDER_ITEM_TEST_ID}
      ref={ref}
      value={value}
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

export const ExpanderItem: ForwardRefPrimitive<BaseExpanderItemProps, 'div'> =
  React.forwardRef(ExpanderItemPrimitive);

ExpanderItem.displayName = 'ExpanderItem';
