import * as React from 'react';
import { screen, render } from '@testing-library/react';

import { ComponentClassNames } from '../../shared';
import { Menu, MENU_ITEMS_GROUP_TEST_ID } from '../Menu';
import { MenuItem, MENU_ITEM_TEST_ID } from '../MenuItem';
import { MENU_TRIGGER_TEST_ID } from '../Menu';

// Needed because of the Radix Popper used by Menu
// https://github.com/radix-ui/primitives/blob/main/packages/react/popper/src/Popper.tsx#L127
const globalDOMRect = global.DOMRect;
// disable eslint for this mock due to complexity
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
global.DOMRect = {
  ...(global.DOMRect as any),
  fromRect: jest.fn().mockReturnValue({
    x: 200,
    y: 200,
    width: '200px',
    height: '200px',
    top: 300,
    left: 30,
  }),
};

// Source:
// https://github.com/radix-ui/primitives/blob/main/packages/react/checkbox/src/Checkbox.test.tsx#L10
const globalResizeObserver = global.ResizeObserver;
global.ResizeObserver = class ResizeObserver {
  cb: any;
  constructor(cb: any) {
    // disable eslint for this mock due to complexity
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.cb = cb;
  }
  observe() {
    // disable eslint for this mock due to complexity
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    this.cb([{ borderBoxSize: { inlineSize: 0, blockSize: 0 } }]);
  }
  unobserve() {}
  disconnect() {}
};

describe('Menu', () => {
  afterAll(() => {
    // restore globals
    global.DOMRect = globalDOMRect;
    global.ResizeObserver = globalResizeObserver;
  });

  it('should be uncontrolled by default', () => {
    render(
      <Menu>
        <MenuItem>Option 1</MenuItem>
        <MenuItem>Option 2</MenuItem>
        <MenuItem>Option 3</MenuItem>
      </Menu>
    );

    const menuItemsGroup = screen.queryByTestId(MENU_ITEMS_GROUP_TEST_ID);
    expect(menuItemsGroup).toBeNull();
  });

  it('should be openable (controlled)', () => {
    render(
      <Menu isOpen>
        <MenuItem>Option 1</MenuItem>
        <MenuItem>Option 2</MenuItem>
        <MenuItem>Option 3</MenuItem>
      </Menu>
    );

    const menuItemsGroup = screen.queryByTestId(MENU_ITEMS_GROUP_TEST_ID);
    expect(menuItemsGroup).toHaveClass(ComponentClassNames.MenuContent);
  });

  it('should be closable (controlled)', () => {
    render(
      <Menu isOpen={false}>
        <MenuItem>Option 1</MenuItem>
        <MenuItem>Option 2</MenuItem>
        <MenuItem>Option 3</MenuItem>
      </Menu>
    );

    const menuItemsGroupClosed = screen.queryByTestId(MENU_ITEMS_GROUP_TEST_ID);
    expect(menuItemsGroupClosed).toBeNull();
  });

  describe('trigger', () => {
    it('should have default and custom classnames', async () => {
      const triggerClassName = 'trigger-class-test';

      render(<Menu triggerClassName={triggerClassName}></Menu>);

      const menuTrigger = await screen.findByTestId(MENU_TRIGGER_TEST_ID);

      expect(menuTrigger).toHaveClass(
        ComponentClassNames.MenuTrigger,
        triggerClassName
      );
    });

    it('should forward ref to DOM element', async () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Menu ref={ref} isOpen></Menu>);

      await screen.findByTestId(MENU_ITEMS_GROUP_TEST_ID);
      expect(ref.current?.nodeName).toBe('DIV');
    });

    it('should set size attribute', async () => {
      render(<Menu size="large" />);
      const menu = await screen.findByTestId(MENU_TRIGGER_TEST_ID);

      expect(menu).toHaveAttribute('data-size', 'large');
    });
  });

  describe('items', () => {
    it('should have default and custom classnames', async () => {
      const className = 'class-test';
      const menuItem1ClassName = 'menu-item-1';
      render(
        <Menu className={className} isOpen>
          {/* Force open to test menu items */}
          <MenuItem className={menuItem1ClassName}>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
          <MenuItem>Option 3</MenuItem>
        </Menu>
      );
      const menuItemsGroup = await screen.findByTestId(
        MENU_ITEMS_GROUP_TEST_ID
      );
      const menuItems = await screen.findAllByTestId(MENU_ITEM_TEST_ID);

      expect(menuItemsGroup).toHaveClass(
        ComponentClassNames.MenuContent,
        className
      );
      expect(menuItems[0]).toHaveClass(
        ComponentClassNames.MenuItem,
        menuItem1ClassName
      );
    });

    it('should add the Amplify UI Button disabled class to disabled MenuItems', async () => {
      render(
        <Menu isOpen>
          {/* Force open to test menu items */}
          <MenuItem>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
          <MenuItem isDisabled testId="disabled_option">
            Option 3
          </MenuItem>
        </Menu>
      );

      const disabled = await screen.findByTestId('disabled_option');

      expect(disabled).toHaveClass('amplify-button--disabled');
    });
  });
});
