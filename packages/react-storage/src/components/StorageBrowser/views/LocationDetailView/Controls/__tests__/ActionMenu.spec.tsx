import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import * as TempActions from '../../../../do-not-import-from-here/createTempActionsProvider';

import * as StoreModule from '../../../../providers/store';
import { CLASS_BASE } from '../../../constants';

import { ActionsMenuControl } from '../ActionsMenu';

const TEST_ACTIONS = {
  wild_crazy_guy: {
    options: { displayName: 'steve martin' },
  },
};

jest.spyOn(TempActions, 'useTempActions').mockReturnValue(TEST_ACTIONS);

const location = {
  id: 'an-id-👍🏼',
  bucket: 'test-bucket',
  permission: 'READWRITE' as const,
  prefix: 'test-prefix/',
  type: 'PREFIX' as const,
};
const dispatchStoreAction = jest.fn();
jest.spyOn(StoreModule, 'useStore').mockReturnValue([
  {
    locationItems: { fileDataItems: undefined },
    history: { current: location, previous: [location] },
  } as StoreModule.UseStoreState,
  dispatchStoreAction,
]);

describe('ActionsMenuControl', () => {
  afterEach(jest.clearAllMocks);

  it('renders a `ActionsMenuControl`', () => {
    const { getByRole } = render(<ActionsMenuControl />);
    const toggle = getByRole('button', { name: 'Actions' });
    const menu = getByRole('menu', { name: 'Actions' });

    expect(menu).toBeInTheDocument();
    expect(toggle).toBeInTheDocument();
  });

  it('applies correct classes when toggled', () => {
    const { getByRole } = render(<ActionsMenuControl />);
    const toggle = getByRole('button', { name: 'Actions' });
    const menu = getByRole('menu', { name: 'Actions' });

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
