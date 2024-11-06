import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as TempActions from '../../../do-not-import-from-here/createTempActionsProvider';

import * as Config from '../../../providers/configuration';
import { INITIAL_STATUS_COUNTS } from '../../../tasks';
import * as UseCopyViewModule from '../CopyView';
import { CopyFilesControls } from '../CopyFilesControls';

const TEST_ACTIONS = { COPY_FILES: { options: { displayName: 'Copy files' } } };
jest.spyOn(TempActions, 'useTempActions').mockReturnValue(TEST_ACTIONS);

jest.spyOn(Config, 'useGetActionInput').mockReturnValue(() => ({
  accountId: '123456789012',
  bucket: 'XXXXXXXXXXX',
  credentials: jest.fn(),
  region: 'us-west-2',
}));

const taskOne = {
  status: 'QUEUED' as const,
  data: {
    id: 'id',
    key: 'test-item',
    lastModified: new Date(),
    size: 1000,
    type: 'FILE' as const,
  },
  cancel: jest.fn(),
  progress: undefined,
  remove: jest.fn(),
  message: 'test-message',
};

const onActionCancel = jest.fn();
const onActionStart = jest.fn();
const onExit = jest.fn();
const onDestinationChange = jest.fn();

const callbacks = {
  onActionCancel,
  onActionStart,
  onExit,
  onDestinationChange,
};

const statusCounts = { ...INITIAL_STATUS_COUNTS, QUEUED: 1, TOTAL: 1 };

const initialViewState: UseCopyViewModule.CopyViewState = {
  ...callbacks,
  destinationList: [],
  isProcessingComplete: false,
  isProcessing: false,
  statusCounts,
  tasks: [taskOne],
};

const preprocessingViewState: UseCopyViewModule.CopyViewState = {
  ...initialViewState,
  destinationList: ['some-prefix'],
};

const processingViewState: UseCopyViewModule.CopyViewState = {
  ...initialViewState,
  destinationList: ['some-prefix'],
  isProcessing: true,
  tasks: [{ ...taskOne, status: 'PENDING' }],
  statusCounts: { ...statusCounts, PENDING: 1, QUEUED: 0 },
};

const postProcessingViewState: UseCopyViewModule.CopyViewState = {
  ...initialViewState,
  destinationList: ['some-prefix'],
  isProcessingComplete: true,
  tasks: [{ ...taskOne, status: 'COMPLETE' }],
  statusCounts: { ...statusCounts, COMPLETE: 1, QUEUED: 0 },
};

const useCopyViewSpy = jest.spyOn(UseCopyViewModule, 'useCopyView');
describe('CopyFilesControls', () => {
  beforeEach(jest.clearAllMocks);

  it('has the expected enabled and disabled flags when a destination has not been set', () => {
    useCopyViewSpy.mockReturnValue(initialViewState);

    const { getByRole } = render(<CopyFilesControls />);

    expect(getByRole('button', { name: 'Exit' })).not.toBeDisabled();
    expect(getByRole('button', { name: 'Copy' })).toBeDisabled();
    expect(getByRole('button', { name: 'Cancel' })).toBeDisabled();
  });

  it('has the expected enabled and disabled flags when a destination has been set', () => {
    useCopyViewSpy.mockReturnValue(preprocessingViewState);

    const { getByRole } = render(<CopyFilesControls />);

    expect(getByRole('button', { name: 'Exit' })).not.toBeDisabled();
    expect(getByRole('button', { name: 'Copy' })).not.toBeDisabled();
    expect(getByRole('button', { name: 'Cancel' })).toBeDisabled();
  });

  it('has the expected enabled and disabled flags when copying files', () => {
    useCopyViewSpy.mockReturnValue(processingViewState);

    const { getByRole } = render(<CopyFilesControls />);

    expect(getByRole('button', { name: 'Exit' })).toBeDisabled();
    expect(getByRole('button', { name: 'Copy' })).toBeDisabled();
    expect(getByRole('button', { name: 'Cancel' })).not.toBeDisabled();
  });

  it('has the expected enabled and disabled flags when copying files is complete', () => {
    useCopyViewSpy.mockReturnValue(postProcessingViewState);

    const { getByRole } = render(<CopyFilesControls />);

    expect(getByRole('button', { name: 'Exit' })).not.toBeDisabled();
    expect(getByRole('button', { name: 'Copy' })).toBeDisabled();
    expect(getByRole('button', { name: 'Cancel' })).toBeDisabled();
  });

  it('calls onExit when Exit button is clicked', async () => {
    useCopyViewSpy.mockReturnValue(initialViewState);

    const { getByRole } = render(<CopyFilesControls />);

    await userEvent.click(getByRole('button', { name: 'Exit' }));

    expect(onExit).toHaveBeenCalledTimes(1);
  });

  it('calls onActionStart when Start button is clicked', async () => {
    useCopyViewSpy.mockReturnValue(preprocessingViewState);
    const { getByRole } = render(<CopyFilesControls />);

    await userEvent.click(getByRole('button', { name: 'Copy' }));

    expect(onActionStart).toHaveBeenCalledTimes(1);
  });

  it('calls onActionCancel when Cancel button is clicked', async () => {
    useCopyViewSpy.mockReturnValue(processingViewState);

    const { getByRole } = render(<CopyFilesControls />);

    await userEvent.click(getByRole('button', { name: 'Cancel' }));

    expect(onActionCancel).toHaveBeenCalledTimes(1);
  });
});
