import * as React from 'react';
import classNames from 'classnames';
import * as Dropdown from '@radix-ui/react-dropdown-menu';

import { ComponentClassNames } from '../shared/constants';
import { MenuButton } from './MenuButton';
import { MenuItemProps } from '../types';

// Radix packages don't support ESM in Node, in some scenarios(e.g. SSR),
// the module will be imported as CommonJS module, in which we have to reference the `default`
let sanitizedDropdown = { default: undefined, ...Dropdown };
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
sanitizedDropdown = sanitizedDropdown.default ?? sanitizedDropdown;
const { DropdownMenuItem } = sanitizedDropdown;

export const MENU_ITEM_TEST_ID = 'amplify-menu-item-test-id';

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/menu)
 */
export const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <DropdownMenuItem asChild ref={ref}>
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
  }
);

MenuItem.displayName = 'MenuItem';
