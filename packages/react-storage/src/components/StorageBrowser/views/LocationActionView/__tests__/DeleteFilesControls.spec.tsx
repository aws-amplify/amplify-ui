import React from 'react';
import { render, screen } from '@testing-library/react';
import { DeleteFilesControls } from '../DeleteFilesControls';
import { useDeleteActionView } from '../hooks/useDeleteActionView';
import userEvent from '@testing-library/user-event';
import * as TempActions from '../../../do-not-import-from-here/createTempActionsProvider';

// Mock the useDeleteActionView hook
jest.mock('../hooks/useDeleteActionView');

const TEST_ACTIONS = {
  DELETE_FILES: {
    options: { displayName: 'Delete file' },
  },
};

jest.spyOn(TempActions, 'useTempActions').mockReturnValue(TEST_ACTIONS);

describe('DeleteFilesControls', () => {
  const mockuseDeleteActionView = {
    controlsContextValue: {
      data: {
        taskCounts: {
          INITIAL: 0,
          QUEUED: 1,
          PENDING: 1,
          FAILED: 1,
          COMPLETE: 1,
          CANCELED: 1,
          TOTAL: 5,
        },
      },
      actionsConfig: { type: 'BATCH_ACTION', isCancelable: true },
    },
    disableCancel: false,
    disableClose: false,
    disablePrimary: false,
    onClose: jest.fn(),
    onCancel: jest.fn(),
    onStart: jest.fn(),
  };

  beforeEach(() => {
    (useDeleteActionView as jest.Mock).mockReturnValue(mockuseDeleteActionView);
  });

  it('renders all controls', () => {
    render(<DeleteFilesControls />);

    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('disables controls based on useDeleteActionView hook', () => {
    (useDeleteActionView as jest.Mock).mockReturnValue({
      ...mockuseDeleteActionView,
      disableCancel: true,
      disableClose: true,
      disablePrimary: true,
    });

    render(<DeleteFilesControls />);

    expect(screen.getByRole('button', { name: 'Back' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Start' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled();
  });

  it('calls onClose when Exit button is clicked', async () => {
    render(<DeleteFilesControls />);

    await userEvent.click(screen.getByRole('button', { name: 'Back' }));

    expect(mockuseDeleteActionView.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onStart when Start button is clicked', async () => {
    render(<DeleteFilesControls />);

    await userEvent.click(screen.getByRole('button', { name: 'Start' }));

    expect(mockuseDeleteActionView.onStart).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when Cancel button is clicked', async () => {
    render(<DeleteFilesControls />);

    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(mockuseDeleteActionView.onCancel).toHaveBeenCalledTimes(1);
  });
});
