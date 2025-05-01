import React from 'react';
import { render, screen } from '@testing-library/react';
import { SortHeader } from '../../../DataTable/headers/SortHeader';

describe('SortHeader', () => {
  it('renders', () => {
    const { container } = render(
      <SortHeader content={{ label: 'Header-sort', onSort: jest.fn() }} />
    );

    const sortHeader = screen.getByRole('button');
    const svg = container.querySelector('svg');

    expect(sortHeader).toBeInTheDocument();
    expect(svg).toBeInTheDocument();
    expect(sortHeader).toHaveTextContent('Header-sort');
  });

  it('can be sorted', () => {
    const mockOnSort = jest.fn();
    render(<SortHeader content={{ onSort: mockOnSort }} />);

    const sortHeader = screen.getByRole('button');
    sortHeader.click();

    expect(mockOnSort).toHaveBeenCalledTimes(1);
  });
});
