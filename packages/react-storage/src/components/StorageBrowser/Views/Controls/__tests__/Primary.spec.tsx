import React from 'react';
import { render, screen } from '@testing-library/react';
import { PrimaryControl } from '../Primary';

describe('PrimaryControl', () => {
  it('renders the PrimaryControl', () => {
    render(<PrimaryControl />);

    const button = screen.getByRole('button', {
      name: 'Start',
    });

    expect(button).toBeInTheDocument();
  });
});
