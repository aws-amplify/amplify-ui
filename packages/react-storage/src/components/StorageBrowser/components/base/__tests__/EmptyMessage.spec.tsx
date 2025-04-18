import React from 'react';
import { render, screen } from '@testing-library/react';

import { EmptyMessage } from '../EmptyMessage';

describe('EmptyMessage', () => {
  it('renders', () => {
    const message = 'I only wanted to be part of something';
    render(<EmptyMessage>{message}</EmptyMessage>);

    const emptyMessage = screen.getByText(message);

    expect(emptyMessage).toBeInTheDocument();
  });
});
