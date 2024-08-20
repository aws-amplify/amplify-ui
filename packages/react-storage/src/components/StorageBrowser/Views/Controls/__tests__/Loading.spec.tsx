import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoadingControl } from '../Loading';

describe('LoadingControl', () => {
  it('renders the LoadingControl', () => {
    const text = 'Loading';
    render(<LoadingControl />);

    const loadingText = screen.getByText(text);

    expect(loadingText).toBeInTheDocument();
  });
});
