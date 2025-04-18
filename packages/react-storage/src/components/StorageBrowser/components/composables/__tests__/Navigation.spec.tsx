import React from 'react';
import { render, screen } from '@testing-library/react';
import { Navigation } from '../Navigation';

describe('Navigation', () => {
  it('renders', () => {
    const item = 'Navigation item';
    const items = [
      { name: `${item} 1`, onNavigate: jest.fn() },
      { name: `${item} 2`, onNavigate: jest.fn(), isCurrent: true },
    ];

    render(<Navigation items={items} />);

    const listItems = screen.getAllByRole('listitem');

    expect(listItems[0]).toHaveTextContent(`${item} 1`);
    expect(listItems[1]).toHaveTextContent(`${item} 2`);
  });

  it('returns null if there are no navigation items', () => {
    render(<Navigation items={[]} />);

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });
});
