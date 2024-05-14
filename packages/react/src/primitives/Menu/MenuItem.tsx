import * as React from 'react';
import { classNames } from '@aws-amplify/ui';
import * as Dropdown from '@radix-ui/react-dropdown-menu';

import { sanitizeNamespaceImport } from '@aws-amplify/ui';

import { ComponentClassName } from '@aws-amplify/ui';
import { MenuButton } from './MenuButton';
import {
  ForwardRefPrimitive,
  BaseMenuItemProps,
  MenuItemProps,
  Primitive,
} from '../types';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

// Radix packages don't support ESM in Node, in some scenarios(e.g. SSR)
// We have to use namespace import and sanitize it to ensure the interoperablity between ESM and CJS
const { DropdownMenuItem } = sanitizeNamespaceImport(Dropdown);

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
