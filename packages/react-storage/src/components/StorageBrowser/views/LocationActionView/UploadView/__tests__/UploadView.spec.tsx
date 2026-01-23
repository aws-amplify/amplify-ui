import React from 'react';
import { render } from '@testing-library/react';

import { INITIAL_STATUS_COUNTS } from '../../../../tasks';
import { LocationData } from '../../../../actions';
import * as Config from '../../../../configuration';

import * as UseUploadViewModule from '../useUploadView';
import { UploadViewState } from '../types';
import { UploadView } from '../UploadView';

jest.spyOn(Config, 'usePaginationConfig').mockReturnValue({ pageSize: 10 });

jest.mock('../../../../displayText', () => ({
  useDisplayText: () => ({
    UploadView: {
      getActionCompleteMessage: jest.fn(),
      getFilesValidationMessage: jest.fn(),
    },
  }),
}));

const mockControlsContextProvider = jest.fn(
  (_: any) => 'ControlsContextProvider'
);
jest.mock('../../../../controls/context', () => ({
  ControlsContextProvider: (ctx: any) => mockControlsContextProvider(ctx),
  useControlsContext: () => ({ actionConfig: {}, data: {} }),
}));

const onActionCancel = jest.fn();
const onActionStart = jest.fn();
const onActionExit = jest.fn();
const onDropFiles = jest.fn();
const onSelectFiles = jest.fn();
const onToggleOverwrite = jest.fn();
const onPaginate = jest.fn();

const callbacks = {
  onActionCancel,
  onActionStart,
  onDropFiles,
  onActionExit,
  onSelectFiles,
  onToggleOverwrite,
  onPaginate,
};

const statusCounts = { ...INITIAL_STATUS_COUNTS };

const testFile = new File([], 'test-ooo');
const data = { id: 'some-uuid', file: testFile, key: testFile.name };
const invalidFileData = {
  file: new File([], 'very-big-file'),
  id: 'uuid',
  key: 'very-big-file',
};

const taskOne = {
  data,
  cancel: jest.fn(),
  message: undefined,
  remove: jest.fn(),
  progress: 0,
  status: 'QUEUED' as const,
};

const location: LocationData = {
  id: 'an-id-👍🏼',
  bucket: 'test-bucket',
  permissions: ['write'],
  prefix: 'test-prefix/',
  type: 'PREFIX',
};

const initialViewState: UploadViewState = {
  ...callbacks,
  location: { current: location, path: '', key: '' },
  isOverwritingEnabled: false,
  isProcessingComplete: false,
  isProcessing: false,
  tasks: [],
  page: 1,
  hasNextPage: false,
  highestPageVisited: 1,
  invalidFiles: undefined,
  statusCounts,
};

const preprocessingViewState: UploadViewState = {
  ...initialViewState,
  tasks: [taskOne],
  statusCounts: { ...statusCounts, QUEUED: 1, TOTAL: 1 },
  invalidFiles: [invalidFileData],
};

const processingViewState: UploadViewState = {
  ...initialViewState,
  isProcessing: true,
  tasks: [{ ...taskOne, status: 'PENDING' }],
  statusCounts: { ...statusCounts, PENDING: 1, TOTAL: 1 },
};

const postProcessingViewState: UploadViewState = {
  ...initialViewState,
  isProcessingComplete: true,
  tasks: [{ ...taskOne, status: 'COMPLETE' }],
  statusCounts: { ...statusCounts, COMPLETE: 1, TOTAL: 1 },
};

const useUploadViewSpy = jest
  .spyOn(UseUploadViewModule, 'useUploadView')
  .mockReturnValue(initialViewState);

describe('UploadView', () => {
  afterEach(jest.clearAllMocks);

  it('has the expected composable components', () => {
    expect(UploadView.AddFiles).toBeDefined();
    expect(UploadView.AddFolder).toBeDefined();
    expect(UploadView.Cancel).toBeDefined();
    expect(UploadView.Destination).toBeDefined();
    expect(UploadView.DropZone).toBeDefined();
    expect(UploadView.Exit).toBeDefined();
    expect(UploadView.Message).toBeDefined();
    expect(UploadView.OverwriteToggle).toBeDefined();
    expect(UploadView.Start).toBeDefined();
    expect(UploadView.Statuses).toBeDefined();
    expect(UploadView.TasksTable).toBeDefined();
    expect(UploadView.Title).toBeDefined();
  });

  it('provides the expected boolean flags to `ControlsContextProvider` prior to processing when tasks is empty', () => {
    render(<UploadView />);

    const { calls } = mockControlsContextProvider.mock;
    expect(calls).toHaveLength(1);
    expect(calls[0][0]).toMatchObject({
      data: {
        isActionStartDisabled: true,
        isActionExitDisabled: false,
        isActionCancelDisabled: true,
        isAddFilesDisabled: false,
        isAddFolderDisabled: false,
        isOverwriteToggleDisabled: false,
      },
    });
  });

  it('provides the expected boolean flags to `ControlsContextProvider` prior to processing', () => {
    useUploadViewSpy.mockReturnValue(preprocessingViewState);

    render(<UploadView />);

    const { calls } = mockControlsContextProvider.mock;
    expect(calls).toHaveLength(1);
    expect(calls[0][0]).toMatchObject({
      data: {
        isActionStartDisabled: false,
        isActionExitDisabled: false,
        isActionCancelDisabled: true,
        isAddFilesDisabled: false,
        isAddFolderDisabled: false,
        isOverwriteToggleDisabled: false,
      },
    });
  });

  it('provides the expected boolean flags to `ControlsContextProvider` while processing', () => {
    useUploadViewSpy.mockReturnValue(processingViewState);

    render(<UploadView />);

    const { calls } = mockControlsContextProvider.mock;
    expect(calls).toHaveLength(1);
    expect(calls[0][0]).toMatchObject({
      data: {
        isActionStartDisabled: true,
        isActionExitDisabled: true,
        isActionCancelDisabled: false,
        isAddFilesDisabled: true,
        isAddFolderDisabled: true,
        isOverwriteToggleDisabled: true,
      },
    });
  });

  it('provides the expected boolean flags to `ControlsContextProvider` post processing', () => {
    useUploadViewSpy.mockReturnValue(postProcessingViewState);

    render(<UploadView />);

    const { calls } = mockControlsContextProvider.mock;
    expect(calls).toHaveLength(1);
    expect(calls[0][0]).toMatchObject({
      data: {
        isActionStartDisabled: true,
        isActionExitDisabled: false,
        isActionCancelDisabled: true,
        isAddFilesDisabled: true,
        isAddFolderDisabled: true,
        isOverwriteToggleDisabled: true,
      },
    });
  });
});
