import React from 'react';
import { render } from '@testing-library/react';
import * as TempActions from '../../../../do-not-import-from-here/createTempActionsProvider';

import { INITIAL_STATUS_COUNTS } from '../../../../tasks';
import * as Config from '../../../../providers/configuration';
import * as UseDeleteViewModule from '../useDeleteView';

import { DeleteViewState } from '../types';
import { DeleteView } from '../DeleteView';

const TEST_ACTIONS = {
  DELETE_FILES: {
    options: { displayName: 'Delete file' },
  },
};
jest.spyOn(TempActions, 'useTempActions').mockReturnValue(TEST_ACTIONS);

jest.spyOn(Config, 'useGetActionInput').mockReturnValue(() => ({
  accountId: '123456789012',
  bucket: 'XXXXXXXXXXX',
  credentials: jest.fn(),
  region: 'us-west-2',
}));

jest.mock('../../../../displayText', () => ({
  useDisplayText: () => ({ DeleteView: {} }),
}));

const mockControlsContextProvider = jest.fn(
  (_: any) => 'ControlsContextProvider'
);
jest.mock('../../../../controls/context', () => ({
  ControlsContextProvider: (ctx: any) => mockControlsContextProvider(ctx),
  useControlsContext: () => ({ actionConfig: {}, data: {} }),
}));

const location = {
  bucket: 'bucket',
  id: 'id',
  permission: 'READWRITE',
  prefix: `prefix/`,
  type: 'PREFIX',
} as const;

const onActionCancel = jest.fn();
const onActionExit = jest.fn();
const onActionStart = jest.fn();

const actionCallbacks = { onActionCancel, onActionExit, onActionStart };

const taskOne = {
  status: 'QUEUED',
  data: {
    id: 'id',
    key: 'some-prefix/test-item',
    fileKey: 'test-item',
    lastModified: new Date(),
    size: 1000,
    type: 'FILE',
  },
  cancel: jest.fn(),
  progress: undefined,
  remove: jest.fn(),
  message: undefined,
} as const;
const taskTwo = {
  status: 'QUEUED',
  data: {
    id: 'id2',
    key: 'some-prefix/test-item2',
    fileKey: 'test-item2',
    lastModified: new Date(),
    size: 1000,
    type: 'FILE',
  },
  cancel: jest.fn(),
  progress: undefined,
  remove: jest.fn(),
  message: undefined,
} as const;
const taskThree = {
  status: 'QUEUED',
  data: {
    id: 'id3',
    key: 'some-prefix/test-item3',
    fileKey: 'test-item3',
    lastModified: new Date(),
    size: 1000,
    type: 'FILE',
  },
  cancel: jest.fn(),
  progress: undefined,
  remove: jest.fn(),
  message: undefined,
} as const;

const defaultViewState: DeleteViewState = {
  ...actionCallbacks,
  location: {
    current: location,
    path: 'some-prefix/',
    key: 'prefix/some-prefix/',
  },
  isProcessingComplete: false,
  isProcessing: false,
  statusCounts: { ...INITIAL_STATUS_COUNTS, QUEUED: 3, TOTAL: 3 },
  tasks: [taskOne, taskTwo, taskThree],
};

const useDeleteViewSpy = jest
  .spyOn(UseDeleteViewModule, 'useDeleteView')
  .mockReturnValue(defaultViewState);

describe('DeleteView', () => {
  afterEach(jest.clearAllMocks);

  it('provides the expected values to `ControlsContextProvider` on initial render', () => {
    render(<DeleteView />);

    const { calls } = mockControlsContextProvider.mock;
    expect(calls).toHaveLength(1);
    expect(calls[0][0]).toMatchObject({
      data: {
        isActionCancelDisabled: true,
        isActionStartDisabled: false,
        isActionExitDisabled: false,
        statusCounts: defaultViewState.statusCounts,
      },
      ...actionCallbacks,
    });
  });

  it('provides the expected values to `ControlsContextProvider` while processing', () => {
    const processingViewState: DeleteViewState = {
      ...defaultViewState,
      isProcessing: true,
      statusCounts: { ...defaultViewState.statusCounts, QUEUED: 0, PENDING: 3 },
      tasks: [
        { ...taskOne, status: 'PENDING' },
        { ...taskTwo, status: 'PENDING' },
        { ...taskThree, status: 'PENDING' },
      ],
    };

    useDeleteViewSpy.mockReturnValueOnce(processingViewState);

    render(<DeleteView />);

    const { calls } = mockControlsContextProvider.mock;
    expect(calls).toHaveLength(1);
    expect(calls[0][0]).toMatchObject({
      data: {
        isActionCancelDisabled: false,
        isActionStartDisabled: true,
        isActionExitDisabled: true,
        statusCounts: processingViewState.statusCounts,
      },
      ...actionCallbacks,
    });
  });

  it('provides the expected values to `ControlsContextProvider` post processing in the happy path', () => {
    const postProcessingViewState: DeleteViewState = {
      ...defaultViewState,
      isProcessing: false,
      isProcessingComplete: true,
      statusCounts: {
        ...defaultViewState.statusCounts,
        QUEUED: 0,
        COMPLETE: 3,
      },
      tasks: [
        { ...taskOne, status: 'COMPLETE' },
        { ...taskTwo, status: 'COMPLETE' },
        { ...taskThree, status: 'COMPLETE' },
      ],
    };

    useDeleteViewSpy.mockReturnValueOnce(postProcessingViewState);

    render(<DeleteView />);

    const { calls } = mockControlsContextProvider.mock;
    expect(calls).toHaveLength(1);
    expect(calls[0][0]).toMatchObject({
      data: {
        isActionCancelDisabled: true,
        isActionStartDisabled: true,
        isActionExitDisabled: false,
        statusCounts: postProcessingViewState.statusCounts,
      },
      ...actionCallbacks,
    });
  });

  it.todo(
    'provides the expected values to `ControlsContextProvider` post processing with failures'
  );
});
