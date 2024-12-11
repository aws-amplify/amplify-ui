import React from 'react';
import { render, screen } from '@testing-library/react';
import { NavigationControl } from '../NavigationControl';
import { useNavigation } from '../hooks/useNavigation';
import { useResolvedComposable } from '../hooks/useResolvedComposable';

jest.mock('../hooks/useNavigation');
jest.mock('../hooks/useResolvedComposable');
jest.mock('../../composables/Navigation', () => ({
  Navigation: () => <div data-testid="navigation" />,
}));

describe('NavigationControl', () => {
  const mockUseNavigation = jest.mocked(useNavigation);
  const mockUseResolvedComposable = jest.mocked(useResolvedComposable);

  beforeAll(() => {
    mockUseResolvedComposable.mockImplementation(
      (component) => component as () => React.JSX.Element
    );
  });

  afterEach(() => {
    mockUseNavigation.mockClear();
  });

  it('renders', () => {
    render(<NavigationControl />);

    const navigation = screen.getByTestId('navigation');

    expect(navigation).toBeInTheDocument();
  });
});
