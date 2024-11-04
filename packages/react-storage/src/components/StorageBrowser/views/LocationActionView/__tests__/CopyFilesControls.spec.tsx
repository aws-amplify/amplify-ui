import React from 'react';
import { render } from '@testing-library/react';
import * as UseCopyViewModule from '../CopyView/useCopyView';
import * as Config from '../../../providers/configuration';

import userEvent from '@testing-library/user-event';
import * as TempActions from '../../../do-not-import-from-here/createTempActionsProvider';
import { CopyFilesControls } from '../CopyFilesControls';

const TEST_ACTIONS = {
  COPY_FILES: {
    options: { displayName: 'Copy files' },
  },
};

jest.spyOn(TempActions, 'useTempActions').mockReturnValue(TEST_ACTIONS);
const useCopyViewSpy = jest.spyOn(UseCopyViewModule, 'useCopyView');

describe('CopyFilesControls', () => {
  const onExitMock = jest.fn();
  const onActionCancelMock = jest.fn();
  const onActionStartMock = jest.fn();
  const onSetDestinationList = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useCopyViewSpy.mockImplementation(() => {
      return {
        destinationList: [],
        onSetDestinationList,
        onExit: onExitMock,
        onActionCancel: onActionCancelMock,
        onActionStart: onActionStartMock,
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
            item: { destinationPrefix: '' },
            cancel: jest.fn(),
            remove: jest.fn(),
            message: 'test-message',
          },
          {
            key: 'test-item2',
            status: 'QUEUED',
            id: 'id2',
            item: { destinationPrefix: '' },
            cancel: jest.fn(),
            remove: jest.fn(),
            message: 'test-message',
          },
          {
            key: 'test-item3',
            status: 'QUEUED',
            id: 'id3',
            item: { destinationPrefix: '' },
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
    const { getByRole } = render(<CopyFilesControls />);

    expect(getByRole('button', { name: 'Exit' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Start' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('disables controls based on useDeleteView hook', () => {
    useCopyViewSpy.mockReturnValue({
      destinationList: [],
      onSetDestinationList,
      onExit: jest.fn(),
      onActionCancel: jest.fn(),
      onActionStart: jest.fn(),
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

    const { getByRole } = render(<CopyFilesControls />);

    expect(getByRole('button', { name: 'Exit' })).toBeDisabled();
    expect(getByRole('button', { name: 'Start' })).toBeDisabled();
    expect(getByRole('button', { name: 'Cancel' })).toBeDisabled();
  });

  it('calls onExit when Exit button is clicked', async () => {
    const { getByRole } = render(<CopyFilesControls />);

    await userEvent.click(getByRole('button', { name: 'Exit' }));

    expect(onExitMock).toHaveBeenCalledTimes(1);
  });

  it('calls onActionStart when Start button is clicked', async () => {
    const { getByRole } = render(<CopyFilesControls />);

    await userEvent.click(getByRole('button', { name: 'Start' }));

    expect(onActionStartMock).toHaveBeenCalledTimes(1);
  });

  it('calls onActionCancel when Cancel button is clicked', async () => {
    const { getByRole } = render(<CopyFilesControls />);

    await userEvent.click(getByRole('button', { name: 'Cancel' }));

    expect(onActionCancelMock).toHaveBeenCalledTimes(1);
  });
});
