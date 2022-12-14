import * as React from 'react';
import classNames from 'classnames';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';

import { ComponentClassNames } from '../shared/constants';
import { MenuButton } from './MenuButton';
import { ForwardRefPrimitive, MenuItemProps, Primitive } from '../types';

export const MENU_ITEM_TEST_ID = 'amplify-menu-item-test-id';

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/menu)
 */
const MenuItemPrimitive: Primitive<MenuItemProps, 'div'> = (
  { children, className, variation, ...rest },
  ref
) => {
  return (
    <DropdownMenuItem asChild={true} ref={ref}>
      <MenuButton
        className={classNames(ComponentClassNames.MenuItem, className)}
        testId={MENU_ITEM_TEST_ID}
        {...rest}
        variation="menu" // ensures `menu` variation is not overwritten
      >
        {children}
      </MenuButton>
    </DropdownMenuItem>
  );
};

export const MenuItem: ForwardRefPrimitive<MenuItemProps, 'div'> =
  React.forwardRef(MenuItemPrimitive);

MenuItem.displayName = 'MenuItem';
