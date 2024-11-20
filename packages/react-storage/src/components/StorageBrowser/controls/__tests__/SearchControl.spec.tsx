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

  it('renders the SearchControl', () => {
    mockUseControlsContext.mockReturnValue({
      data: { searchPlaceholder: 'Placeholder', searchSubmitLabel: 'Submit' },
      onSearch: jest.fn(),
    });

    render(<SearchControl />);

    const field = screen.getByPlaceholderText('Placeholder');
    const button = screen.getByRole('button', { name: 'Submit' });

    expect(button).toBeInTheDocument();
    expect(field).toBeInTheDocument();
  });
});
