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

export const MENU_TRIGGER_TEST_ID = 'amplify-menu-trigger-test-id';
export const MENU_ITEMS_GROUP_TEST_ID = 'amplify-menu-items-group-test-id';

export const Menu: Primitive<MenuProps, 'div'> = ({
  menuAlign = 'start',
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
          role="button"
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
    <DropdownMenuContent align={menuAlign}>
      <ButtonGroup
        className={classNames(ComponentClassNames.MenuContent, className)}
        testId={MENU_ITEMS_GROUP_TEST_ID}
        size={size}
        {...rest}
      >
        {children}
      </ButtonGroup>
    </DropdownMenuContent>
  </DropdownMenu>
);
