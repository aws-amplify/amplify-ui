import React from 'react';
import { render, screen } from '@testing-library/react';
import { DividerControl } from '../';

describe('DividerControl', () => {
  it('renders the DividerControl', () => {
    render(<DividerControl />);

    const divider = screen.getByRole('separator', { hidden: true });
    expect(divider).toBeInTheDocument();
  });
});
