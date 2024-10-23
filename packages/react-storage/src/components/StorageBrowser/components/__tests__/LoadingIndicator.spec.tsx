import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoadingIndicator } from '../LoadingIndicator';

describe('LoadingIndicator', () => {
  it('renders', () => {
    render(<LoadingIndicator />);

    const indicator = screen.getByText('Loading');

    expect(indicator).toBeInTheDocument();
  });
});
