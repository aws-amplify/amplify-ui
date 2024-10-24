import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DataRefreshControl } from '../DataRefreshControl';

import * as useDataRefreshModule from '../hooks/useDataRefresh';

describe('DataRefreshControl', () => {
  const useDataRefreshSpy = jest.spyOn(useDataRefreshModule, 'useDataRefresh');

  afterEach(() => {
    useDataRefreshSpy.mockReset();
  });

  it('renders with button enabled', () => {
    const onRefreshMock = jest.fn();
    useDataRefreshSpy.mockReturnValue({
      isDisabled: false,
      onRefresh: onRefreshMock,
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

    fireEvent.click(button);
    expect(onRefreshMock).toHaveBeenCalled();
  });

  it('renders with button disabled', () => {
    useDataRefreshSpy.mockReturnValue({
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
