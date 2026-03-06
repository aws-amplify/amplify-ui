import React from 'react';
import { render, screen } from '@testing-library/react';
import { DataRefresh } from '../DataRefresh';

describe('DataRefresh', () => {
  it('renders', () => {
    render(<DataRefresh />);

    const button = screen.getByRole('button', {
      name: 'Refresh data',
    });

    const icon = button.querySelector('svg');

    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });
});
