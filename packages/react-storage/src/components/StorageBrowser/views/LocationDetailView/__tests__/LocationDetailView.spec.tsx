import React from 'react';
import { render, screen } from '@testing-library/react';
import { LocationDetailView } from '../LocationDetailView';
import { useLocationDetailView } from '../useLocationDetailView';

jest.mock('../../../controls/ActionsListControl', () => ({
  ActionsListControl: () => <div data-testid="actions-list-control" />,
}));
jest.mock('../../../controls/DataRefreshControl', () => ({
  DataRefreshControl: () => <div data-testid="data-refresh-control" />,
}));
jest.mock('../../../controls/DataTableControl', () => ({
  DataTableControl: () => <div data-testid="data-table-control" />,
}));
jest.mock('../../../controls/DropZoneControl', () => ({
  DropZoneControl: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="drop-zone-control">{children}</div>
  ),
}));
jest.mock('../../../controls/FilePreviewControl', () => ({
  FilePreviewControl: () => <div data-testid="file-preview-control" />,
}));
jest.mock('../../../controls/LoadingIndicatorControl', () => ({
  LoadingIndicatorControl: () => (
    <div data-testid="loading-indicator-control" />
  ),
}));
jest.mock('../../../controls/MessageControl', () => ({
  MessageControl: () => <div data-testid="message-control" />,
}));
jest.mock('../../../controls/NavigationControl', () => ({
  NavigationControl: () => <div data-testid="navigation-control" />,
}));
jest.mock('../../../controls/PaginationControl', () => ({
  PaginationControl: () => <div data-testid="pagination-control" />,
}));
jest.mock('../../../controls/SearchFieldControl', () => ({
  SearchFieldControl: () => <div data-testid="search-field-control" />,
}));
jest.mock('../../../controls/SearchSubfoldersToggleControl', () => ({
  SearchSubfoldersToggleControl: () => (
    <div data-testid="search-subfolders-toggle-control" />
  ),
}));
jest.mock('../../../controls/TitleControl', () => ({
  TitleControl: () => <div data-testid="title-control" />,
}));
jest.mock('../LocationDetailViewProvider', () => ({
  LocationDetailViewProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));
jest.mock('../useLocationDetailView');

describe('LocationDetailView', () => {
  const mockUseLocationDetailView = jest.mocked(useLocationDetailView);

  beforeEach(() => {
    // @ts-expect-error partial mock return value
    mockUseLocationDetailView.mockReturnValue({
      hasError: false,
      filePreviewState: { previewedFile: null },
    });
  });

  afterEach(() => {
    mockUseLocationDetailView.mockReset();
  });

  it('renders', () => {
    render(<LocationDetailView />);

    expect(screen.getByTestId('actions-list-control')).toBeInTheDocument();
    expect(screen.getByTestId('data-refresh-control')).toBeInTheDocument();
    expect(screen.getByTestId('data-table-control')).toBeInTheDocument();
    expect(screen.getByTestId('drop-zone-control')).toBeInTheDocument();
    expect(screen.getByTestId('loading-indicator-control')).toBeInTheDocument();
    expect(screen.getByTestId('message-control')).toBeInTheDocument();
    expect(screen.getByTestId('navigation-control')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-control')).toBeInTheDocument();
    expect(screen.getByTestId('search-field-control')).toBeInTheDocument();
    expect(
      screen.getByTestId('search-subfolders-toggle-control')
    ).toBeInTheDocument();
    expect(screen.getByTestId('title-control')).toBeInTheDocument();
  });

  it('does not render content on error', () => {
    // @ts-expect-error partial mock return value
    mockUseLocationDetailView.mockReturnValue({ hasError: true });

    render(<LocationDetailView />);

    expect(screen.queryByTestId('data-table-control')).not.toBeInTheDocument();
    expect(screen.queryByTestId('drop-zone-control')).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('loading-indicator-control')
    ).not.toBeInTheDocument();
  });

  it('renders FilePreviewControl when file is being previewed', () => {
    // @ts-expect-error partial mock return value
    mockUseLocationDetailView.mockReturnValue({
      hasError: false,
      filePreviewState: {
        previewedFile: {
          id: 'test-file',
          key: 'test.jpg',
          lastModified: new Date(),
          size: 1024,
          type: 'FILE' as const,
        },
      },
    });

    render(<LocationDetailView />);

    expect(screen.getByTestId('file-preview-control')).toBeInTheDocument();
  });

  it('does not render FilePreviewControl when no file is being previewed', () => {
    // @ts-expect-error partial mock return value
    mockUseLocationDetailView.mockReturnValue({
      hasError: false,
      filePreviewState: {
        previewedFile: null,
      },
    });

    render(<LocationDetailView />);

    expect(
      screen.queryByTestId('file-preview-control')
    ).not.toBeInTheDocument();
  });

  it('has FilePreview static property', () => {
    expect(LocationDetailView.FilePreview).toBeDefined();
  });
});
