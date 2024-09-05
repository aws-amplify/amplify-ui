import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { ActionsMenuControl } from '../ActionsMenu';
import * as ControlModule from '../../../../context/control';
import { CLASS_BASE } from '../../../constants';

const TEST_ACTIONS = {
  wild_crazy_guy: { options: { displayName: 'steve martin' } },
};
const LOCATION_ACTIONS = [{ actions: TEST_ACTIONS, selected: {} }, jest.fn()];
const NAVIGATE = [{ location: { permission: 'whatever' } }, jest.fn()];

jest.spyOn(ControlModule, 'useControl').mockImplementation(
  (type) =>
    ({
      LOCATION_ACTIONS,
      NAVIGATE,
    })[type]
);

describe('ActionsMenuControl', () => {
  it('renders a `ActionsMenuControl`', () => {
    const { getByRole } = render(<ActionsMenuControl />);
    const toggle = getByRole('button', { name: 'Actions' });
    const menu = getByRole('menu', {
      name: 'Actions',
    });
    expect(menu).toBeInTheDocument();
    expect(toggle).toBeInTheDocument();
  });

  it('applies correct classes when toggled', () => {
    const { getByRole } = render(<ActionsMenuControl />);
    const toggle = getByRole('button', { name: 'Actions' });
    const menu = getByRole('menu', {
      name: 'Actions',
    });

    fireEvent.click(toggle);
    expect(menu.classList).toContain(`${CLASS_BASE}__actions-menu__menu--open`);
  });

  it('closes the menu on action select', () => {
    const { getByRole, getByText } = render(<ActionsMenuControl />);
    const toggle = getByRole('button', { name: 'Actions' });
    const menu = getByRole('menu', { name: 'Actions' });

    fireEvent.click(toggle);
    expect(menu.classList).toContain(`${CLASS_BASE}__actions-menu__menu--open`);

    const menuItem = getByText(TEST_ACTIONS.wild_crazy_guy.options.displayName);
    expect(menuItem).toBeInTheDocument();

    fireEvent.click(menuItem);

    expect(menu.classList).not.toContain(
      `${CLASS_BASE}__actions-menu__menu--open`
    );
  });
});
