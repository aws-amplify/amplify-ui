import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoadingIndicatorControl } from '../LoadingIndicatorControl';
import { useLoadingIndicator } from '../hooks/useLoadingIndicator';
import { useResolvedComposable } from '../hooks/useResolvedComposable';

jest.mock('../hooks/useLoadingIndicator');
jest.mock('../hooks/useResolvedComposable');
jest.mock('../../composables/LoadingIndicator', () => ({
  LoadingIndicator: () => <div data-testid="loading-indicator" />,
}));

describe('LoadingIndicatorControl', () => {
  const mockUseLoadingIndicator = jest.mocked(useLoadingIndicator);
  const mockUseResolvedComposable = jest.mocked(useResolvedComposable);

  beforeAll(() => {
    mockUseResolvedComposable.mockImplementation(
      (component) => component as () => React.JSX.Element
    );
  });

  afterEach(() => {
    mockUseLoadingIndicator.mockClear();
  });

  it('renders', () => {
    render(<LoadingIndicatorControl />);

    const loadingIndicator = screen.getByTestId('loading-indicator');

    expect(loadingIndicator).toBeInTheDocument();
  });
});
