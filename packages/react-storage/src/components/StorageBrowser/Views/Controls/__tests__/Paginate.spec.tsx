import React from 'react';
import { render, screen } from '@testing-library/react';
import { PaginateControl } from '../Paginate';

import { ControlProvider } from '../../../context/controls';

describe('PaginationControl', () => {
  it('renders the PaginationControl', async () => {
    render(
      <ControlProvider>
        <PaginateControl />
      </ControlProvider>
    );

    const nav = screen.getByRole('navigation', {
      name: 'Pagination',
    });
    const list = screen.getByRole('list');
    const listItems = await screen.findAllByRole('listitem');
    const nextButton = screen.getByRole('button', { name: 'Go to next page' });
    const prevButton = screen.getByRole('button', {
      name: 'Go to previous page',
    });
    const nextIcon = nextButton.querySelector('svg');
    const prevIcon = nextButton.querySelector('svg');

    expect(nextButton).toBeInTheDocument();
    expect(prevButton).toBeInTheDocument();
    expect(nextIcon).toBeInTheDocument();
    expect(prevIcon).toBeInTheDocument();
    expect(nextIcon).toHaveAttribute('aria-hidden', 'true');
    expect(prevIcon).toHaveAttribute('aria-hidden', 'true');
    expect(nav).toBeInTheDocument();
    expect(list).toBeInTheDocument();
    expect(listItems).toHaveLength(3);
  });
});
