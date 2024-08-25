import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { ActionsMenuControl } from '../ActionsMenu';
import { ControlProvider } from '../../../../context/controls';
import { CLASS_BASE } from '../../../constants';

describe('ActionsMenuControl', () => {
  it('renders a `ActionsMenuControl`', () => {
    render(
      <ControlProvider actions={{}}>
        <ActionsMenuControl />
      </ControlProvider>
    );
    const toggle = screen.getByRole('button', { name: 'Actions' });
    const menu = screen.getByRole('menu', {
      name: 'Actions',
    });
    expect(menu).toBeInTheDocument();
    expect(toggle).toBeInTheDocument();
  });

  it('applies correct classes when toggled', () => {
    render(
      <ControlProvider actions={{}}>
        <ActionsMenuControl />
      </ControlProvider>
    );
    const toggle = screen.getByRole('button', { name: 'Actions' });
    const menu = screen.getByRole('menu', {
      name: 'Actions',
    });

    fireEvent.click(toggle);
    expect(menu.classList).toContain(`${CLASS_BASE}__actions-menu__menu--open`);
  });
});
