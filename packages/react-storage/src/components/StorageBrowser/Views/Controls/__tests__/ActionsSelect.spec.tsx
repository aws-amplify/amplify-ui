import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { ActionSelectControl } from '../ActionSelect';
import { ControlProvider } from '../../../context/controls';
import { CLASS_BASE } from '../../constants';

describe('ActionSelectControl', () => {
  it('renders a `ActionSelectControl`', () => {
    render(
      <ControlProvider>
        <ActionSelectControl />
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
      <ControlProvider>
        <ActionSelectControl />
      </ControlProvider>
    );
    const toggle = screen.getByRole('button', { name: 'Actions' });
    const menu = screen.getByRole('menu', {
      name: 'Actions',
    });

    fireEvent.click(toggle);
    expect(menu.classList).toContain(`${CLASS_BASE}__action-menu__menu--open`);
  });
});
