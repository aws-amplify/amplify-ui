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
    const listItems = await screen.findAllByRole('listitem');
    const nextButton = screen.getByRole('button', { name: 'Go to next page' });
    const prevButton = screen.getByRole('button', {
      name: 'Go to previous page',
    });

    expect(nextButton).toBeInTheDocument();
    expect(prevButton).toBeInTheDocument();
    expect(nav).toBeInTheDocument();
    expect(list).toBeInTheDocument();
    expect(listItems).toHaveLength(3);
  });
});
