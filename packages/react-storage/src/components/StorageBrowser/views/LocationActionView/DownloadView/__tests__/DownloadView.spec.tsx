import React from 'react';
import { render } from '@testing-library/react';

import { LocationData } from '../../../../actions';
import { INITIAL_STATUS_COUNTS } from '../../../../tasks';
import * as Config from '../../../../configuration';
import * as UseDownloadViewModule from '../useDownloadView';

import { DownloadViewState } from '../types';
import { DownloadView } from '../DownloadView';

jest.spyOn(Config, 'useGetActionInput').mockReturnValue(() => ({
  accountId: '123456789012',
  bucket: 'XXXXXXXXXXX',
  credentials: jest.fn(),
  region: 'us-west-2',
}));

jest.spyOn(Config, 'usePaginationConfig').mockReturnValue({
  pageSize: 10,
  isExplicitPageSize: true,
});

jest.mock('../../../../displayText', () => ({
  ...jest.requireActual<typeof import('../../../../displayText')>(
    '../../../../displayText'
  ),
  useDisplayText: () => ({
    DownloadView: { getActionCompleteMessage: jest.fn() },
  }),
}));

const mockControlsContextProvider = jest.fn(
  (_: any) => 'ControlsContextProvider'
);
jest.mock('../../../../controls/context', () => ({
  ControlsContextProvider: (ctx: any) => mockControlsContextProvider(ctx),
  useControlsContext: () => ({ actionConfig: {}, data: {} }),
}));

const location: LocationData = {
  bucket: 'bucket',
  id: 'id',
  permissions: ['get'],
  prefix: `prefix/`,
  type: 'PREFIX',
};

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

const defaultViewState: DownloadViewState = {
  ...actionCallbacks,
  hasNextPage: false,
  highestPageVisited: 1,
  onPaginate: jest.fn(),
  page: 1,
  pageTasks: [],
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

const useDownloadViewSpy = jest
  .spyOn(UseDownloadViewModule, 'useDownloadView')
  .mockReturnValue(defaultViewState);

describe('DownloadView', () => {
  afterEach(jest.clearAllMocks);

  it('has the expected composable components', () => {
    expect(DownloadView.Cancel).toBeDefined();
    expect(DownloadView.Exit).toBeDefined();
    expect(DownloadView.Message).toBeDefined();
    expect(DownloadView.Start).toBeDefined();
    expect(DownloadView.Statuses).toBeDefined();
    expect(DownloadView.TasksTable).toBeDefined();
    expect(DownloadView.Title).toBeDefined();
  });

  it('provides the expected values to `ControlsContextProvider` on initial render', () => {
    render(<DownloadView />);

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
    const processingViewState: DownloadViewState = {
      ...defaultViewState,
      isProcessing: true,
      statusCounts: { ...defaultViewState.statusCounts, QUEUED: 0, PENDING: 3 },
      tasks: [
        { ...taskOne, status: 'PENDING' },
        { ...taskTwo, status: 'PENDING' },
        { ...taskThree, status: 'PENDING' },
      ],
    };

    useDownloadViewSpy.mockReturnValueOnce(processingViewState);

    render(<DownloadView />);

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
    const postProcessingViewState: DownloadViewState = {
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

    useDownloadViewSpy.mockReturnValue(postProcessingViewState);

    render(<DownloadView />);

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
});
