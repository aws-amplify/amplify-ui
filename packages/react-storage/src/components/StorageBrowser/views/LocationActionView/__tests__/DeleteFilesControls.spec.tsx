import React from 'react';
import { render } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';

import * as UseDeleteViewModule from '../DeleteView/useDeleteView';
import * as Config from '../../../providers/configuration';

import * as TempActions from '../../../do-not-import-from-here/createTempActionsProvider';
import { DeleteFilesControls } from '../DeleteFilesControls';

const TEST_ACTIONS = {
  DELETE_FILES: {
    options: { displayName: 'Delete file' },
  },
};

jest.spyOn(TempActions, 'useTempActions').mockReturnValue(TEST_ACTIONS);

const onExit = jest.fn();
const onActionCancel = jest.fn();
const onActionStart = jest.fn();

const useDeleteViewSpy = jest
  .spyOn(UseDeleteViewModule, 'useDeleteView')
  .mockReturnValue({
    isProcessing: false,
    isProcessingComplete: false,
    onExit,
    onActionCancel,
    onActionStart,
    statusCounts: {
      CANCELED: 0,
      COMPLETE: 0,
      FAILED: 0,
      OVERWRITE_PREVENTED: 0,
      PENDING: 0,
      QUEUED: 3,
      TOTAL: 3,
    },
    tasks: [
      {
        status: 'QUEUED',
        data: {
          id: 'id',
          key: 'test-item',
          lastModified: new Date(),
          size: 1000,
          type: 'FILE',
        },
        cancel: jest.fn(),
        progress: undefined,
        remove: jest.fn(),
        message: 'test-message',
      },
      {
        status: 'QUEUED',
        data: {
          id: 'id2',
          key: 'test-item2',
          lastModified: new Date(),
          size: 1000,
          type: 'FILE',
        },
        cancel: jest.fn(),
        progress: undefined,
        remove: jest.fn(),
        message: 'test-message',
      },
      {
        status: 'QUEUED',
        data: {
          id: 'id3',
          key: 'test-item3',
          lastModified: new Date(),
          size: 1000,
          type: 'FILE',
        },
        cancel: jest.fn(),
        progress: undefined,
        remove: jest.fn(),
        message: 'test-message',
      },
    ],
  });

