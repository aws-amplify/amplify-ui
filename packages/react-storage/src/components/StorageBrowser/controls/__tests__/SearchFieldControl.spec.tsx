import React from 'react';
import { render, screen } from '@testing-library/react';
import { SearchFieldControl } from '../SearchFieldControl';
import { useSearchField } from '../hooks/useSearchField';
import { useResolvedComposable } from '../hooks/useResolvedComposable';

jest.mock('../hooks/useSearchField');
jest.mock('../hooks/useResolvedComposable');
jest.mock('../../composables/SearchField', () => ({
  SearchField: () => <div data-testid="search-field" />,
}));

describe('SearchFieldControl', () => {
  const mockUseSearchField = jest.mocked(useSearchField);
  const mockUseResolvedComposable = jest.mocked(useResolvedComposable);

  beforeAll(() => {
    mockUseResolvedComposable.mockImplementation(
      (component) => component as () => React.JSX.Element
    );
  });

  afterEach(() => {
    mockUseSearchField.mockClear();
  });

  it('renders', () => {
    render(<SearchFieldControl />);

    const searchField = screen.getByTestId('search-field');

    expect(searchField).toBeInTheDocument();
  });
});
