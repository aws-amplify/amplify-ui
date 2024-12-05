import React from 'react';
import { render, screen } from '@testing-library/react';
import { SearchSubfoldersToggleControl } from '../SearchSubfoldersToggleControl';
import { useSearchSubfoldersToggle } from '../hooks/useSearchSubfoldersToggle';
import { useResolvedComposable } from '../hooks/useResolvedComposable';

jest.mock('../hooks/useSearchSubfoldersToggle');
jest.mock('../hooks/useResolvedComposable');
jest.mock('../../composables/SearchSubfoldersToggle', () => ({
  SearchSubfoldersToggle: () => <div data-testid="search-subfolders-toggle" />,
}));

describe('SearchSubfoldersToggleControl', () => {
  const mockUseSearchSubfoldersToggle = jest.mocked(useSearchSubfoldersToggle);
  const mockUseResolvedComposable = jest.mocked(useResolvedComposable);

  beforeAll(() => {
    mockUseResolvedComposable.mockImplementation(
      (component) => component as () => React.JSX.Element
    );
  });

  afterEach(() => {
    mockUseSearchSubfoldersToggle.mockClear();
  });

  it('renders', () => {
    render(<SearchSubfoldersToggleControl />);

    const searchSubfoldersToggle = screen.getByTestId(
      'search-subfolders-toggle'
    );

    expect(searchSubfoldersToggle).toBeInTheDocument();
  });
});