describe('DeleteFilesControls', () => {
  let user: UserEvent;

  beforeEach(() => {
    jest.clearAllMocks();

    jest.spyOn(Config, 'useGetActionInput').mockReturnValue(() => ({
      accountId: '123456789012',
      bucket: 'XXXXXXXXXXX',
      credentials: jest.fn(),
      region: 'us-west-2',
    }));

    user = userEvent.setup();
  });

  it('renders all controls', () => {
    const { getByRole } = render(<DeleteFilesControls />);

    expect(getByRole('button', { name: 'Exit' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Start' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('has the expected enabled and disabled button controls prior to processing', () => {
    useDeleteViewSpy.mockReturnValueOnce({
      isProcessing: false,
      isProcessingComplete: false,
      onExit,
      onActionCancel,
      onActionStart,
      statusCounts: {
        CANCELED: 0,
        COMPLETE: 0,
        FAILED: 0,
        OVERWRITE_PREVENTED: 0,
        PENDING: 0,
        QUEUED: 1,
        TOTAL: 1,
      },
      tasks: [
        {
          cancel: jest.fn(),
          data: {
            id: 'test-id',
            key: 'key',
            lastModified: new Date(),
            size: 1000,
            type: 'FILE',
          },
          message: undefined,
          progress: undefined,
          remove: jest.fn(),
          status: 'QUEUED',
        },
      ],
    });

    const { getByRole } = render(<DeleteFilesControls />);

    expect(getByRole('button', { name: 'Exit' })).not.toBeDisabled();
    expect(getByRole('button', { name: 'Start' })).not.toBeDisabled();
    expect(getByRole('button', { name: 'Cancel' })).toBeDisabled();
  });

  it('has the expected enabled and disabled button controls while processing', () => {
    useDeleteViewSpy.mockReturnValueOnce({
      isProcessing: true,
      isProcessingComplete: false,
      onExit,
      onActionCancel,
      onActionStart,
      statusCounts: {
        CANCELED: 0,
        COMPLETE: 0,
        FAILED: 0,
        OVERWRITE_PREVENTED: 0,
        PENDING: 1,
        QUEUED: 0,
        TOTAL: 1,
      },
      tasks: [
        {
          cancel: jest.fn(),
          data: {
            id: 'test-id',
            key: 'key',
            lastModified: new Date(),
            size: 1000,
            type: 'FILE',
          },
          message: undefined,
          progress: undefined,
          remove: jest.fn(),
          status: 'PENDING',
        },
      ],
    });

    const { getByRole } = render(<DeleteFilesControls />);

    expect(getByRole('button', { name: 'Exit' })).toBeDisabled();
    expect(getByRole('button', { name: 'Start' })).toBeDisabled();
    expect(getByRole('button', { name: 'Cancel' })).not.toBeDisabled();
  });

  it('has the expected enabled and disabled button controls post processing', () => {
    useDeleteViewSpy.mockReturnValueOnce({
      isProcessing: false,
      isProcessingComplete: true,
      onExit,
      onActionCancel,
      onActionStart,
      statusCounts: {
        CANCELED: 0,
        COMPLETE: 1,
        FAILED: 0,
        OVERWRITE_PREVENTED: 0,
        PENDING: 0,
        QUEUED: 0,
        TOTAL: 1,
      },
      tasks: [
        {
          cancel: jest.fn(),
          data: {
            id: 'test-id',
            key: 'key',
            lastModified: new Date(),
            size: 1000,
            type: 'FILE',
          },
          message: undefined,
          progress: undefined,
          remove: jest.fn(),
          status: 'COMPLETE',
        },
      ],
    });

    const { getByRole } = render(<DeleteFilesControls />);

    expect(getByRole('button', { name: 'Exit' })).not.toBeDisabled();
    expect(getByRole('button', { name: 'Start' })).toBeDisabled();
    expect(getByRole('button', { name: 'Cancel' })).toBeDisabled();
  });

  it('calls onExit when Exit button is clicked', async () => {
    const { getByRole } = render(<DeleteFilesControls />);

    const button = getByRole('button', { name: 'Exit' });

    expect(button).toBeInTheDocument();

    await user.click(button);

    expect(onExit).toHaveBeenCalledTimes(1);
  });

  it('calls onActionStart when Start button is clicked', async () => {
    const { getByRole } = render(<DeleteFilesControls />);

    const button = getByRole('button', { name: 'Start' });

    expect(button).toBeInTheDocument();

    await user.click(button);

    expect(onActionStart).toHaveBeenCalledTimes(1);
  });

  it('calls onActionCancel when Cancel button is clicked', async () => {
    useDeleteViewSpy.mockReturnValueOnce({
      isProcessing: true,
      isProcessingComplete: false,
      onExit,
      onActionCancel,
      onActionStart,
      statusCounts: {
        CANCELED: 0,
        COMPLETE: 0,
        FAILED: 0,
        OVERWRITE_PREVENTED: 0,
        PENDING: 1,
        QUEUED: 0,
        TOTAL: 1,
      },
      tasks: [
        {
          cancel: jest.fn(),
          data: {
            id: 'test-id',
            key: 'key',
            lastModified: new Date(),
            size: 1000,
            type: 'FILE',
          },
          message: undefined,
          progress: undefined,
          remove: jest.fn(),
          status: 'PENDING',
        },
      ],
    });

    const { getByRole } = render(<DeleteFilesControls />);

    const button = getByRole('button', { name: 'Cancel' });

    expect(button).toBeInTheDocument();

    await user.click(button);

    expect(onActionCancel).toHaveBeenCalledTimes(1);
  });
});
