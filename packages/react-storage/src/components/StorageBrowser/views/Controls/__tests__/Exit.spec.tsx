import React from 'react';
import { render, screen } from '@testing-library/react';
import { ExitControl } from '../Exit';

describe('ExitControl', () => {
  it('renders the ExitControl', () => {
    render(<ExitControl />);

    const button = screen.getByRole('button', {
      name: 'Exit',
    });

    expect(button).toBeInTheDocument();
  });
});
