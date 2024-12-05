import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { DropdownMenu } from '../DropdownMenu';

describe('DropdownMenu', () => {
  const menuItem1 = { id: 'id-1', label: 'Menu item 1' };
  const menuItem2 = { id: 'id-2', label: 'Menu item 2' };
  const menuItems = [menuItem1, menuItem2];
  const mockOnItemSelect = jest.fn();

  afterEach(() => {
    mockOnItemSelect.mockClear();
  });

  it('renders', () => {
    render(<DropdownMenu items={menuItems} />);

    const menu = screen.getByRole('menu');
    const [item1, item2] = screen.getAllByRole('menuitem');

    expect(menu).toBeInTheDocument();
    expect(item1).toHaveTextContent(menuItem1.label);
    expect(item2).toHaveTextContent(menuItem2.label);
  });

  it('can be opened', () => {
    render(<DropdownMenu items={menuItems} />);

    const button = screen.getByRole('button');
    const menu = screen.getByRole('menu');

    expect(menu.getAttribute('class')).not.toContain('open');

    act(() => {
      button.click();
    });

    expect(menu.getAttribute('class')).toContain('open');
  });

  it('can be disabled', () => {
    render(<DropdownMenu items={menuItems} isDisabled />);

    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
  });

  describe('MenuItems', () => {
    it('can be disabled', () => {
      render(<DropdownMenu items={[{ ...menuItem1, isDisabled: true }]} />);

      const item = screen.getByRole('menuitem');

      expect(item).toBeDisabled();
    });

    it('does not render if hidden', () => {
      render(
        <DropdownMenu items={[menuItem1, { ...menuItem2, isHidden: true }]} />
      );

      const items = screen.getAllByRole('menuitem');

      expect(items).toHaveLength(1);
    });

    it('calls onItemSelect', () => {
      render(
        <DropdownMenu items={menuItems} onItemSelect={mockOnItemSelect} />
      );

      const [item1, item2] = screen.getAllByRole('menuitem');

      act(() => {
        item1.click();
        item2.click();
      });

      expect(mockOnItemSelect).toHaveBeenNthCalledWith(1, menuItem1.id);
      expect(mockOnItemSelect).toHaveBeenNthCalledWith(2, menuItem2.id);
    });
  });
});
