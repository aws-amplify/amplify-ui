import React from 'react';
import { render, screen } from '@testing-library/react';
import { EmptyMessageControl } from '../EmptyMessage';

describe('EmptyMessageControl', () => {
  it('renders the EmptyMessageControl', () => {
    render(<EmptyMessageControl />);

    const title = screen.getByText('No items to show.');
    expect(title).toBeInTheDocument();
  });
});
