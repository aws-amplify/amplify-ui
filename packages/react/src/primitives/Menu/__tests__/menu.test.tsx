import * as React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
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

    it('should render by default a menu that can be expanded on keyboard press', async () => {
      render(
        <Menu>
          <MenuItem>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
          <MenuItem>Option 3</MenuItem>
        </Menu>
      );

      await waitFor(async () => {
        const menuButton = await screen.findByTestId(MENU_TRIGGER_TEST_ID);

        menuButton.dispatchEvent(
          new KeyboardEvent('keydown', {
            bubbles: true,
            key: 'Enter',
          })
        );

        expect(menuButton).toHaveAttribute('data-state', 'open');
        expect(screen.queryByText('Option 1')).toBeVisible();

        const openMenuButton = await screen.findByTestId(MENU_TRIGGER_TEST_ID);
        openMenuButton.dispatchEvent(
          new KeyboardEvent('keydown', {
            bubbles: true,
            key: 'Enter',
          })
        );

        expect(openMenuButton).toHaveAttribute('data-state', 'closed');
        expect(screen.queryByText('Option 1')).toBeNull();
      });
    });

    it('should add `disabled` to an html element passed as trigger with `disabled` prop', async () => {
      render(
        <Menu trigger={<button disabled={true} id={MENU_TRIGGER_TEST_ID} />}>
          <MenuItem>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
          <MenuItem>Option 3</MenuItem>
        </Menu>
      );

      const disabled = await screen.findByRole('button');
      // Native html elements should only have the `disabled` attribute
      expect(disabled).toHaveAttribute('disabled');
    });

    it('should add disabled classnames to an Amplify UI component passed as trigger with `isDisabled` prop', async () => {
      render(
        <div style={{ pointerEvents: 'auto' }}>
          <Menu
            trigger={
              <MenuButton isDisabled={true} testId={MENU_TRIGGER_TEST_ID} />
            }
          >
            <MenuItem>Option 1</MenuItem>
            <MenuItem>Option 2</MenuItem>
            <MenuItem>Option 3</MenuItem>
          </Menu>
        </div>
      );
      const disabled = await screen.findByTestId(MENU_TRIGGER_TEST_ID);
      expect(disabled).toHaveClass('amplify-button--disabled');
      expect(disabled).toHaveAttribute('disabled');
    });

    it('should add disabled classnames to an Amplify UI component passed as trigger with `disabled` prop', async () => {
      render(
        <div style={{ pointerEvents: 'auto' }}>
          <Menu
            trigger={
              <MenuButton disabled={true} testId={MENU_TRIGGER_TEST_ID} />
            }
          >
            <MenuItem>Option 1</MenuItem>
            <MenuItem>Option 2</MenuItem>
            <MenuItem>Option 3</MenuItem>
          </Menu>
        </div>
      );
      const disabled = await screen.findByTestId(MENU_TRIGGER_TEST_ID);
      expect(disabled).toHaveClass('amplify-button--disabled');
      expect(disabled).toHaveAttribute('disabled');
    });

    it('should prevent keyboard events with the `disabled` prop', async () => {
      render(
        <Menu
          trigger={<MenuButton disabled={true} testId={MENU_TRIGGER_TEST_ID} />}
        >
          <MenuItem>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
          <MenuItem>Option 3</MenuItem>
        </Menu>
      );

      await waitFor(async () => {
        const disabled = await screen.findByTestId(MENU_TRIGGER_TEST_ID);
        disabled.dispatchEvent(
          new KeyboardEvent('keydown', {
            bubbles: true,
            key: 'Enter',
          })
        );
        expect(disabled).toHaveAttribute('data-state', 'closed');
        expect(screen.queryByText('Option 1')).toBeNull();
      });
    });

    it('should prevent keyboard events with `isDisabled` prop', async () => {
      render(
        <div style={{ pointerEvents: 'auto' }}>
          <Menu
            trigger={
              <MenuButton isDisabled={true} testId={MENU_TRIGGER_TEST_ID} />
            }
          >
            <MenuItem>Option 1</MenuItem>
            <MenuItem>Option 2</MenuItem>
            <MenuItem>Option 3</MenuItem>
          </Menu>
        </div>
      );
      await waitFor(async () => {
        const disabled = await screen.findByTestId(MENU_TRIGGER_TEST_ID);

        disabled.dispatchEvent(
          new KeyboardEvent('keydown', {
            bubbles: true,
            key: 'Enter',
          })
        );
        expect(disabled).toHaveAttribute('data-state', 'closed');
        expect(screen.queryByText('Option 1')).toBeNull();
      });
    });

    it('should prevent keyboard events with `disabled` prop when menu is open', async () => {
      render(
        <div style={{ pointerEvents: 'auto' }}>
          <Menu
            isOpen
            trigger={
              <MenuButton disabled={true} testId={MENU_TRIGGER_TEST_ID} />
            }
          >
            <MenuItem>Option 1</MenuItem>
            <MenuItem>Option 2</MenuItem>
            <MenuItem>Option 3</MenuItem>
          </Menu>
        </div>
      );
      await waitFor(async () => {
        const disabled = await screen.findByTestId(MENU_TRIGGER_TEST_ID);

        disabled.dispatchEvent(
          new KeyboardEvent('keydown', {
            bubbles: true,
            key: 'Enter',
          })
        );
        expect(disabled).toHaveAttribute('data-state', 'open');
        expect(screen.queryByText('Option 1')).toBeVisible();
      });
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
  });
});
