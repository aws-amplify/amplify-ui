import React from 'react';
import { render } from '@testing-library/react';

import * as ReactCoreModule from '@aws-amplify/ui-react-core';

import { LocationData } from '../../../../actions';
import * as Config from '../../../../providers/configuration';
import { INITIAL_STATUS_COUNTS } from '../../../../tasks';

import { CopyViewState } from '../types';
import { CopyViewProvider } from '../CopyViewProvider';

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

const getActionCompleteMessage = jest.fn();
const getListFoldersResultsMessage = jest.fn();
jest.mock('../../../../displayText', () => ({
  useDisplayText: () => ({
    CopyView: { getActionCompleteMessage, getListFoldersResultsMessage },
  }),
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
    sourceKey: 'itsa-prefix/test-item',
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

const location: LocationData = {
  bucket: 'bucket',
  id: 'id',
  permissions: ['write'],
  prefix: `prefix/`,
  type: 'PREFIX',
};

const onActionCancel = jest.fn();
const onActionExit = jest.fn();
const onActionStart = jest.fn();
const onSelectDestination = jest.fn();
const onTaskRemove = jest.fn();

const actionCallbacks = {
  onActionCancel,
  onActionStart,
  onActionExit,
};

const defaultViewState: CopyViewState = {
  ...actionCallbacks,
  destination: { current: undefined, path: '', key: '' },
  folders: {
    hasError: false,
    hasNextPage: false,
    highestPageVisited: 1,
    page: 1,
    pageItems: [],
    query: '',
    hasExhaustedSearch: false,
    isLoading: false,
    message: undefined,
    onPaginate: jest.fn(),
    onQuery: jest.fn(),
    onSearch: jest.fn(),
    onInitialize: jest.fn(),
    onSearchClear: jest.fn(),
    onSelectFolder: jest.fn(),
  },
  isProcessingComplete: false,
  isProcessing: false,
  location: { current: location, path: '', key: `itsa-prefix/` },
  statusCounts: { ...INITIAL_STATUS_COUNTS, QUEUED: 1, TOTAL: 1 },
  tasks: [taskOne],
  onTaskRemove,
  onSelectDestination,
};

describe('CopyViewProvider', () => {
  afterEach(jest.clearAllMocks);

  it('provides the expected values to `ControlsContextProvider` on initial render', () => {
    render(<CopyViewProvider {...defaultViewState} />);

    const { calls } = mockControlsContextProvider.mock;
    expect(calls).toHaveLength(1);
    expect(calls[0][0]).toMatchObject({
      data: {
        isActionCancelDisabled: true,
        isActionStartDisabled: true,
        isActionExitDisabled: false,
        isActionDestinationNavigable: true,
        statusCounts: defaultViewState.statusCounts,
      },
      ...actionCallbacks,
    });
  });

  it('provides the expected values to `ControlsContextProvider` on destination change', () => {
    const preprocessingViewState: CopyViewState = {
      ...defaultViewState,
      destination: { current: location, path: '', key: `itsa-prefix/` },
    };

    render(<CopyViewProvider {...preprocessingViewState} />);

    const { calls } = mockControlsContextProvider.mock;
    expect(calls).toHaveLength(1);
    expect(calls[0][0]).toMatchObject({
      data: {
        isActionCancelDisabled: true,
        isActionStartDisabled: false,
        isActionExitDisabled: false,
        isActionDestinationNavigable: true,
        statusCounts: defaultViewState.statusCounts,
      },
      ...actionCallbacks,
    });
  });

  it('provides the expected values to `ControlsContextProvider` while processing', () => {
    const processingViewState: CopyViewState = {
      ...defaultViewState,
      destination: { current: location, path: '', key: `itsa-prefix/` },
      isProcessing: true,
      tasks: [{ ...taskOne, status: 'PENDING' }],
      statusCounts: { ...defaultViewState.statusCounts, PENDING: 1, QUEUED: 0 },
    };

    render(<CopyViewProvider {...processingViewState} />);

    const { calls } = mockControlsContextProvider.mock;
    expect(calls).toHaveLength(1);
    expect(calls[0][0]).toMatchObject({
      data: {
        isActionCancelDisabled: false,
        isActionStartDisabled: true,
        isActionExitDisabled: true,
        isActionDestinationNavigable: false,
        statusCounts: processingViewState.statusCounts,
      },
      ...actionCallbacks,
    });
  });

  it('provides the expected values to `ControlsContextProvider` post processing in the happy path', () => {
    const postProcessingViewState: CopyViewState = {
      ...defaultViewState,
      destination: { current: location, path: '', key: `itsa-prefix/` },
      isProcessingComplete: true,
      tasks: [{ ...taskOne, status: 'COMPLETE' }],
      statusCounts: {
        ...defaultViewState.statusCounts,
        COMPLETE: 1,
        QUEUED: 0,
      },
    };

    render(<CopyViewProvider {...postProcessingViewState} />);

    const { calls } = mockControlsContextProvider.mock;
    expect(calls).toHaveLength(1);
    expect(calls[0][0]).toMatchObject({
      data: {
        isActionCancelDisabled: true,
        isActionStartDisabled: true,
        isActionExitDisabled: false,
        isActionDestinationNavigable: false,
        statusCounts: postProcessingViewState.statusCounts,
      },
      ...actionCallbacks,
    });
  });

  it.todo(
    'provides the expected values to `ControlsContextProvider` post processing with failures'
  );
});
