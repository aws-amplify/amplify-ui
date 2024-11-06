import React from 'react';
import { render, screen } from '@testing-library/react';
import { useResolvedComposable } from '../hooks/useResolvedComposable';
import { useNavigation } from '../hooks/useNavigation';
import { NavigationControl } from '../NavigationControl';

jest.mock('../hooks/useNavigation');
jest.mock('../hooks/useResolvedComposable');

describe('NavigationControl', () => {
  // assert mocks
  const mockUseNavigation = jest.mocked(useNavigation);
  const mockUseResolvedComposable = jest.mocked(useResolvedComposable);
  // create mocks
  const mockOnNavigate = jest.fn();

  beforeAll(() => {
    mockUseResolvedComposable.mockImplementation(
      (component) => component as () => React.JSX.Element
    );
  });

  afterEach(() => {
    mockUseNavigation.mockReset();
    mockUseResolvedComposable.mockClear();
    mockOnNavigate.mockClear();
  });

  it('renders', () => {
    mockUseNavigation.mockReturnValue({
      items: [
        { name: 'Item 1', onNavigate: mockOnNavigate },
        { name: 'Item 2', onNavigate: mockOnNavigate, isCurrent: true },
      ],
    });

    render(<NavigationControl />);

    const [item1, item2] = screen.getAllByRole('listitem');

    expect(item1).toHaveTextContent('Item 1');
    expect(item2).toHaveTextContent('Item 2');
  });
});
