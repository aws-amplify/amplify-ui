import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoadingIndicatorControl } from '../LoadingIndicatorControl';
import * as UseLoadingIndicatorModule from '../hooks/useLoadingIndicator';

const label = 'Spinning probably';

const useLoadingIndicatorSpy = jest.spyOn(
  UseLoadingIndicatorModule,
  'useLoadingIndicator'
);

describe('LoadingIndicatorControl', () => {
  beforeEach(() => {
    useLoadingIndicatorSpy.mockClear();
  });

  it('renders', () => {
    useLoadingIndicatorSpy.mockReturnValue({ isLoading: true, label });

    render(<LoadingIndicatorControl />);

    const span = screen.getByText(label);

    expect(span).toBeInTheDocument();
  });
});
