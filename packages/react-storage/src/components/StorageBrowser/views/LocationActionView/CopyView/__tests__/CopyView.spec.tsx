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
jest.mock('../../../../controls/SearchControl', () => ({
  SearchControl: () => <div data-testid="SearchControl" />,
}));
jest.mock('../../../../controls/StatusDisplayControl', () => ({
  StatusDisplayControl: () => <div data-testid="StatusDisplayControl" />,
}));
jest.mock('../../../../controls/TitleControl', () => ({
  TitleControl: () => <div data-testid="TitleControl" />,
}));

jest.mock('../DestinationControl', () => ({
  DestinationControl: () => <div data-testid="DestinationControl" />,
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
    expect(CopyView.Folders).toBeDefined();
    expect(CopyView.FoldersLoading).toBeDefined();
    expect(CopyView.FoldersMessage).toBeDefined();
    expect(CopyView.FoldersPagination).toBeDefined();
    expect(CopyView.FoldersSearch).toBeDefined();
    expect(CopyView.Message).toBeDefined();
    expect(CopyView.Start).toBeDefined();
    expect(CopyView.Statuses).toBeDefined();
    expect(CopyView.Tasks).toBeDefined();
    expect(CopyView.Title).toBeDefined();
  });

  it('renders the expected components during folder selection', () => {
    render(<CopyView />);

    // included
    expect(screen.queryByTestId('ActionCancelControl')).toBeInTheDocument();
    expect(screen.queryByTestId('ActionExitControl')).toBeInTheDocument();
    expect(screen.queryByTestId('ActionStartControl')).toBeInTheDocument();
    expect(screen.queryByTestId('DataTableControl')).toBeInTheDocument();
    expect(screen.queryByTestId('DestinationControl')).toBeInTheDocument();
    expect(screen.queryByTestId('FoldersMessageControl')).toBeInTheDocument();
    expect(
      screen.queryByTestId('FoldersPaginationControl')
    ).toBeInTheDocument();
    expect(screen.queryByTestId('FoldersTableControl')).toBeInTheDocument();
    expect(screen.queryByTestId('LoadingIndicatorControl')).toBeInTheDocument();
    expect(screen.queryByTestId('MessageControl')).toBeInTheDocument();
    expect(screen.queryByTestId('SearchControl')).toBeInTheDocument();
    expect(screen.queryByTestId('TitleControl')).toBeInTheDocument();

    // excluded
    expect(
      screen.queryByTestId('StatusDisplayControl')
    ).not.toBeInTheDocument();
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
    expect(screen.queryByTestId('DestinationControl')).toBeInTheDocument();

    expect(screen.queryByTestId('MessageControl')).toBeInTheDocument();
    expect(screen.queryByTestId('StatusDisplayControl')).toBeInTheDocument();
    expect(screen.queryByTestId('TitleControl')).toBeInTheDocument();

    // excluded
    expect(
      screen.queryByTestId('FoldersPaginationControl')
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId('SearchControl')).not.toBeInTheDocument();
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
    expect(screen.queryByTestId('DestinationControl')).toBeInTheDocument();

    expect(screen.queryByTestId('MessageControl')).toBeInTheDocument();
    expect(screen.queryByTestId('StatusDisplayControl')).toBeInTheDocument();
    expect(screen.queryByTestId('TitleControl')).toBeInTheDocument();

    // excluded
    expect(
      screen.queryByTestId('FoldersPaginationControl')
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId('SearchControl')).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('FoldersMessageControl')
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId('FoldersTableControl')).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('LoadingIndicatorControl')
    ).not.toBeInTheDocument();
  });
});
