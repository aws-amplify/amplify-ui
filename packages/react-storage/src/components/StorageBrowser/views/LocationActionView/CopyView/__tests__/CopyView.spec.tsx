import React from 'react';
import { render, screen } from '@testing-library/react';

import * as UseCopyViewModule from '../useCopyView';

import { CopyViewState } from '../types';
import { CopyView } from '../CopyView';

jest.mock('../CopyViewProvider', () => ({
  CopyViewProvider: ({ children }: { children?: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock('../../../../controls/ActionCancelControl', () => ({
  ActionCancelControl: () => <div data-testid="ActionCancelControl" />,
}));
jest.mock('../../../../controls/ActionDestinationControl', () => ({
  ActionDestinationControl: () => (
    <div data-testid="ActionDestinationControl" />
  ),
}));
jest.mock('../../../../controls/ActionExitControl', () => ({
  ActionExitControl: () => <div data-testid="ActionExitControl" />,
}));
jest.mock('../../../../controls/ActionStartControl', () => ({
  ActionStartControl: () => <div data-testid="ActionStartControl" />,
}));
jest.mock('../../../../controls/DataTableControl', () => ({
  DataTableControl: () => <div data-testid="DataTableControl" />,
}));
jest.mock('../../../../controls/LoadingIndicatorControl', () => ({
  LoadingIndicatorControl: () => <div data-testid="LoadingIndicatorControl" />,
}));
jest.mock('../../../../controls/MessageControl', () => ({
  MessageControl: () => <div data-testid="MessageControl" />,
}));
jest.mock('../../../../controls/SearchFieldControl', () => ({
  SearchFieldControl: () => <div data-testid="SearchFieldControl" />,
}));
jest.mock('../../../../controls/StatusDisplayControl', () => ({
  StatusDisplayControl: () => <div data-testid="StatusDisplayControl" />,
}));
jest.mock('../../../../controls/TitleControl', () => ({
  TitleControl: () => <div data-testid="TitleControl" />,
}));
jest.mock('../FoldersMessageControl', () => ({
  FoldersMessageControl: () => <div data-testid="FoldersMessageControl" />,
}));
jest.mock('../FoldersPaginationControl', () => ({
  FoldersPaginationControl: () => (
    <div data-testid="FoldersPaginationControl" />
  ),
}));
jest.mock('../FoldersTableControl', () => ({
  FoldersTableControl: () => <div data-testid="FoldersTableControl" />,
}));

const onInitialize = jest.fn();

// @ts-expect-error
const initialCopyState = {
  isProcessing: false,
  isProcessingComplete: false,
  folders: { onInitialize },
} as CopyViewState;

const useCopyViewSpy = jest
  .spyOn(UseCopyViewModule, 'useCopyView')
  .mockReturnValue(initialCopyState);

describe('CopyView', () => {
  afterEach(jest.clearAllMocks);

  it('has the expected composable components', () => {
    expect(CopyView.Cancel).toBeDefined();
    expect(CopyView.Destination).toBeDefined();
    expect(CopyView.Exit).toBeDefined();
    expect(CopyView.FoldersLoadingIndicator).toBeDefined();
    expect(CopyView.FoldersMessage).toBeDefined();
    expect(CopyView.FoldersPagination).toBeDefined();
    expect(CopyView.FoldersSearch).toBeDefined();
    expect(CopyView.FoldersTable).toBeDefined();
    expect(CopyView.Message).toBeDefined();
    expect(CopyView.Start).toBeDefined();
    expect(CopyView.Statuses).toBeDefined();
    expect(CopyView.TasksTable).toBeDefined();
    expect(CopyView.Title).toBeDefined();
  });

  it('renders the expected components during folder selection', () => {
    render(<CopyView />);

    // included
    expect(screen.queryByTestId('ActionCancelControl')).toBeInTheDocument();
    expect(screen.queryByTestId('ActionExitControl')).toBeInTheDocument();
    expect(screen.queryByTestId('ActionStartControl')).toBeInTheDocument();
    expect(screen.queryByTestId('DataTableControl')).toBeInTheDocument();
    expect(
      screen.queryByTestId('ActionDestinationControl')
    ).toBeInTheDocument();
    expect(screen.queryByTestId('FoldersMessageControl')).toBeInTheDocument();
    expect(
      screen.queryByTestId('FoldersPaginationControl')
    ).toBeInTheDocument();
    expect(screen.queryByTestId('FoldersTableControl')).toBeInTheDocument();
    expect(screen.queryByTestId('LoadingIndicatorControl')).toBeInTheDocument();
    expect(screen.queryByTestId('MessageControl')).toBeInTheDocument();
    expect(screen.queryByTestId('SearchFieldControl')).toBeInTheDocument();
    expect(screen.queryByTestId('TitleControl')).toBeInTheDocument();
  });

  it('renders the expected components while copying is active', () => {
    useCopyViewSpy.mockReturnValue({
      ...initialCopyState,
      isProcessing: true,
      isProcessingComplete: false,
    } as CopyViewState);

    render(<CopyView />);

    // included
    expect(screen.queryByTestId('ActionCancelControl')).toBeInTheDocument();
    expect(screen.queryByTestId('ActionExitControl')).toBeInTheDocument();
    expect(screen.queryByTestId('ActionStartControl')).toBeInTheDocument();
    expect(screen.queryByTestId('DataTableControl')).toBeInTheDocument();
    expect(
      screen.queryByTestId('ActionDestinationControl')
    ).toBeInTheDocument();

    expect(screen.queryByTestId('MessageControl')).toBeInTheDocument();
    expect(screen.queryByTestId('StatusDisplayControl')).toBeInTheDocument();
    expect(screen.queryByTestId('TitleControl')).toBeInTheDocument();

    // excluded
    expect(
      screen.queryByTestId('FoldersPaginationControl')
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId('SearchFieldControl')).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('FoldersMessageControl')
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId('FoldersTableControl')).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('LoadingIndicatorControl')
    ).not.toBeInTheDocument();
  });

  it('renders the expected components after copying has completed', () => {
    useCopyViewSpy.mockReturnValue({
      ...initialCopyState,
      isProcessing: false,
      isProcessingComplete: true,
    } as CopyViewState);

    render(<CopyView />);

    // included
    expect(screen.queryByTestId('ActionCancelControl')).toBeInTheDocument();
    expect(screen.queryByTestId('ActionExitControl')).toBeInTheDocument();
    expect(screen.queryByTestId('ActionStartControl')).toBeInTheDocument();
    expect(screen.queryByTestId('DataTableControl')).toBeInTheDocument();
    expect(
      screen.queryByTestId('ActionDestinationControl')
    ).toBeInTheDocument();

    expect(screen.queryByTestId('MessageControl')).toBeInTheDocument();
    expect(screen.queryByTestId('StatusDisplayControl')).toBeInTheDocument();
    expect(screen.queryByTestId('TitleControl')).toBeInTheDocument();

    // excluded
    expect(
      screen.queryByTestId('FoldersPaginationControl')
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId('SearchFieldControl')).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('FoldersMessageControl')
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId('FoldersTableControl')).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('LoadingIndicatorControl')
    ).not.toBeInTheDocument();
  });
});
