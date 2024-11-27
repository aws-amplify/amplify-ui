import React from 'react';
import { render, screen } from '@testing-library/react';
import { PaginationControl } from '../PaginationControl';
import { usePagination } from '../hooks/usePagination';
import { useResolvedComposable } from '../hooks/useResolvedComposable';

jest.mock('../hooks/usePagination');
jest.mock('../hooks/useResolvedComposable');
jest.mock('../../composables/Pagination', () => ({
  Pagination: () => <div data-testid="pagination" />,
}));

describe('PaginationControl', () => {
  const mockUsePagination = jest.mocked(usePagination);
  const mockUseResolvedComposable = jest.mocked(useResolvedComposable);

  beforeAll(() => {
    mockUseResolvedComposable.mockImplementation(
      (component) => component as () => React.JSX.Element
    );
  });

  afterEach(() => {
    mockUsePagination.mockClear();
  });

  it('renders', () => {
    render(<PaginationControl />);

    const pagination = screen.getByTestId('pagination');

    expect(pagination).toBeInTheDocument();
  });
});
