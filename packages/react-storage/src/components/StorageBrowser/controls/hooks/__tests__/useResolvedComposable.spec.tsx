import React from 'react';
import { render, renderHook, screen } from '@testing-library/react';

import { useResolvedComposable } from '../useResolvedComposable';
import { useComposables } from '../../../composables/context';

jest.mock('../../../composables/context');

describe('useResolvedComposable', () => {
  // assert mocks
  const mockUseComposables = useComposables as jest.Mock;

  beforeEach(() => {
    mockUseComposables.mockReturnValue({});
  });

  afterEach(() => {
    mockUseComposables.mockReset();
  });

  it('returns a default composable', () => {
    const DefaultStatusDisplay = () => 'DefaultStatusDisplay';
    const {
      result: { current: ResolvedStatusDisplay },
    } = renderHook(() =>
      useResolvedComposable(DefaultStatusDisplay, 'StatusDisplay')
    );

    render(<ResolvedStatusDisplay />);

    const component = screen.getByText('DefaultStatusDisplay');

    expect(component).toBeInTheDocument();
  });

  it('passes props through', () => {
    const inputTotal = 123;
    const DefaultStatusDisplay = ({ total }: { total: number }) =>
      `DefaultStatusDisplay ${total}`;
    const {
      result: { current: ResolvedStatusDisplay },
    } = renderHook(() =>
      useResolvedComposable(DefaultStatusDisplay, 'StatusDisplay')
    );

    render(<ResolvedStatusDisplay total={inputTotal} />);

    const component = screen.getByText(`DefaultStatusDisplay ${inputTotal}`);

    expect(component).toBeInTheDocument();
  });

  it('returns a custom composable', () => {
    const DefaultStatusDisplay = () => 'DefaultStatusDisplay';
    const CustomStatusDisplay = () => 'CustomStatusDisplay';

    mockUseComposables.mockReturnValue({
      composables: { StatusDisplay: CustomStatusDisplay },
    });

    const {
      result: { current: ResolvedStatusDisplay },
    } = renderHook(() =>
      useResolvedComposable(DefaultStatusDisplay, 'StatusDisplay')
    );

    render(<ResolvedStatusDisplay />);

    const defaultComponent = screen.queryByText('DefaultStatusDisplay');
    const customComponent = screen.getByText('CustomStatusDisplay');

    expect(defaultComponent).not.toBeInTheDocument();
    expect(customComponent).toBeInTheDocument();
  });
});
