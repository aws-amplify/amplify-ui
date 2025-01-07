import React from 'react';
import { render, screen } from '@testing-library/react';
import { LocationsView } from '../LocationsView';
import { useLocationsView } from '../useLocationsView';

jest.mock('../../../controls/DataRefreshControl', () => ({
  DataRefreshControl: () => <div data-testid="data-refresh-control" />,
}));
jest.mock('../../../controls/DataTableControl', () => ({
  DataTableControl: () => <div data-testid="data-table-control" />,
}));
jest.mock('../../../controls/LoadingIndicatorControl', () => ({
  LoadingIndicatorControl: () => (
    <div data-testid="loading-indicator-control" />
  ),
}));
jest.mock('../../../controls/MessageControl', () => ({
  MessageControl: () => <div data-testid="message-control" />,
}));
jest.mock('../../../controls/PaginationControl', () => ({
  PaginationControl: () => <div data-testid="pagination-control" />,
}));
jest.mock('../../../controls/SearchFieldControl', () => ({
  SearchFieldControl: () => <div data-testid="search-field-control" />,
}));
jest.mock('../../../controls/TitleControl', () => ({
  TitleControl: () => <div data-testid="title-control" />,
}));
jest.mock('../LocationsViewProvider', () => ({
  LocationsViewProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));
jest.mock('../useLocationsView');

describe('LocationsView', () => {
  const mockUseLocationsView = jest.mocked(useLocationsView);

  beforeEach(() => {
    // @ts-expect-error partial mock return value
    mockUseLocationsView.mockReturnValue({ hasError: false });
  });

  afterEach(() => {
    mockUseLocationsView.mockReset();
  });

  it('renders', () => {
    render(<LocationsView />);

    expect(screen.getByTestId('data-refresh-control')).toBeInTheDocument();
    expect(screen.getByTestId('data-table-control')).toBeInTheDocument();
    expect(screen.getByTestId('loading-indicator-control')).toBeInTheDocument();
    expect(screen.getByTestId('message-control')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-control')).toBeInTheDocument();
    expect(screen.getByTestId('search-field-control')).toBeInTheDocument();
    expect(screen.getByTestId('title-control')).toBeInTheDocument();
  });

  it('does not render content on error', () => {
    // @ts-expect-error partial mock return value
    mockUseLocationsView.mockReturnValue({ hasError: true });

    render(<LocationsView />);

    expect(screen.queryByTestId('data-table-control')).not.toBeInTheDocument();
  });
});
