import React from 'react';
import { render, screen } from '@testing-library/react';
import { EmptyMessageControl } from '../EmptyMessage';

describe('EmptyMessageControl', () => {
  it('renders the EmptyMessageControl', () => {
    const message = 'No items to show.';
    render(<EmptyMessageControl>{message}</EmptyMessageControl>);

    const title = screen.getByText(message);
    expect(title).toBeInTheDocument();
  });
});
