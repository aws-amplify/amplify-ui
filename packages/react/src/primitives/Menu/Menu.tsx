import * as React from 'react';
import classNames from 'classnames';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuTriggerItem,
  DropdownMenuItem,
  DropdownMenuContent,
} from '@radix-ui/react-dropdown-menu';

import { ComponentClassNames } from '../shared/constants';
import { Flex } from '../Flex';
import { IconMenu } from '../Icon';
import { MenuButton } from './MenuButton';
import { MenuProps, MenuItemProps, Primitive } from '../types';

export const Menu: Primitive<MenuProps, 'div'> = ({
  align = 'start',
  children,
  className,
  isOpen,
  trigger,
  onOpenChange,
  ...rest
}) => (
  <DropdownMenu onOpenChange={onOpenChange} open={isOpen}>
    <DropdownMenuTrigger asChild={true}>
      {trigger ?? (
        <MenuButton className={ComponentClassNames.MenuTrigger}>
          <IconMenu size="large" />
        </MenuButton>
      )}
    </DropdownMenuTrigger>
    <DropdownMenuContent align={align}>
      <Flex className={ComponentClassNames.MenuContent} {...rest}>
        {children}
      </Flex>
    </DropdownMenuContent>
  </DropdownMenu>
);

export const MenuItem = React.forwardRef<
  HTMLDivElement,
  MenuItemProps & { children?: React.ReactNode }
>(({ children, ...rest }, ref) => {
  return (
    <DropdownMenuItem asChild={true} ref={ref}>
      <MenuButton
        className={ComponentClassNames.MenuButton}
        variation="menu"
        {...rest}
      >
        {children}
      </MenuButton>
    </DropdownMenuItem>
  );
});
