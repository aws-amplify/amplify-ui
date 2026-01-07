import * as React from 'react';
import { classNames } from '@aws-amplify/ui';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@radix-ui/react-dropdown-menu';

import { ButtonGroup } from '../ButtonGroup';
import { ComponentClassName } from '@aws-amplify/ui';
import { IconMenu, useIcons } from '../Icon';
import { MenuButton } from './MenuButton';
import type {
  BaseMenuProps,
  MenuProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

export const MENU_TRIGGER_TEST_ID = 'amplify-menu-trigger-test-id';
export const MENU_ITEMS_GROUP_TEST_ID = 'amplify-menu-items-group-test-id';

const MenuPrimitive: Primitive<MenuProps, 'div'> = (
  {
    menuAlign = 'start',
    children,
    className,
    isOpen,
    size,
    trigger,
    triggerClassName,
    ariaLabel,
    onOpenChange,
    isDisabled,
    ...rest
  },
  ref
) => {
  const icons = useIcons('menu');
  return (
    <DropdownMenu onOpenChange={onOpenChange} open={isOpen}>
      <DropdownMenuTrigger disabled={isDisabled} asChild>
        {trigger ?? (
          <MenuButton
            ariaLabel={ariaLabel}
            size={size}
            testId={MENU_TRIGGER_TEST_ID}
            className={classNames(
              ComponentClassName.MenuTrigger,
              triggerClassName
            )}
          >
            {icons?.menu ?? <IconMenu />}
          </MenuButton>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={menuAlign}
        className={ComponentClassName.MenuWrapper}
      >
        <ButtonGroup
          className={classNames(ComponentClassName.MenuContent, className)}
          ref={ref}
          isDisabled={isDisabled}
          size={size}
          testId={MENU_ITEMS_GROUP_TEST_ID}
          {...rest}
        >
          {children}
        </ButtonGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/menu)
 */
export const Menu: ForwardRefPrimitive<BaseMenuProps, 'div'> =
  primitiveWithForwardRef(MenuPrimitive);

Menu.displayName = 'Menu';
