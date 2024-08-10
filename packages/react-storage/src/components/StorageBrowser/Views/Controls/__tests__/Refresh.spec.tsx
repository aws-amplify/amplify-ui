import React from 'react';
import { render, screen } from '@testing-library/react';
import { RefreshControl } from '../Refresh';
import { ControlProvider } from '../../../context/controls';

describe('RefreshControl', () => {
  it('renders the RefreshControl', () => {
    render(
      <ControlProvider>
        <RefreshControl />
      </ControlProvider>
    );

    const button = screen.getByRole('button', {
      name: 'Refresh table',
    });

    const icon = button.querySelector('svg');

    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });
});
