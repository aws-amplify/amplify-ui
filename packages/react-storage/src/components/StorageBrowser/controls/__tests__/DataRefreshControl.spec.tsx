import React from 'react';
import { render, screen } from '@testing-library/react';
import { DataRefreshControl } from '../DataRefreshControl';
import { useDataRefresh } from '../hooks/useDataRefresh';
import { useResolvedComposable } from '../hooks/useResolvedComposable';

jest.mock('../hooks/useDataRefresh');
jest.mock('../hooks/useResolvedComposable');
jest.mock('../../composables/DataRefresh', () => ({
  DataRefresh: () => <div data-testid="data-refresh" />,
}));

describe('DataRefreshControl', () => {
  const mockUseDataRefresh = jest.mocked(useDataRefresh);
  const mockUseResolvedComposable = jest.mocked(useResolvedComposable);

  beforeAll(() => {
    mockUseResolvedComposable.mockImplementation(
      (component) => component as () => React.JSX.Element
    );
  });

  afterEach(() => {
    mockUseDataRefresh.mockClear();
  });

  it('renders', () => {
    render(<DataRefreshControl />);

    const dataRefresh = screen.getByTestId('data-refresh');

    expect(dataRefresh).toBeInTheDocument();
  });
});
