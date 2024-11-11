import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as ReactCoreModule from '@aws-amplify/ui-react-core';

import * as TempActions from '../../../../do-not-import-from-here/createTempActionsProvider';

import * as Config from '../../../../providers/configuration';
import { INITIAL_STATUS_COUNTS } from '../../../../tasks';
import * as UseCopyViewModule from '../useCopyView';
import { CopyView } from '../CopyView';
import { CopyViewState } from '../types';

const TEST_ACTIONS = { COPY_FILES: { options: { displayName: 'Copy files' } } };
jest.spyOn(TempActions, 'useTempActions').mockReturnValue(TEST_ACTIONS);

jest.spyOn(ReactCoreModule, 'useDataState').mockReturnValue([
  {
    data: {
      items: [{ id: '1', key: 'Location A', type: 'FOLDER' }],
      nextToken: undefined,
    },
    message: '',
    hasError: false,
    isLoading: false,
  },
  jest.fn(),
]);

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
    key: 'itsa-prefix/test-item',
    fileKey: 'test-item',
    lastModified: new Date(),
    size: 1000,
    type: 'FILE' as const,
  },
  cancel: jest.fn(),
  progress: undefined,
  remove: jest.fn(),
  message: 'test-message',
};

const location = {
  bucket: 'bucket',
  id: 'id',
  permission: 'READWRITE',
  prefix: `prefix/`,
  type: 'PREFIX',
} as const;

const onActionCancel = jest.fn();
const onActionStart = jest.fn();
const onDestinationChange = jest.fn();
const onExit = jest.fn();

const callbacks = {
  onActionCancel,
  onActionStart,
  onDestinationChange,
  onExit,
};

const statusCounts = { ...INITIAL_STATUS_COUNTS, QUEUED: 1, TOTAL: 1 };

const initialViewState: CopyViewState = {
  ...callbacks,
  destinationList: [],
  isProcessingComplete: false,
  isProcessing: false,
  location: { current: location, path: '', key: '' },
  statusCounts,
  tasks: [taskOne],
};

const preprocessingViewState: CopyViewState = {
  ...initialViewState,
  destinationList: ['some-prefix'],
};

const processingViewState: CopyViewState = {
  ...initialViewState,
  destinationList: ['some-prefix'],
  isProcessing: true,
  tasks: [{ ...taskOne, status: 'PENDING' }],
  statusCounts: { ...statusCounts, PENDING: 1, QUEUED: 0 },
};

const postProcessingViewState: CopyViewState = {
  ...initialViewState,
  destinationList: ['some-prefix'],
  isProcessingComplete: true,
  tasks: [{ ...taskOne, status: 'COMPLETE' }],
  statusCounts: { ...statusCounts, COMPLETE: 1, QUEUED: 0 },
};

const useCopyViewSpy = jest.spyOn(UseCopyViewModule, 'useCopyView');
describe('CopyView', () => {
  beforeEach(jest.clearAllMocks);

  it('renders search input as expected', () => {
    useCopyViewSpy.mockReturnValue(initialViewState);

    const { getByPlaceholderText } = render(<CopyView />);

    expect(getByPlaceholderText('Search for folders')).toBeInTheDocument();
  });

  it('has the expected enabled and disabled flags when a destination has not been set', () => {
    useCopyViewSpy.mockReturnValue(initialViewState);

    const { getByRole } = render(<CopyView />);

    expect(getByRole('button', { name: 'Exit' })).not.toBeDisabled();
    expect(getByRole('button', { name: 'Copy' })).toBeDisabled();
    expect(getByRole('button', { name: 'Cancel' })).toBeDisabled();
  });

  it('has the expected enabled and disabled flags when a destination has been set', () => {
    useCopyViewSpy.mockReturnValue(preprocessingViewState);

    const { getByRole } = render(<CopyView />);

    expect(getByRole('button', { name: 'Exit' })).not.toBeDisabled();
    expect(getByRole('button', { name: 'Copy' })).not.toBeDisabled();
    expect(getByRole('button', { name: 'Cancel' })).toBeDisabled();
  });

  it('has the expected enabled and disabled flags when copying files', () => {
    useCopyViewSpy.mockReturnValue(processingViewState);

    const { getByRole } = render(<CopyView />);

    expect(getByRole('button', { name: 'Exit' })).toBeDisabled();
    expect(getByRole('button', { name: 'Copy' })).toBeDisabled();
    expect(getByRole('button', { name: 'Cancel' })).not.toBeDisabled();
  });

  it('has the expected enabled and disabled flags when copying files is complete', () => {
    useCopyViewSpy.mockReturnValue(postProcessingViewState);

    const { getByRole } = render(<CopyView />);

    expect(getByRole('button', { name: 'Exit' })).not.toBeDisabled();
    expect(getByRole('button', { name: 'Copy' })).toBeDisabled();
    expect(getByRole('button', { name: 'Cancel' })).toBeDisabled();
  });

  it('calls onExit when Exit button is clicked', async () => {
    useCopyViewSpy.mockReturnValue(initialViewState);

    const { getByRole } = render(<CopyView />);

    await userEvent.click(getByRole('button', { name: 'Exit' }));

    expect(onExit).toHaveBeenCalledTimes(1);
  });

  it('calls onActionStart when Start button is clicked', async () => {
    useCopyViewSpy.mockReturnValue(preprocessingViewState);
    const { getByRole } = render(<CopyView />);

    await userEvent.click(getByRole('button', { name: 'Copy' }));

    expect(onActionStart).toHaveBeenCalledTimes(1);
  });

  it('calls onActionCancel when Cancel button is clicked', async () => {
    useCopyViewSpy.mockReturnValue(processingViewState);

    const { getByRole } = render(<CopyView />);

    await userEvent.click(getByRole('button', { name: 'Cancel' }));

    expect(onActionCancel).toHaveBeenCalledTimes(1);
  });
});
