import React from 'react';
import { render, screen } from '@testing-library/react';
import { ActionSelectControl } from '../ActionSelect';

describe('ActionSelectControl', () => {
  it('renders a `ActionSelectControl`', () => {
    render(<ActionSelectControl />);
    const toggle = screen.getByRole('button', { name: 'Actions' });
    const menu = screen.getByRole('menu', {
      name: 'Actions',
    });
    expect(menu).toBeInTheDocument();
    expect(toggle).toBeInTheDocument();
  });
});
