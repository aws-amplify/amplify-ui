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

jest.mock('../../../../displayText', () => ({
  ...jest.requireActual<typeof import('../../../../displayText')>(
    '../../../../displayText'
  ),
  useDisplayText: () => ({
    DownloadView: {
      getActionCompleteMessage: jest.fn(),
      enumeratingMessage: 'Listing folder contents…',
      enumerationErrorMessage:
        'Failed to list folder contents. Click Download to try again.',
      noFilesMessage: 'The selected folders contain no files to download.',
      tooManyFilesMessage:
        'The selection exceeds the maximum of 5000 files for a single download. Download folders in smaller batches.',
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
  location: {
    current: location,
    path: 'some-prefix/',
    key: 'prefix/some-prefix/',
  },
  isProcessingComplete: false,
  isProcessing: false,
  isEnumerating: false,
  hasNoFilesToDownload: false,
  hasFilesToDownload: true,
  hasSelection: true,
  isEnumerationError: false,
  isOverFileLimit: false,
  allFoldersReady: true,
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

  it('shows the enumerating message (info) and keeps Start disabled while enumerating', () => {
    useDownloadViewSpy.mockReturnValueOnce({
      ...defaultViewState,
      isEnumerating: true,
      // during enumeration the set may be empty; isEnumerating must own the
      // disable, not the empty-set gate.
      hasFilesToDownload: false,
      allFoldersReady: false,
    });

    render(<DownloadView />);

    const { calls } = mockControlsContextProvider.mock;
    expect(calls[0][0]).toMatchObject({
      data: {
        isActionStartDisabled: true,
        message: { content: 'Listing folder contents…', type: 'info' },
      },
    });
  });

  it('shows the enumeration error message (error) and leaves Start clickable for retry', () => {
    useDownloadViewSpy.mockReturnValueOnce({
      ...defaultViewState,
      isEnumerationError: true,
      // error state is not-ready: resolvedItems is empty but Start must stay
      // clickable (it is the retry trigger), so the empty-set gate must NOT fire.
      hasFilesToDownload: false,
      allFoldersReady: false,
    });

    render(<DownloadView />);

    const { calls } = mockControlsContextProvider.mock;
    expect(calls[0][0]).toMatchObject({
      data: {
        isActionStartDisabled: false,
        message: {
          content:
            'Failed to list folder contents. Click Download to try again.',
          type: 'error',
        },
      },
    });
  });

  it('shows the no-files message (info) for an empty-folder selection', () => {
    useDownloadViewSpy.mockReturnValueOnce({
      ...defaultViewState,
      hasNoFilesToDownload: true,
      hasFilesToDownload: false,
    });

    render(<DownloadView />);

    const { calls } = mockControlsContextProvider.mock;
    expect(calls[0][0]).toMatchObject({
      data: {
        isActionStartDisabled: true,
        message: {
          content: 'The selected folders contain no files to download.',
          type: 'info',
        },
      },
    });
  });

  it('disables Start and shows the no-files message when the ready set is empty (all rows removed)', () => {
    useDownloadViewSpy.mockReturnValueOnce({
      ...defaultViewState,
      // ready + idle, but every row was removed -> nothing to download.
      allFoldersReady: true,
      hasFilesToDownload: false,
    });

    render(<DownloadView />);

    const { calls } = mockControlsContextProvider.mock;
    expect(calls[0][0]).toMatchObject({
      data: {
        isActionStartDisabled: true,
        message: {
          content: 'The selected folders contain no files to download.',
          type: 'info',
        },
      },
    });
  });

  it('shows the too-many-files message (error) and hard-disables Start when over the file limit', () => {
    useDownloadViewSpy.mockReturnValueOnce({
      ...defaultViewState,
      isOverFileLimit: true,
      // over-limit is a not-ready state: the offending folder is never cached.
      hasFilesToDownload: false,
      allFoldersReady: false,
    });

    render(<DownloadView />);

    const { calls } = mockControlsContextProvider.mock;
    expect(calls[0][0]).toMatchObject({
      data: {
        // Unlike the enumeration-error state, Start is NOT a retry trigger
        // here: the cap cannot be retried away, so Start is disabled.
        isActionStartDisabled: true,
        message: {
          content:
            'The selection exceeds the maximum of 5000 files for a single download. Download folders in smaller batches.',
          type: 'error',
        },
      },
    });
  });

  it('shows no message on a bare mount with an empty selection', () => {
    useDownloadViewSpy.mockReturnValueOnce({
      ...defaultViewState,
      // Never-populated selection: vacuously ready, nothing to download. The
      // misleading "selected folders contain no files" copy must NOT show.
      hasSelection: false,
      hasFilesToDownload: false,
      allFoldersReady: true,
      tasks: [],
    });

    render(<DownloadView />);

    const { calls } = mockControlsContextProvider.mock;
    const { data } = calls[0][0] as { data: { message?: unknown } };
    expect(data.message).toBeUndefined();
    // Start stays disabled: there is nothing to download.
    expect(calls[0][0]).toMatchObject({
      data: { isActionStartDisabled: true },
    });
  });

  it('prefers the earlier flag when multiple message flags are true (enumerating wins over complete)', () => {
    useDownloadViewSpy.mockReturnValueOnce({
      ...defaultViewState,
      // Contrived: both the enumerating and completed flags are set. The
      // precedence order must short-circuit on the earlier flag (enumerating).
      isEnumerating: true,
      isProcessingComplete: true,
    });

    render(<DownloadView />);

    const { calls } = mockControlsContextProvider.mock;
    expect(calls[0][0]).toMatchObject({
      data: {
        message: { content: 'Listing folder contents…', type: 'info' },
      },
    });
  });
});
