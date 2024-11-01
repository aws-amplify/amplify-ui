import React from 'react';
import { render, screen } from '@testing-library/react';
import { SearchControl } from '../SearchControl';
import { useSearch } from '../hooks/useSearch';
import { useResolvedComposable } from '../hooks/useResolvedComposable';

jest.mock('../hooks/useSearch');
jest.mock('../hooks/useResolvedComposable');

describe('SearchControl', () => {
  // assert mocks
  const mockUseSearch = useSearch as jest.Mock;
  const mockUseResolvedComposable = useResolvedComposable as jest.Mock;

  beforeAll(() => {
    mockUseResolvedComposable.mockImplementation(
      (component: React.JSX.Element) => component
    );
  });

  afterEach(() => {
    mockUseSearch.mockReset();
    mockUseResolvedComposable.mockReset();
  });

  it('renders the SearchControl', () => {
    mockUseSearch.mockReturnValue({
      handleSearch: jest.fn(),
      filteredItems: [],
      searchTerm: '',
    });

    render(<SearchControl />);

    const field = screen.getByPlaceholderText('Search current folder');
    const checkbox = screen.getByRole('checkbox');
    const button = screen.getByRole('button', { name: 'Submit' });

    expect(button).toBeInTheDocument();
    expect(field).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
  });
});
