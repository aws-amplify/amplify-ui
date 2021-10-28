import * as React from 'react';
import classNames from 'classnames';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from '@radix-ui/react-dropdown-menu';

import { ComponentClassNames } from '../shared/constants';
import { Flex } from '../Flex';
import { IconMenu } from '../Icon';
import { MenuButton } from './MenuButton';
import { MenuProps, MenuItemProps, Primitive } from '../types';

export interface Menu {
  (props: MenuProps): React.ReactComponentElement<any>;
}

export const Menu: Menu = ({
  ariaLabel,
  children,
  className,
  button = (
    <MenuButton className={ComponentClassNames.MenuTrigger}>
      <IconMenu size="large" />
    </MenuButton>
  ),
  onOpenChange,
  ...rest
}) => {
  return (
    <DropdownMenu onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild={true}>{button}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <Flex
          aria-label={ariaLabel}
          className={ComponentClassNames.MenuContent}
        >
          {children}
        </Flex>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const MenuItem: React.FC<MenuItemProps> = ({ children, ...rest }) => {
  return (
    <DropdownMenuItem asChild={true}>
      <MenuButton
        className={ComponentClassNames.MenuButton}
        variation="menu"
        {...rest}
      >
        {children}
      </MenuButton>
    </DropdownMenuItem>
  );
};
