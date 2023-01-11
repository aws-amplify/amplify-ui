import * as React from 'react';
import classNames from 'classnames';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@radix-ui/react-dropdown-menu';

import { ButtonGroup } from '../ButtonGroup';
import { ComponentClassNames } from '../shared/constants';
import { IconMenu } from '../Icon/internal';
import { MenuButton } from './MenuButton';
import { MenuProps, Primitive } from '../types';

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
    ...rest
  },
  ref
) => (
  <DropdownMenu onOpenChange={onOpenChange} open={isOpen}>
    <DropdownMenuTrigger asChild>
      {trigger ?? (
        <MenuButton
          ariaLabel={ariaLabel}
          size={size}
          testId={MENU_TRIGGER_TEST_ID}
          className={classNames(
            ComponentClassNames.MenuTrigger,
            triggerClassName
          )}
        >
          <IconMenu size={size} />
        </MenuButton>
      )}
    </DropdownMenuTrigger>
    <DropdownMenuContent
      align={menuAlign}
      className={ComponentClassNames.MenuContentWrapper}
    >
      <ButtonGroup
        className={classNames(ComponentClassNames.MenuContent, className)}
        ref={ref}
        size={size}
        testId={MENU_ITEMS_GROUP_TEST_ID}
        {...rest}
      >
        {children}
      </ButtonGroup>
    </DropdownMenuContent>
  </DropdownMenu>
);

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/menu)
 */
export const Menu = React.forwardRef(MenuPrimitive);

Menu.displayName = 'Menu';
