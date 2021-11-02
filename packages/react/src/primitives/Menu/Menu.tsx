import classNames from 'classnames';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@radix-ui/react-dropdown-menu';

import { ComponentClassNames } from '../shared/constants';
import { IconMenu } from '../Icon';
import { MenuButton } from './MenuButton';
import { MenuProps, Primitive } from '../types';
import { ButtonGroup } from '../ButtonGroup';

export const Menu: Primitive<MenuProps, 'div'> = ({
  align = 'start',
  children,
  className,
  isOpen,
  size,
  trigger,
  onOpenChange,
  ...rest
}) => (
  <DropdownMenu onOpenChange={onOpenChange} open={isOpen}>
    <DropdownMenuTrigger asChild={true}>
      {trigger ?? (
        <MenuButton
          size={size}
          className={classNames(ComponentClassNames.MenuTrigger)}
        >
          <IconMenu size={size} />
        </MenuButton>
      )}
    </DropdownMenuTrigger>
    <DropdownMenuContent align={align}>
      <ButtonGroup
        className={classNames(ComponentClassNames.Menu, className)}
        size={size}
        {...rest}
      >
        {children}
      </ButtonGroup>
    </DropdownMenuContent>
  </DropdownMenu>
);
