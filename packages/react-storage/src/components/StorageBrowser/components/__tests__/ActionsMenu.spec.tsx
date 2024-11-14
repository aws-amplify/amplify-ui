import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ActionsMenu, ActionsMenuProps } from '../ActionsMenu';

const onClick = jest.fn();
const props: ActionsMenuProps = { data: [{ children: 'Fun!', onClick }] };

describe('ActionsMenu', () => {
  beforeEach(() => {
    onClick.mockClear();
  });

  it('toggles the menu open and closed', async () => {
    const user = userEvent.setup();

    const { getByTestId } = render(<ActionsMenu {...props} />);

    // initial
    expect(getByTestId('ACTIONS_MENU_LIST').className).toBe(
      'storage-browser__actions-menu-list'
    );

    const toggle = getByTestId('ACTIONS_MENU_TOGGLE');

    await waitFor(async () => {
      await user.click(toggle);
    });

    // open
    expect(getByTestId('ACTIONS_MENU_LIST').className).toBe(
      'storage-browser__actions-menu-list storage-browser__actions-menu-list--open'
    );

    await waitFor(async () => {
      await user.click(toggle);
    });

    // closed
    expect(getByTestId('ACTIONS_MENU_LIST').className).toBe(
      'storage-browser__actions-menu-list'
    );
  });

  it('calls handler provided in `data` on click', async () => {
    const user = userEvent.setup();

    const { getByTestId, getByText } = render(<ActionsMenu {...props} />);

    const toggle = getByTestId('ACTIONS_MENU_TOGGLE');

    await waitFor(async () => {
      await user.click(toggle);
    });

    const menuItem = getByText('Fun!');

    await waitFor(async () => {
      await user.click(menuItem);
    });

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
