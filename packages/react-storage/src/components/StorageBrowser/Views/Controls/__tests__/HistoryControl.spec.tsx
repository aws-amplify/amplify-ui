import React from 'react';
import { render, screen } from '@testing-library/react';
import { HistoryControl } from '../../Controls';

describe('HistoryControl', () => {
  it('renders the HistoryControl', async () => {
    const items = [
      { label: 'Home' },
      { label: 'SomeLocation' },
      { label: 'Some folder' },
    ];

    render(<HistoryControl items={items} />);

    const nav = screen.getByRole('navigation', {
      name: 'Breadcrumbs',
    });

    const list = screen.getByRole('list');

    const listItems = await screen.findAllByRole('listitem');

    expect(nav).toBeInTheDocument();
    expect(list).toBeInTheDocument();
    expect(listItems).toHaveLength(3);
  });
});
