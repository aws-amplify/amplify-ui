import React from 'react';
import { render, screen } from '@testing-library/react';
import { SearchControl } from '../';

describe('SearchControl', () => {
  it('renders the SearchControl', () => {
    render(<SearchControl />);

    const searchButton = screen.getByRole('button');

    expect(searchButton).toBeInTheDocument();
  });
});
