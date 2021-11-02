import classNames from 'classnames';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@radix-ui/react-dropdown-menu';

import { ButtonGroup } from '../ButtonGroup';
import { ComponentClassNames } from '../shared/constants';
import { IconMenu } from '../Icon';
import { MenuButton } from './MenuButton';
import { MenuProps, Primitive } from '../types';

export const Menu: Primitive<MenuProps, 'div'> = ({
  align = 'start',
  children,
  className,
  isOpen,
  size,
  trigger,
  triggerClassName,
  onOpenChange,
  ...rest
}) => (
  <DropdownMenu onOpenChange={onOpenChange} open={isOpen}>
    <DropdownMenuTrigger asChild={true}>
      {trigger ?? (
        <MenuButton
          size={size}
          className={classNames(
            ComponentClassNames.MenuTrigger,
            triggerClassName
          )}
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
