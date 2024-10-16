import React from 'react';
import { render, screen } from '@testing-library/react';
import { SearchControl } from '../Search';

describe('SearchControl', () => {
  it('renders the SearchControl', () => {
    render(<SearchControl handleSearch={jest.fn()} />);

    const searchButton = screen.getByRole('button');

    expect(searchButton).toBeInTheDocument();
  });
});
