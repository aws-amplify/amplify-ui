import React from 'react';
import { render, screen } from '@testing-library/react';
import { SearchControl } from '../SearchControl';
import { useResolvedComposable } from '../hooks/useResolvedComposable';
import { useControlsContext } from '../context';

jest.mock('../context');
jest.mock('../hooks/useResolvedComposable');

describe('SearchControl', () => {
  // assert mocks
  const mockUseControlsContext = useControlsContext as jest.Mock;
  const mockUseResolvedComposable = useResolvedComposable as jest.Mock;

  beforeAll(() => {
    mockUseResolvedComposable.mockImplementation(
      (component: React.JSX.Element) => component
    );
  });

  afterEach(() => {
    mockUseControlsContext.mockReset();
    mockUseResolvedComposable.mockReset();
  });

  it('renders the SearchControl with children', () => {
    mockUseControlsContext.mockReturnValue({
      data: { searchPlaceholder: 'Placeholder' },
      onSearch: jest.fn(),
    });

    render(
      <SearchControl>
        <input type="checkbox" />
      </SearchControl>
    );

    const field = screen.getByPlaceholderText('Placeholder');
    const checkbox = screen.getByRole('checkbox');
    const button = screen.getByRole('button', { name: 'Submit' });

    expect(button).toBeInTheDocument();
    expect(field).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
  });
});
