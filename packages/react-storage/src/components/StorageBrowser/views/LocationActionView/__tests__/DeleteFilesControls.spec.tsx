import React from 'react';
import { render } from '@testing-library/react';
import * as ActionViewHooks from '../hooks/useDeleteActionView';
import * as Config from '../../../providers/configuration';

import userEvent from '@testing-library/user-event';
import * as TempActions from '../../../do-not-import-from-here/createTempActionsProvider';
import { DeleteFilesControls } from '../DeleteFilesControls';

const TEST_ACTIONS = {
  DELETE_FILES: {
    options: { displayName: 'Delete file' },
  },
};

jest.spyOn(TempActions, 'useTempActions').mockReturnValue(TEST_ACTIONS);

describe('DeleteFilesControls', () => {
  const onCloseMock = jest.fn();
  const onCanceleMock = jest.fn();
  const onStartMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(ActionViewHooks, 'useDeleteActionView')
      .mockImplementation(() => {
        return {
          onClose: onCloseMock,
          onCancel: onCanceleMock,
          onStart: onStartMock,
          taskCounts: {
            CANCELED: 0,
            COMPLETE: 0,
            FAILED: 0,
            INITIAL: 0,
            PENDING: 0,
            QUEUED: 3,
            TOTAL: 3,
          },
          tasks: [
            {
              key: 'test-item',
              status: 'QUEUED',
              id: 'id',
              item: {},
              cancel: jest.fn(),
              remove: jest.fn(),
              message: 'test-message',
            },
            {
              key: 'test-item2',
              status: 'QUEUED',
              id: 'id2',
              item: {},
              cancel: jest.fn(),
              remove: jest.fn(),
              message: 'test-message',
            },
            {
              key: 'test-item3',
              status: 'QUEUED',
              id: 'id3',
              item: {},
              cancel: jest.fn(),
              remove: jest.fn(),
              message: 'test-message',
            },
          ],
          disableCancel: false,
          disableClose: false,
          disablePrimary: false,
        };
      });

    jest.spyOn(Config, 'useGetActionInput').mockReturnValue(() => ({
      accountId: '123456789012',
      bucket: 'XXXXXXXXXXX',
      credentials: jest.fn(),
      region: 'us-west-2',
    }));
  });

  it('renders all controls', () => {
    const { getByRole } = render(<DeleteFilesControls />);

    expect(getByRole('button', { name: 'Back' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Start' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('disables controls based on useDeleteActionView hook', () => {
    jest.spyOn(ActionViewHooks, 'useDeleteActionView').mockReturnValue({
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
      disableCancel: true,
      disableClose: true,
      disablePrimary: true,
    });

    const { getByRole } = render(<DeleteFilesControls />);

    expect(getByRole('button', { name: 'Back' })).toBeDisabled();
    expect(getByRole('button', { name: 'Start' })).toBeDisabled();
    expect(getByRole('button', { name: 'Cancel' })).toBeDisabled();
  });

  it('calls onClose when Exit button is clicked', async () => {
    const { getByRole } = render(<DeleteFilesControls />);

    await userEvent.click(getByRole('button', { name: 'Back' }));

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('calls onStart when Start button is clicked', async () => {
    const { getByRole } = render(<DeleteFilesControls />);

    await userEvent.click(getByRole('button', { name: 'Start' }));

    expect(onStartMock).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when Cancel button is clicked', async () => {
    const { getByRole } = render(<DeleteFilesControls />);

    await userEvent.click(getByRole('button', { name: 'Cancel' }));

    expect(onCanceleMock).toHaveBeenCalledTimes(1);
  });
});
