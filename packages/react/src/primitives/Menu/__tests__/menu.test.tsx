import * as React from 'react';
import { act, screen, render } from '@testing-library/react';

import { ComponentClassName } from '@aws-amplify/ui';
import { Menu, MENU_ITEMS_GROUP_TEST_ID, MENU_TRIGGER_TEST_ID } from '../Menu';
import { MenuButton } from '../MenuButton';
import { MenuItem, MENU_ITEM_TEST_ID } from '../MenuItem';

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
    expect(menuItemsGroup).toHaveClass(ComponentClassName.MenuContent);
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

  it('behaves as expected when disabled', async () => {
    const { rerender } = render(
      <Menu isDisabled={false}>
        <MenuItem>Option 1</MenuItem>
        <MenuItem>Option 2</MenuItem>
        <MenuItem isDisabled testId="disabled_option">
          Option 3
        </MenuItem>
      </Menu>
    );

    const menuTrigger = await screen.findByTestId(MENU_TRIGGER_TEST_ID);
    expect(menuTrigger).toHaveAttribute('data-state', 'closed');
    expect(screen.queryByTestId(MENU_ITEMS_GROUP_TEST_ID)).toBeNull();

    act(() => {
      // Using keydown event because of the specific way radix-ui handles click
      // https://github.com/radix-ui/primitives/blob/b32a93318cdfce383c2eec095710d35ffbd33a1c/packages/react/dropdown-menu/src/DropdownMenu.tsx#L127
      menuTrigger.dispatchEvent(
        new KeyboardEvent('keydown', { bubbles: true, key: 'Enter' })
      );
    });

    expect(menuTrigger).toHaveAttribute('data-state', 'open');
    expect(screen.queryByTestId(MENU_ITEMS_GROUP_TEST_ID)).not.toBeNull();

    rerender(
      <Menu isDisabled>
        <MenuItem>Option 1</MenuItem>
        <MenuItem>Option 2</MenuItem>
        <MenuItem isDisabled testId="disabled_option">
          Option 3
        </MenuItem>
      </Menu>
    );

    act(() => {
      menuTrigger.dispatchEvent(
        new KeyboardEvent('keydown', { bubbles: true, key: 'Enter' })
      );
    });

    expect(menuTrigger).toHaveAttribute('data-state', 'open');
    expect(screen.queryByTestId(MENU_ITEMS_GROUP_TEST_ID)).not.toBeNull();
  });

  describe('trigger', () => {
    it('should have default and custom classnames', async () => {
      const triggerClassName = 'trigger-class-test';

      render(<Menu triggerClassName={triggerClassName}></Menu>);

      const menuTrigger = await screen.findByTestId(MENU_TRIGGER_TEST_ID);

      expect(menuTrigger).toHaveClass(
        ComponentClassName.MenuTrigger,
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

      expect(menu).toHaveClass('amplify-button--large');
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
        ComponentClassName.MenuContent,
        className
      );
      expect(menuItems[0]).toHaveClass(
        ComponentClassName.MenuItem,
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

    it('should add the Amplify UI Button disabled class to when Menu is disabled', async () => {
      render(
        <Menu isOpen isDisabled>
          {/* Force open to test menu items */}
          <MenuItem>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
          <MenuItem testId="disabled_option">Option 3</MenuItem>
        </Menu>
      );

      const disabled = await screen.findByTestId('disabled_option');

      expect(disabled).toHaveClass('amplify-button--disabled');
    });

    it('should behave as expected when Menu is disabled', async () => {
      const clickHandler = jest.fn();
      const { rerender } = render(
        <Menu isOpen isDisabled={false}>
          <MenuItem>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
          <MenuItem testId="enabled_menu_item" onClick={clickHandler}>
            Option 3
          </MenuItem>
        </Menu>
      );

      const menuItem = await screen.findByTestId('enabled_menu_item');
      expect(menuItem).not.toHaveAttribute('disabled');
      expect(menuItem).not.toHaveClass('amplify-button--disabled');

      act(() => {
        menuItem.dispatchEvent(
          new KeyboardEvent('keydown', { bubbles: true, key: 'Enter' })
        );
      });

      expect(clickHandler).toHaveBeenCalledTimes(1);

      rerender(
        <Menu isOpen isDisabled>
          <MenuItem>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
          <MenuItem testId="enabled_menu_item" onClick={clickHandler}>
            Option 3
          </MenuItem>
        </Menu>
      );

      expect(menuItem).toHaveAttribute('disabled');
      expect(menuItem).toHaveClass('amplify-button--disabled');

      act(() => {
        menuItem.dispatchEvent(
          new KeyboardEvent('keydown', { bubbles: true, key: 'Enter' })
        );
      });

      expect(clickHandler).toHaveBeenCalledTimes(1); // Should not be called an additional time
    });
  });

  describe('menu button', () => {
    it('should add the Amplify UI Button disabled class to disabled MenuButton', async () => {
      const MENU_BUTTON_TEST_ID = 'amplify-menu-button-test-id';
      const clickHandler = jest.fn();
      const { rerender } = render(
        <MenuButton
          isDisabled={true}
          testId={MENU_BUTTON_TEST_ID}
          onClick={clickHandler}
        />
      );

      const menuButton = await screen.findByTestId(MENU_BUTTON_TEST_ID);

      expect(menuButton).toHaveAttribute('disabled');
      expect(menuButton).toHaveClass('amplify-button--disabled');
    });
  });
});
