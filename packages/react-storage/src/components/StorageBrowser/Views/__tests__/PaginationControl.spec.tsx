import React from 'react';
import { render, screen } from '@testing-library/react';
import { PaginationControl } from '../';

describe('PaginationControl', () => {
  it('renders the PaginationControl', async () => {
    render(<PaginationControl />);

    const nav = screen.getByRole('navigation', {
      name: 'Pagination',
    });

    const list = screen.getByRole('list');

    expect(nav).toBeInTheDocument();
    expect(list).toBeInTheDocument();
  });
});
