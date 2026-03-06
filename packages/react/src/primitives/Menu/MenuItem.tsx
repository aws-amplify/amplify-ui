import * as React from 'react';
import { classNames } from '@aws-amplify/ui';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';

import { ComponentClassName } from '@aws-amplify/ui';
import { MenuButton } from './MenuButton';
import type {
  ForwardRefPrimitive,
  BaseMenuItemProps,
  MenuItemProps,
  Primitive,
} from '../types';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

export const MENU_ITEM_TEST_ID = 'amplify-menu-item-test-id';

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/menu)
 */
const MenuItemPrimitive: Primitive<MenuItemProps, 'div'> = (
  { children, className, ...rest },
  ref
) => {
  return (
    <DropdownMenuItem asChild ref={ref}>
      <MenuButton
        className={classNames(ComponentClassName.MenuItem, className)}
        testId={MENU_ITEM_TEST_ID}
        {...rest}
        variation="menu" // ensures `menu` variation is not overwritten
      >
        {children}
      </MenuButton>
    </DropdownMenuItem>
  );
};

export const MenuItem: ForwardRefPrimitive<BaseMenuItemProps, 'div'> =
  primitiveWithForwardRef(MenuItemPrimitive);

MenuItem.displayName = 'MenuItem';
