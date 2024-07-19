import React from 'react';
import { render, screen } from '@testing-library/react';
import { NavigateControl } from '../';

describe('NavigateControl', () => {
  it('renders the NavigateControl', async () => {
    // const items = [
    //   { label: 'Home' },
    //   { label: 'SomeLocation' },
    //   { label: 'Some folder' },
    // ];

    render(<NavigateControl />);

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
