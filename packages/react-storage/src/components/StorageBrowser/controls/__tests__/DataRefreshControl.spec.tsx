import React from 'react';
import { render, screen } from '@testing-library/react';
import { useResolvedComposable } from '../hooks/useResolvedComposable';
import { useDataRefresh } from '../hooks/useDataRefresh';
import { DataRefreshControl } from '../DataRefreshControl';

jest.mock('../hooks/useDataRefresh');
jest.mock('../hooks/useResolvedComposable');

describe('DataRefreshControl', () => {
  // assert mocks
  const mockUseDataRefresh = useDataRefresh as jest.Mock;
  const mockUseResolvedComposable = useResolvedComposable as jest.Mock;

  beforeAll(() => {
    mockUseResolvedComposable.mockImplementation(
      (component: React.JSX.Element) => component
    );
  });

  afterEach(() => {
    mockUseDataRefresh.mockReset();
    mockUseResolvedComposable.mockClear();
  });

  it('renders with button enabled', () => {
    mockUseDataRefresh.mockReturnValue({
      props: {
        disabled: false,
        onClick: jest.fn(),
      },
    });

    render(<DataRefreshControl />);

    const button = screen.getByRole('button', {
      name: 'Refresh data',
    });

    const icon = button.querySelector('svg');

    expect(button).toBeInTheDocument();
    expect(button).not.toHaveAttribute('disabled');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders with button disabled', () => {
    mockUseDataRefresh.mockReturnValue({
      isDisabled: true,
      onRefresh: jest.fn(),
    });

    render(<DataRefreshControl />);

    const button = screen.getByRole('button', {
      name: 'Refresh data',
    });

    const icon = button.querySelector('svg');

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('disabled');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });
});
