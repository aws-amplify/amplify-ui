import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DeleteFileControls } from '../DeleteFileControls';
import { UseDeleteActionView } from '../hooks/useDeleteActionView';
import { displayText } from '../../../displayText/en';
import createProvider from '../../../createProvider';

// Mock the UseDeleteActionView hook
jest.mock('../hooks/useDeleteActionView');

const TEST_ACTIONS = {
  DELETE_FILE: { options: { displayName: 'Delete file' } },
};

const config = {
  getLocationCredentials: jest.fn(),
  listLocations: jest.fn(),
  region: 'region',
  registerAuthListener: jest.fn(),
};
const Provider = createProvider({ actions: TEST_ACTIONS, config });

describe('DeleteFileControls', () => {
  const mockUseDeleteActionView = {
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
    (UseDeleteActionView as jest.Mock).mockReturnValue(mockUseDeleteActionView);
  });

  it('renders all controls', async () => {
    await waitFor(() => {
      render(
        <Provider>
          <DeleteFileControls />
        </Provider>
      );
    });

    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      displayText.actionSelectedText
    );
  });

  it('disables controls based on UseDeleteActionView hook', async () => {
    (UseDeleteActionView as jest.Mock).mockReturnValue({
      ...mockUseDeleteActionView,
      disableCancel: true,
      disableClose: true,
      disablePrimary: true,
    });

    await waitFor(() => {
      render(
        <Provider>
          <DeleteFileControls />
        </Provider>
      );
    });

    expect(screen.getByRole('button', { name: 'Back' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Start' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled();
  });

  it('calls onClose when Exit button is clicked', async () => {
    await waitFor(() => {
      render(
        <Provider>
          <DeleteFileControls />
        </Provider>
      );
    });
    await userEvent.click(screen.getByRole('button', { name: 'Back' }));

    expect(mockUseDeleteActionView.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onStart when Start button is clicked', async () => {
    await waitFor(() => {
      render(
        <Provider>
          <DeleteFileControls />
        </Provider>
      );
    });

    await userEvent.click(screen.getByRole('button', { name: 'Start' }));

    expect(mockUseDeleteActionView.onStart).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when Cancel button is clicked', async () => {
    await waitFor(() => {
      render(
        <Provider>
          <DeleteFileControls />
        </Provider>
      );
    });

    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(mockUseDeleteActionView.onCancel).toHaveBeenCalledTimes(1);
  });
});
