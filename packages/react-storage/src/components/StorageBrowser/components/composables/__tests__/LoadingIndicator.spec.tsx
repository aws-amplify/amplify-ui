import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoadingIndicator } from '../LoadingIndicator';

const label = 'Loading!';

describe('LoadingIndicator', () => {
  it('renders when isLoading is true', () => {
    render(<LoadingIndicator isLoading label="Loading!" />);

    const loadingSpan = screen.getByText(label);
    expect(loadingSpan).toBeInTheDocument();
    expect(loadingSpan).toHaveAttribute('aria-live', 'polite');
  });

  it('does not render when isLoading is false', () => {
    render(<LoadingIndicator isLoading={false} label="Loading!" />);

    const loadingSpan = screen.queryByText(label);
    expect(loadingSpan).not.toBeInTheDocument();
  });
});
