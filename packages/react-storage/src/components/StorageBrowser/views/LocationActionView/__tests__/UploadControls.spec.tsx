import React from 'react';
import { render } from '@testing-library/react';

import * as ConfigModule from '../../../providers/configuration';
import * as StoreModule from '../../../providers/store';
import { INITIAL_STATUS_COUNTS } from '../../../tasks';

import * as UseUploadViewModule from '../UploadView';
import { UploadControls } from '../UploadControls';

jest.mock('../Controls/Title');

const mockControlsContextProvider = jest.fn(
  (_: any) => 'ControlsContextProvider'
);
jest.mock('../../../controls/context', () => ({
  ControlsContextProvider: (ctx: any) => mockControlsContextProvider(ctx),
  useControlsContext: () => ({ actionConfig: {}, data: {} }),
}));

const useStoreSpy = jest.spyOn(StoreModule, 'useStore');

const onActionCancel = jest.fn();
const onActionStart = jest.fn();
const onExit = jest.fn();
const onDropFiles = jest.fn();
const onSelectFiles = jest.fn();
const onToggleOverwrite = jest.fn();

const callbacks = {
  onActionCancel,
  onActionStart,
  onExit,
  onDropFiles,
  onSelectFiles,
  onToggleOverwrite,
};

const statusCounts = { ...INITIAL_STATUS_COUNTS };

const testFile = new File([], 'test-ooo');
const data = { id: 'some-uuid', file: testFile, key: testFile.name };

const taskOne = {
  data,
  cancel: jest.fn(),
  message: undefined,
  remove: jest.fn(),
  progress: 0,
  status: 'QUEUED' as const,
};

const initialViewState: UseUploadViewModule.UploadViewState = {
  ...callbacks,
  destinationPrefix: 'my-folder/',
  isOverwriteEnabled: false,
  isProcessingComplete: false,
  isProcessing: false,
  tasks: [],
  statusCounts,
};

const preprocessingViewState: UseUploadViewModule.UploadViewState = {
  ...initialViewState,
  tasks: [taskOne],
  statusCounts: { ...statusCounts, QUEUED: 1, TOTAL: 1 },
};

const processingViewState: UseUploadViewModule.UploadViewState = {
  ...initialViewState,
  isProcessing: true,
  tasks: [{ ...taskOne, status: 'PENDING' }],
  statusCounts: { ...statusCounts, PENDING: 1, TOTAL: 1 },
};

const postProcessingViewState: UseUploadViewModule.UploadViewState = {
  ...initialViewState,
  isProcessingComplete: true,
  tasks: [{ ...taskOne, status: 'COMPLETE' }],
  statusCounts: { ...statusCounts, COMPLETE: 1, TOTAL: 1 },
};

const useUploadViewSpy = jest
  .spyOn(UseUploadViewModule, 'useUploadView')
  .mockReturnValue(initialViewState);

const location = {
  id: 'an-id-👍🏼',
  bucket: 'test-bucket',
  permission: 'READWRITE',
  prefix: 'test-prefix/',
  type: 'PREFIX',
};

const dispatchStoreAction = jest.fn();
useStoreSpy.mockReturnValue([
  {
    location: { current: location, path: '', key: location.prefix },
  } as StoreModule.UseStoreState,
  dispatchStoreAction,
]);

const credentials = jest.fn();
const config: ConfigModule.GetActionInput = jest.fn(() => ({
  credentials,
  bucket: location.bucket,
  region: 'region',
}));

jest.spyOn(ConfigModule, 'useGetActionInput').mockReturnValue(config);

describe('UploadControls', () => {
  afterEach(jest.clearAllMocks);

  it('provides the expected boolean flags to `ControlsContextProvider` prior to processing when tasks is empty', () => {
    render(<UploadControls />);

    const { calls } = mockControlsContextProvider.mock;
    expect(calls).toHaveLength(1);
    expect(calls[0][0]).toMatchObject({
      data: {
        isActionStartDisabled: true,
        isActionCancelDisabled: true,
        isAddFilesDisabled: false,
        isAddFolderDisabled: false,
        isExitDisabled: false,
        isOverwriteCheckboxDisabled: false,
      },
    });
  });

  it('provides the expected boolean flags to `ControlsContextProvider` prior to processing', () => {
    useUploadViewSpy.mockReturnValue(preprocessingViewState);

    render(<UploadControls />);

    const { calls } = mockControlsContextProvider.mock;
    expect(calls).toHaveLength(1);
    expect(calls[0][0]).toMatchObject({
      data: {
        isActionStartDisabled: false,
        isActionCancelDisabled: true,
        isAddFilesDisabled: false,
        isAddFolderDisabled: false,
        isExitDisabled: false,
        isOverwriteCheckboxDisabled: false,
      },
    });
  });

  it('provides the expected boolean flags to `ControlsContextProvider` while processing', () => {
    useUploadViewSpy.mockReturnValue(processingViewState);

    render(<UploadControls />);

    const { calls } = mockControlsContextProvider.mock;
    expect(calls).toHaveLength(1);
    expect(calls[0][0]).toMatchObject({
      data: {
        isActionStartDisabled: true,
        isActionCancelDisabled: false,
        isAddFilesDisabled: true,
        isAddFolderDisabled: true,
        isExitDisabled: true,
        isOverwriteCheckboxDisabled: true,
      },
    });
  });

  it('provides the expected boolean flags to `ControlsContextProvider` post processing', () => {
    useUploadViewSpy.mockReturnValue(postProcessingViewState);

    render(<UploadControls />);

    const { calls } = mockControlsContextProvider.mock;
    expect(calls).toHaveLength(1);
    expect(calls[0][0]).toMatchObject({
      data: {
        isActionStartDisabled: true,
        isActionCancelDisabled: true,
        isAddFilesDisabled: true,
        isAddFolderDisabled: true,
        isExitDisabled: false,
        isOverwriteCheckboxDisabled: true,
      },
    });
  });
});
