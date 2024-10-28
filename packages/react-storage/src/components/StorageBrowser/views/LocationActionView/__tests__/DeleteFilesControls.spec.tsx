import React from 'react';
import { render, screen } from '@testing-library/react';
import { DeleteFilesControls } from '../DeleteFilesControls';
import * as ActionViewHooks from '../hooks';
import userEvent from '@testing-library/user-event';
import * as TempActions from '../../../do-not-import-from-here/createTempActionsProvider';

// Mock the useDeleteActionView hook
jest.spyOn(ActionViewHooks, 'useDeleteActionView').mockReturnValue({
  disableCancel: false,
  disableClose: false,
  disablePrimary: false,
  onClose: jest.fn(),
  onCancel: jest.fn(),
  onStart: jest.fn(),
  taskCounts: {
    CANCELED: 0,
    COMPLETE: 0,
    FAILED: 0,
    INITIAL: 0,
    PENDING: 0,
    QUEUED: 3,
    TOTAL: 3,
  },
  tasks: [],
});

const TEST_ACTIONS = {
  DELETE_FILES: {
    options: { displayName: 'Delete file' },
  },
};

jest.spyOn(TempActions, 'useTempActions').mockReturnValue(TEST_ACTIONS);

describe('DeleteFilesControls', () => {
  const mockuseDeleteActionView = {
    disableCancel: false,
    disableClose: false,
    disablePrimary: false,
    onClose: jest.fn(),
    onCancel: jest.fn(),
    onStart: jest.fn(),
  };

  beforeEach(() => {
    // useDeleteActionViewSpy.mockReturnValue(mockuseDeleteActionView);
  });

  it('renders all controls', () => {
    render(<DeleteFilesControls />);

    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  // it('disables controls based on useDeleteActionView hook', () => {
  //   (useDeleteActionView as jest.Mock).mockReturnValue({
  //     ...mockuseDeleteActionView,
  //     disableCancel: true,
  //     disableClose: true,
  //     disablePrimary: true,
  //   });

  //   render(<DeleteFilesControls />);

  //   expect(screen.getByRole('button', { name: 'Back' })).toBeDisabled();
  //   expect(screen.getByRole('button', { name: 'Start' })).toBeDisabled();
  //   expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled();
  // });

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
