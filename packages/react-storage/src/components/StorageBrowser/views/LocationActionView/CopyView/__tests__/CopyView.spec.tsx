import React from 'react';
import { render } from '@testing-library/react';

import * as ReactCoreModule from '@aws-amplify/ui-react-core';

import * as TempActions from '../../../../do-not-import-from-here/createTempActionsProvider';

import * as Config from '../../../../providers/configuration';
import { INITIAL_STATUS_COUNTS } from '../../../../tasks';

import * as UseCopyViewModule from '../useCopyView';
import { CopyViewState } from '../types';
import { CopyView } from '../CopyView';

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

jest.mock('../../../../displayText', () => ({
  useDisplayText: () => ({ CopyView: {} }),
}));

const mockControlsContextProvider = jest.fn(
  (_: any) => 'ControlsContextProvider'
);
jest.mock('../../../../controls/context', () => ({
  ControlsContextProvider: (ctx: any) => mockControlsContextProvider(ctx),
  useControlsContext: () => ({ actionConfig: {}, data: {} }),
}));

const taskOne = {
  status: 'QUEUED',
  data: {
    id: 'id',
    key: 'itsa-prefix/test-item',
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

const onDestinationChange = jest.fn();
const onTaskCancel = jest.fn();

const actionCallbacks = {
  onActionCancel,
  onActionStart,
  onActionExit,
};

const defaultViewState: CopyViewState = {
  ...actionCallbacks,
  onTaskCancel,
  destinationList: [],
  isProcessingComplete: false,
  isProcessing: false,
  location: { current: location, path: '', key: `itsa-prefix/` },
  onDestinationChange,
  statusCounts: { ...INITIAL_STATUS_COUNTS, QUEUED: 1, TOTAL: 1 },
  tasks: [taskOne],
};

const useCopyViewSpy = jest
  .spyOn(UseCopyViewModule, 'useCopyView')
  .mockReturnValue(defaultViewState);

describe('CopyView', () => {
  afterEach(jest.clearAllMocks);

  it('provides the expected values to `ControlsContextProvider` on initial render', () => {
    useCopyViewSpy.mockReturnValue(defaultViewState);

    render(<CopyView />);

    const { calls } = mockControlsContextProvider.mock;
    expect(calls).toHaveLength(1);
    expect(calls[0][0]).toMatchObject({
      data: {
        isActionCancelDisabled: true,
        isActionStartDisabled: true,
        isActionExitDisabled: false,
        statusCounts: defaultViewState.statusCounts,
      },
      ...actionCallbacks,
    });
  });

  it('provides the expected values to `ControlsContextProvider` on destination change', () => {
    const preprocessingViewState: CopyViewState = {
      ...defaultViewState,
      destinationList: ['some-prefix'],
    };

    useCopyViewSpy.mockReturnValueOnce(preprocessingViewState);

    render(<CopyView />);

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
    const processingViewState: CopyViewState = {
      ...defaultViewState,
      destinationList: ['some-prefix'],
      isProcessing: true,
      tasks: [{ ...taskOne, status: 'PENDING' }],
      statusCounts: { ...defaultViewState.statusCounts, PENDING: 1, QUEUED: 0 },
    };

    useCopyViewSpy.mockReturnValue(processingViewState);

    render(<CopyView />);

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
    const postProcessingViewState: CopyViewState = {
      ...defaultViewState,
      destinationList: ['some-prefix'],
      isProcessingComplete: true,
      tasks: [{ ...taskOne, status: 'COMPLETE' }],
      statusCounts: {
        ...defaultViewState.statusCounts,
        COMPLETE: 1,
        QUEUED: 0,
      },
    };

    useCopyViewSpy.mockReturnValue(postProcessingViewState);

    render(<CopyView />);

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
