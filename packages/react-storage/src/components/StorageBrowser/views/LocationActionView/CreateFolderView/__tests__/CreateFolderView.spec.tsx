import React from 'react';
import { render } from '@testing-library/react';

import * as UseCreateFolderViewModule from '../useCreateFolderView';
import { CreateFolderViewState } from '../types';

import { CreateFolderView, isValidFolderName } from '../CreateFolderView';

jest.mock('../../Controls/Title');

const getActionCompleteMessage = jest.fn();
const getValidationMessage = jest.fn();
jest.mock('../../../../displayText', () => ({
  useDisplayText: () => ({
    CreateFolderView: { getActionCompleteMessage, getValidationMessage },
  }),
}));

const mockControlsContextProvider = jest.fn(
  (_: any) => 'ControlsContextProvider'
);

jest.mock('../../../../controls/context', () => ({
  ControlsContextProvider: (ctx: any) => mockControlsContextProvider(ctx),
  useControlsContext: () => ({ actionConfig: {}, data: {} }),
}));

const current = {
  id: 'an-id-👍🏼',
  bucket: 'test-bucket',
  permission: 'READWRITE' as const,
  prefix: 'test-prefix/',
  type: 'PREFIX' as const,
};

const onActionStart = jest.fn();
const onExit = jest.fn();
const onFolderNameChange = jest.fn();

const folderNameId = 'some-id';

const initialViewState: CreateFolderViewState = {
  folderName: '',
  folderNameId: folderNameId,
  isProcessing: false,
  isProcessingComplete: false,
  location: { current, key: 'test-prefix/', path: '' },
  onExit,
  onActionStart,
  onFolderNameChange,
  onTaskCancel: jest.fn(),
  statusCounts: {
    CANCELED: 0,
    COMPLETE: 0,
    FAILED: 0,
    OVERWRITE_PREVENTED: 0,
    PENDING: 0,
    QUEUED: 3,
    TOTAL: 0,
  },
  tasks: [],
};

const preprocessingViewState: CreateFolderViewState = {
  ...initialViewState,
  folderName: 'cool-folder-name',
};

const processingViewState: CreateFolderViewState = {
  ...preprocessingViewState,
  isProcessing: true,
  statusCounts: {
    ...preprocessingViewState.statusCounts,
    PENDING: 1,
    TOTAL: 1,
  },
};

const postProcessingViewState: CreateFolderViewState = {
  ...processingViewState,
  folderName: 'cool-folder-name',
  isProcessing: false,
  isProcessingComplete: true,
  statusCounts: {
    ...processingViewState.statusCounts,
    PENDING: 0,
    COMPLETE: 1,
  },
};

const useCreateFolderViewSpy = jest
  .spyOn(UseCreateFolderViewModule, 'useCreateFolderView')
  .mockReturnValue(initialViewState);

describe('CreateFolderView', () => {
  afterEach(jest.clearAllMocks);

  it('provides the expected values to `ControlsContextProvider` on initial render', () => {
    render(<CreateFolderView />);

    const { calls } = mockControlsContextProvider.mock;
    expect(calls).toHaveLength(1);
    expect(calls[0][0]).toMatchObject({
      data: {
        isActionStartDisabled: true,
        folderNameId,
        messageContent: undefined,
      },
      onValidateFolderName: expect.any(Function),
    });
  });

  it('provides the expected values to `ControlsContextProvider` prior to processing', () => {
    useCreateFolderViewSpy.mockReturnValue(preprocessingViewState);
    render(<CreateFolderView />);

    const { calls } = mockControlsContextProvider.mock;
    expect(calls).toHaveLength(1);
    expect(calls[0][0]).toMatchObject({
      data: {
        isActionStartDisabled: false,
        folderNameId,
        messageContent: undefined,
      },
      onValidateFolderName: expect.any(Function),
    });
  });

  it('provides the expected values to `ControlsContextProvider` while processing', () => {
    useCreateFolderViewSpy.mockReturnValue(processingViewState);
    render(<CreateFolderView />);

    const { calls } = mockControlsContextProvider.mock;
    expect(calls).toHaveLength(1);
    expect(calls[0][0]).toMatchObject({
      data: {
        isActionStartDisabled: true,
        folderNameId,
        messageContent: undefined,
      },
      onValidateFolderName: expect.any(Function),
    });
  });

  it('provides the expected values to `ControlsContextProvider` post processing', () => {
    getActionCompleteMessage.mockReturnValue('Success!');
    useCreateFolderViewSpy.mockReturnValue(postProcessingViewState);
    render(<CreateFolderView />);

    const { calls } = mockControlsContextProvider.mock;
    expect(calls).toHaveLength(1);
    expect(calls[0][0]).toMatchObject({
      data: {
        isActionStartDisabled: true,
        folderNameId,
        messageContent: 'Success!',
      },
      onValidateFolderName: expect.any(Function),
    });
  });
});

describe('isValidFolderName', () => {
  it('returns false when value is undefined', () => {
    expect(isValidFolderName(undefined)).toBe(false);
  });

  it('returns false when value is an empty string', () => {
    expect(isValidFolderName('')).toBe(false);
  });

  it('returns false if value contains a slash', () => {
    expect(isValidFolderName('Fruit/Kiwi')).toBe(false);
  });

  it('returns false if value contains a period', () => {
    expect(isValidFolderName('Fruit/Kiwi.')).toBe(false);
  });

  it('returns true when value is valid', () => {
    expect(isValidFolderName('Kiwi')).toBe(true);
  });
});
