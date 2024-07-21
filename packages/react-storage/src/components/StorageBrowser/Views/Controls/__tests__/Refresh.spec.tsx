import React from 'react';
import { render, screen } from '@testing-library/react';
import { RefreshControl } from '../Refresh';

describe('RefreshControl', () => {
  it('renders the RefreshControl', () => {
    render(<RefreshControl />);

    const button = screen.getByRole('button', {
      name: 'Refresh table',
    });

    const icon = button.querySelector('svg');

    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });
});
