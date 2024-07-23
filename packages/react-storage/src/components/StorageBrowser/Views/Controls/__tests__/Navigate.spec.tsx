import React from 'react';
import { render, screen } from '@testing-library/react';

import { ControlProvider } from '../../../context/controls';

import { NavigateControl } from '../Navigate';

describe('NavigateControl', () => {
  it('renders the NavigateControl', () => {
    render(
      <ControlProvider>
        <NavigateControl />
      </ControlProvider>
    );

    const nav = screen.getByRole('navigation', {
      name: 'Breadcrumbs',
    });

    const list = screen.getByRole('list');

    expect(nav).toBeInTheDocument();
    expect(list).toBeInTheDocument();
  });
});
