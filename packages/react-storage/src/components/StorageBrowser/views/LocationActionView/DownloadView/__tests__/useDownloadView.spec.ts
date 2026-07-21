import { act, renderHook } from '@testing-library/react';

import type { LocationItemData } from '../../../../actions';
import { useLocationItems } from '../../../../locationItems/context';
import { useStore } from '../../../../store';
import { INITIAL_STATUS_COUNTS, Task } from '../../../../tasks';
import { useAction } from '../../../../useAction';
import { useGetActionInput } from '../../../../configuration/context';
import type { FileDataItem } from '../../../../actions';

import { expandFolderToFiles, FileLimitError } from '../utils';
import { useDownloadView } from '../useDownloadView';

jest.mock('../../../../locationItems/context');
jest.mock('../../../../store');
jest.mock('../../../../useAction');
jest.mock('../../../../configuration/context');
jest.mock('aws-amplify', () => ({
  Amplify: { getConfig: jest.fn(() => ({})) },
}));
jest.mock('../utils', () => ({
  // Keep the real module (pure helpers like resolveArchiveName, FileLimitError)
  // and mock only the async folder expansion.
  ...jest.requireActual<typeof import('../utils')>('../utils'),
  expandFolderToFiles: jest.fn(),
}));

const fileItemA: LocationItemData = {
  key: 'test-prefix/test-file.txt',
  lastModified: new Date(),
  id: 'id-1',
  size: 10,
  type: 'FILE',
};
const fileItemB: LocationItemData = {
  key: 'test-prefix/deeply-nested/test-file.txt',
  lastModified: new Date(),
  id: 'id-2',
  size: 10,
  type: 'FILE',
};
const folderItem: LocationItemData = {
  key: 'test-prefix/my-folder/',
  id: 'folder-1',
  type: 'FOLDER',
};

describe('useDownloadView', () => {
  const mockUseAction = jest.mocked(useAction);
  const mockUseLocationItems = jest.mocked(useLocationItems);
  const mockUseStore = jest.mocked(useStore);
  const mockUseGetActionInput = jest.mocked(useGetActionInput);
  const mockExpandFolderToFiles = jest.mocked(expandFolderToFiles);

  const mockCancel = jest.fn();
  const mockStoreDispatch = jest.fn();
  const mockLocationItemsDispatch = jest.fn();
  const mockHandleDownload = jest.fn();
  const mockReset = jest.fn();
  const mockGetConfig = jest.fn();

  const setDataItems = (dataItems: LocationItemData[]) => {
    mockUseLocationItems.mockReturnValue([
      { dataItems } as never,
      mockLocationItemsDispatch,
    ]);
  };

  beforeEach(() => {
    setDataItems([fileItemA, fileItemB]);
    mockUseStore.mockReturnValue([
      {
        actionType: 'DOWNLOAD',
        location: {
          current: {
            prefix: 'test-prefix/',
            bucket: 'bucket',
            id: 'id',
            permissions: ['get'],
            type: 'PREFIX',
          },
          path: '',
          key: 'test-prefix/',
        },
      } as never,
      mockStoreDispatch,
    ]);
    mockUseGetActionInput.mockReturnValue(mockGetConfig);
    mockGetConfig.mockReturnValue({ bucket: 'bucket', region: 'us-east-1' });

    mockUseAction.mockReturnValue([
      {
        isProcessing: false,
        isProcessingComplete: false,
        reset: mockReset,
        statusCounts: { ...INITIAL_STATUS_COUNTS, QUEUED: 3, TOTAL: 3 },
        tasks: [
          {
            status: 'QUEUED',
            data: { key: 'test-item', id: 'id' },
            cancel: mockCancel,
            message: 'test-message',
            progress: undefined,
          },
          {
            status: 'QUEUED',
            data: { key: 'test-item2', id: 'id2' },
            cancel: mockCancel,
            message: 'test-message',
            progress: undefined,
          },
          {
            status: 'QUEUED',
            data: { key: 'test-item3', id: 'id3' },
            cancel: mockCancel,
            message: 'test-message',
            progress: undefined,
          },
        ],
      } as never,
      mockHandleDownload,
    ]);
  });

  afterEach(jest.clearAllMocks);

  it('should return the correct initial state', () => {
    const { result } = renderHook(() => useDownloadView());

    expect(result.current).toEqual(
      expect.objectContaining({
        enumerationStatus: 'SUCCEEDED',
        hasFilesToDownload: true,
        hasSelection: true,
        onActionCancel: expect.any(Function),
        onActionExit: expect.any(Function),
        onActionStart: expect.any(Function),
        tasks: expect.any(Array),
      })
    );

    expect(result.current.statusCounts).toEqual({
      CANCELED: 0,
      COMPLETE: 0,
      FAILED: 0,
      LOADED: 0,
      FINISHING: 0,
      OVERWRITE_PREVENTED: 0,
      PENDING: 0,
      QUEUED: 3,
      TOTAL: 3,
    });
  });

  it('dispatches immediately for a file-only selection (no enumeration)', () => {
    const { result } = renderHook(() => useDownloadView());

    act(() => {
      result.current.onActionStart();
    });

    expect(mockHandleDownload).toHaveBeenCalledTimes(1);
    expect(mockExpandFolderToFiles).not.toHaveBeenCalled();
  });

  it('provides resolved download items (with relativePath) to `useAction`', () => {
    renderHook(() => useDownloadView());

    const lastCall = mockUseAction.mock.calls.at(-1)!;
    expect(lastCall[0]).toBe('download');
    expect(lastCall[1]).toEqual(
      expect.objectContaining({
        concurrency: 1,
        items: [
          expect.objectContaining({
            key: 'test-prefix/test-file.txt',
            fileKey: 'test-file.txt',
            relativePath: 'test-file.txt',
            archiveName: 'test-prefix',
          }),
          expect.objectContaining({
            key: 'test-prefix/deeply-nested/test-file.txt',
            relativePath: 'deeply-nested/test-file.txt',
            archiveName: 'test-prefix',
          }),
        ],
      })
    );
  });

  it('auto-enumerates a folder selection on mount and populates items without clicking Start', async () => {
    setDataItems([fileItemA, folderItem]);
    mockExpandFolderToFiles.mockResolvedValue([
      {
        key: 'test-prefix/my-folder/nested.txt',
        id: 'expanded-1',
        fileKey: 'nested.txt',
        relativePath: 'my-folder/nested.txt',
        type: 'FILE',
        size: 5,
        lastModified: new Date(),
      },
    ] as never);

    const { result } = renderHook(() => useDownloadView());

    // enumeration is triggered on mount, NOT gated behind Start.
    expect(result.current.enumerationStatus).toBe('PENDING');

    await act(async () => {
      await Promise.resolve();
    });

    expect(mockExpandFolderToFiles).toHaveBeenCalledWith({
      folderKey: 'test-prefix/my-folder/',
      config: expect.any(Object),
      locationPrefix: 'test-prefix/',
      signal: expect.any(AbortSignal),
      // Counter is SHARED across the run and seeded with the loose file.
      fileCounter: { count: 1 },
    });
    expect(result.current.enumerationStatus).toBe('SUCCEEDED');

    // `resolvedItems` (fed to useAction) now includes the expanded folder file
    // WITHOUT the user having clicked Start.
    const lastCall = mockUseAction.mock.calls.at(-1)!;
    expect(lastCall[1]).toEqual(
      expect.objectContaining({
        items: expect.arrayContaining([
          expect.objectContaining({ relativePath: 'test-file.txt' }),
          expect.objectContaining({ relativePath: 'my-folder/nested.txt' }),
        ]),
      })
    );

    // Enumeration completing must NOT auto-start the download.
    expect(mockHandleDownload).not.toHaveBeenCalled();
  });

  it('does not auto-start the download when enumeration completes; only onActionStart dispatches', async () => {
    setDataItems([folderItem]);
    mockExpandFolderToFiles.mockResolvedValue([
      {
        key: 'test-prefix/my-folder/nested.txt',
        id: 'expanded-1',
        fileKey: 'nested.txt',
        relativePath: 'my-folder/nested.txt',
        type: 'FILE',
        size: 5,
        lastModified: new Date(),
      },
    ] as never);

    const { result } = renderHook(() => useDownloadView());

    await act(async () => {
      await Promise.resolve();
    });

    // Enumeration done, but the download has NOT started on its own.
    expect(result.current.enumerationStatus).toBe('SUCCEEDED');
    expect(mockHandleDownload).not.toHaveBeenCalled();

    // The user clicking Start is what dispatches the download.
    act(() => {
      result.current.onActionStart();
    });
    expect(mockHandleDownload).toHaveBeenCalledTimes(1);
  });

  it('is PENDING during mount enumeration and returns to NOT_STARTED on cancel without dispatching', async () => {
    setDataItems([folderItem]);
    // expansion hangs until we decide to resolve
    let resolveExpansion!: (v: never[]) => void;
    mockExpandFolderToFiles.mockImplementation(
      () =>
        new Promise((res) => {
          resolveExpansion = res as (v: never[]) => void;
        })
    );

    const { result } = renderHook(() => useDownloadView());

    // enumeration is kicked off on mount and is in-flight
    expect(result.current.enumerationStatus).toBe('PENDING');

    act(() => {
      result.current.onActionCancel();
    });
    // The folder was never cached, so cancel returns to NOT_STARTED (the retry
    // -able idle state), not SUCCEEDED.
    expect(result.current.enumerationStatus).toBe('NOT_STARTED');

    // Even if the (aborted) expansion later resolves, no dispatch occurs and
    // the state stays clean.
    await act(async () => {
      resolveExpansion([]);
      await Promise.resolve();
    });
    expect(mockHandleDownload).not.toHaveBeenCalled();
    expect(result.current.enumerationStatus).toBe('NOT_STARTED');
  });

  it('does not dispatch and does not warn when unmounted mid-enumeration', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    setDataItems([folderItem]);
    // expansion hangs until we resolve it after unmount
    let resolveExpansion!: (v: never[]) => void;
    mockExpandFolderToFiles.mockImplementation(
      () =>
        new Promise((res) => {
          resolveExpansion = res as (v: never[]) => void;
        })
    );

    const { result, unmount } = renderHook(() => useDownloadView());

    // enumeration is in-flight on mount
    expect(result.current.enumerationStatus).toBe('PENDING');

    // unmount aborts the in-flight enumeration via the effect cleanup
    unmount();

    // the (aborted) expansion resolving after unmount must be a no-op: the
    // aborted-signal guard returns before any setState, so no dispatch and no
    // "state update on an unmounted component" warning.
    await act(async () => {
      resolveExpansion([]);
      await Promise.resolve();
    });

    expect(mockHandleDownload).not.toHaveBeenCalled();
    expect(consoleErrorSpy).not.toHaveBeenCalledWith(
      expect.stringContaining('unmounted component'),
      expect.anything()
    );

    consoleErrorSpy.mockRestore();
  });

  it('returns to SUCCEEDED when the selection changes mid-enumeration to a file-only selection', async () => {
    setDataItems([folderItem]);
    // expansion hangs so enumeration stays in-flight while we change selection
    mockExpandFolderToFiles.mockImplementation(
      () => new Promise<never[]>(() => {})
    );

    const { result, rerender } = renderHook(() => useDownloadView());

    // enumeration is in-flight on mount
    expect(result.current.enumerationStatus).toBe('PENDING');

    // Selection changes to a file-only selection mid-enumeration. The effect
    // cleanup aborts the in-flight run, then the effect re-runs and hits the
    // `!hasFolders` early return, which defensively clears the pending flag.
    await act(async () => {
      setDataItems([fileItemA]);
      rerender();
      await Promise.resolve();
    });

    // file-only selection is always ready
    expect(result.current.enumerationStatus).toBe('SUCCEEDED');
    expect(mockHandleDownload).not.toHaveBeenCalled();
  });

  it('surfaces SUCCEEDED with no files to download for an empty folder (no rows, no auto-start)', async () => {
    setDataItems([folderItem]);
    mockExpandFolderToFiles.mockResolvedValue([] as never);

    const { result } = renderHook(() => useDownloadView());

    await act(async () => {
      await Promise.resolve();
    });

    // The empty folder is cached, so enumeration SUCCEEDED — the empty result
    // is surfaced through hasFilesToDownload (+ hasSelection for the message).
    expect(result.current.enumerationStatus).toBe('SUCCEEDED');
    expect(result.current.hasFilesToDownload).toBe(false);
    expect(result.current.hasSelection).toBe(true);
    // no resolved items -> no rows rendered
    const lastCall = mockUseAction.mock.calls.at(-1)!;
    expect(lastCall[1]).toEqual(expect.objectContaining({ items: [] }));
    // and it never auto-starts
    expect(mockHandleDownload).not.toHaveBeenCalled();
  });

  it('cancel during enumeration keeps Start from dispatching a partial set and retry recovers', async () => {
    setDataItems([folderItem]);
    // First (mount) enumeration hangs so we can cancel it mid-flight; it never
    // resolves, so the folder is never cached by this run.
    mockExpandFolderToFiles.mockImplementationOnce(
      () => new Promise<never[]>(() => {})
    );

    const { result } = renderHook(() => useDownloadView());
    expect(result.current.enumerationStatus).toBe('PENDING');

    // Cancel mid-enumeration -> back to NOT_STARTED: the folder was never
    // cached, so the selection is not ready and Start acts as a retry.
    act(() => {
      result.current.onActionCancel();
    });
    expect(result.current.enumerationStatus).toBe('NOT_STARTED');

    // Clicking Start with a still-uncached folder must NOT dispatch a partial
    // set (CORE INVARIANT) — it takes the retry path instead. Provide a
    // resolving mock so this retry recovers the folder.
    mockExpandFolderToFiles.mockResolvedValue([
      {
        key: 'test-prefix/my-folder/nested.txt',
        id: 'expanded-1',
        fileKey: 'nested.txt',
        relativePath: 'my-folder/nested.txt',
        type: 'FILE',
        size: 5,
        lastModified: new Date(),
      },
    ] as never);

    await act(async () => {
      result.current.onActionStart();
      await Promise.resolve();
    });
    // Retry re-ran enumeration (not a dispatch).
    expect(mockHandleDownload).not.toHaveBeenCalled();
    expect(result.current.enumerationStatus).toBe('SUCCEEDED');

    // Now every folder is expanded -> clicking Start dispatches exactly once.
    act(() => {
      result.current.onActionStart();
    });
    expect(mockHandleDownload).toHaveBeenCalledTimes(1);
  });

  it('enumeration error surfaces ERROR, disables dispatch, and retry recovers', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    setDataItems([folderItem]);
    mockExpandFolderToFiles.mockRejectedValueOnce(new Error('boom'));

    const { result } = renderHook(() => useDownloadView());
    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.enumerationStatus).toBe('ERROR');

    // Start while errored must NOT dispatch a partial set — it clears the error
    // and retries. Provide a resolving mock for the retry.
    mockExpandFolderToFiles.mockResolvedValue([
      {
        key: 'test-prefix/my-folder/nested.txt',
        id: 'expanded-1',
        fileKey: 'nested.txt',
        relativePath: 'my-folder/nested.txt',
        type: 'FILE',
        size: 5,
        lastModified: new Date(),
      },
    ] as never);

    await act(async () => {
      result.current.onActionStart();
      await Promise.resolve();
    });
    expect(mockHandleDownload).not.toHaveBeenCalled();
    // Retry recovered: the error cleared and every folder is now cached.
    expect(result.current.enumerationStatus).toBe('SUCCEEDED');

    // Ready now -> Start dispatches exactly once.
    act(() => {
      result.current.onActionStart();
    });
    expect(mockHandleDownload).toHaveBeenCalledTimes(1);

    consoleErrorSpy.mockRestore();
  });

  it('readiness gate for a mixed selection (one folder cached, one not)', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const folderItem2: LocationItemData = {
      key: 'test-prefix/other-folder/',
      id: 'folder-2',
      type: 'FOLDER',
    };
    setDataItems([folderItem, folderItem2]);

    // First folder resolves, second rejects -> only one gets cached.
    mockExpandFolderToFiles.mockImplementation(({ folderKey }) =>
      folderKey === 'test-prefix/my-folder/'
        ? (Promise.resolve([
            {
              key: 'test-prefix/my-folder/nested.txt',
              id: 'expanded-1',
              fileKey: 'nested.txt',
              relativePath: 'my-folder/nested.txt',
              type: 'FILE',
              size: 5,
              lastModified: new Date(),
            },
          ]) as never)
        : (Promise.reject(new Error('boom')) as never)
    );

    const { result } = renderHook(() => useDownloadView());
    await act(async () => {
      await Promise.resolve();
    });

    // Only one folder cached -> not ready; the rejection surfaced an error.
    expect(result.current.enumerationStatus).toBe('ERROR');

    // Second folder now resolves; the retry should re-expand ONLY the still
    // -uncached folder (the cached one is skipped).
    mockExpandFolderToFiles.mockReset();
    mockExpandFolderToFiles.mockResolvedValue([
      {
        key: 'test-prefix/other-folder/o.txt',
        id: 'expanded-2',
        fileKey: 'o.txt',
        relativePath: 'other-folder/o.txt',
        type: 'FILE',
        size: 7,
        lastModified: new Date(),
      },
    ] as never);

    await act(async () => {
      result.current.onActionStart();
      await Promise.resolve();
    });

    expect(result.current.enumerationStatus).toBe('SUCCEEDED');
    // Retry only re-expanded the uncached folder.
    expect(mockExpandFolderToFiles).toHaveBeenCalledTimes(1);
    expect(mockExpandFolderToFiles).toHaveBeenCalledWith({
      folderKey: 'test-prefix/other-folder/',
      config: expect.any(Object),
      locationPrefix: 'test-prefix/',
      signal: expect.any(AbortSignal),
      // Seeded with the already-cached my-folder expansion (1 file).
      fileCounter: { count: 1 },
    });

    // Fully ready -> Start dispatches exactly once.
    act(() => {
      result.current.onActionStart();
    });
    expect(mockHandleDownload).toHaveBeenCalledTimes(1);

    consoleErrorSpy.mockRestore();
  });

  it('should call cancel on tasks when onActionCancel is called (post-dispatch)', () => {
    const { result } = renderHook(() => useDownloadView());

    act(() => {
      result.current.onActionCancel();
    });

    expect(mockCancel).toHaveBeenCalledTimes(3);
  });

  it('should reset state when onActionExit is called', () => {
    const mockOnExit = jest.fn();
    const { result } = renderHook(() =>
      useDownloadView({ onExit: mockOnExit })
    );

    act(() => {
      result.current.onActionExit();
    });

    expect(mockOnExit).toHaveBeenCalledTimes(1);
    expect(mockLocationItemsDispatch).toHaveBeenCalledWith({
      type: 'RESET_LOCATION_ITEMS',
    });
    expect(mockStoreDispatch).toHaveBeenCalledWith({
      type: 'RESET_ACTION_TYPE',
    });
  });

  it('should not dispatch when current location is null', () => {
    mockUseStore.mockReturnValue([
      {
        actionType: 'DOWNLOAD',
        location: { current: undefined, path: '', key: '' },
      } as never,
      mockStoreDispatch,
    ]);

    const { result } = renderHook(() => useDownloadView());

    act(() => {
      result.current.onActionStart();
    });

    expect(mockHandleDownload).not.toHaveBeenCalled();
  });

  it('should handle tasks without cancel function in onActionCancel', () => {
    mockUseAction.mockReturnValue([
      {
        isProcessing: false,
        isProcessingComplete: false,
        reset: mockReset,
        statusCounts: INITIAL_STATUS_COUNTS,
        tasks: [
          { status: 'QUEUED', data: { key: 'test', id: 'id' } },
          {
            status: 'QUEUED',
            data: { key: 'test2', id: 'id2' },
            cancel: mockCancel,
          },
        ],
      } as never,
      mockHandleDownload,
    ]);

    const { result } = renderHook(() => useDownloadView());

    act(() => {
      result.current.onActionCancel();
    });

    expect(mockCancel).toHaveBeenCalledTimes(1);
  });

  it('should remove task when onTaskRemove is called', () => {
    const { result } = renderHook(() => useDownloadView());

    const mockTask = { data: { id: 'test-id' } } as Task<FileDataItem>;

    act(() => {
      result.current.onTaskRemove?.(mockTask);
    });

    expect(mockLocationItemsDispatch).toHaveBeenCalledWith({
      type: 'REMOVE_LOCATION_ITEM',
      id: 'test-id',
    });
  });

  it('onTaskRemove removes a folder-EXPANDED row from resolvedItems (was a no-op before)', async () => {
    setDataItems([folderItem]);
    mockExpandFolderToFiles.mockResolvedValue([
      {
        key: 'test-prefix/my-folder/nested.txt',
        id: 'expanded-1',
        fileKey: 'nested.txt',
        relativePath: 'my-folder/nested.txt',
        type: 'FILE',
        size: 5,
        lastModified: new Date(),
      },
    ] as never);

    const { result } = renderHook(() => useDownloadView());
    await act(async () => {
      await Promise.resolve();
    });

    // enumeration populated the expanded row
    expect(mockUseAction.mock.calls.at(-1)![1]).toEqual(
      expect.objectContaining({
        items: [expect.objectContaining({ id: 'expanded-1' })],
      })
    );

    // Removing the expanded row filters it out (the reducer path no-ops for it).
    act(() => {
      result.current.onTaskRemove?.({
        data: { id: 'expanded-1' },
      } as Task<FileDataItem>);
    });

    expect(mockUseAction.mock.calls.at(-1)![1]).toEqual(
      expect.objectContaining({ items: [] })
    );
    // REMOVE_LOCATION_ITEM is still dispatched (harmless no-op for expanded ids).
    expect(mockLocationItemsDispatch).toHaveBeenCalledWith({
      type: 'REMOVE_LOCATION_ITEM',
      id: 'expanded-1',
    });
    // an emptied ready set disables Start
    expect(result.current.hasFilesToDownload).toBe(false);
  });

  it('onTaskRemove on a loose file dispatches and filters it out of resolvedItems', () => {
    const { result } = renderHook(() => useDownloadView());

    // both loose files present initially
    expect(mockUseAction.mock.calls.at(-1)![1]).toEqual(
      expect.objectContaining({
        items: expect.arrayContaining([
          expect.objectContaining({ key: 'test-prefix/test-file.txt' }),
          expect.objectContaining({
            key: 'test-prefix/deeply-nested/test-file.txt',
          }),
        ]),
      })
    );

    act(() => {
      result.current.onTaskRemove?.({
        data: { id: 'id-1' },
      } as Task<FileDataItem>);
    });

    expect(mockLocationItemsDispatch).toHaveBeenCalledWith({
      type: 'REMOVE_LOCATION_ITEM',
      id: 'id-1',
    });
    // filtered out of the effective download set
    expect(mockUseAction.mock.calls.at(-1)![1]).toEqual(
      expect.objectContaining({
        items: [
          expect.objectContaining({
            key: 'test-prefix/deeply-nested/test-file.txt',
          }),
        ],
      })
    );
  });

  it('removing ALL rows leaves hasFilesToDownload false (Start disabled)', () => {
    const { result } = renderHook(() => useDownloadView());

    expect(result.current.hasFilesToDownload).toBe(true);

    act(() => {
      result.current.onTaskRemove?.({
        data: { id: 'id-1' },
      } as Task<FileDataItem>);
      result.current.onTaskRemove?.({
        data: { id: 'id-2' },
      } as Task<FileDataItem>);
    });

    expect(result.current.hasFilesToDownload).toBe(false);
    expect(mockUseAction.mock.calls.at(-1)![1]).toEqual(
      expect.objectContaining({ items: [] })
    );
  });

  it('resets removedItemIds on a selection change (removals do not leak into a new selection)', () => {
    const { result, rerender } = renderHook(() => useDownloadView());

    // remove one loose file
    act(() => {
      result.current.onTaskRemove?.({
        data: { id: 'id-1' },
      } as Task<FileDataItem>);
    });
    expect(mockUseAction.mock.calls.at(-1)![1]).toEqual(
      expect.objectContaining({
        items: [
          expect.objectContaining({
            key: 'test-prefix/deeply-nested/test-file.txt',
          }),
        ],
      })
    );

    // new selection (fresh array identity) that still contains the removed id
    act(() => {
      setDataItems([fileItemA, fileItemB]);
      rerender();
    });

    // the prior removal must NOT hide the item in the new selection
    expect(mockUseAction.mock.calls.at(-1)![1]).toEqual(
      expect.objectContaining({
        items: expect.arrayContaining([
          expect.objectContaining({ key: 'test-prefix/test-file.txt' }),
          expect.objectContaining({
            key: 'test-prefix/deeply-nested/test-file.txt',
          }),
        ]),
      })
    );
    expect(result.current.hasFilesToDownload).toBe(true);
  });

  it('provides empty items to `useAction` when dataItems is undefined', () => {
    mockUseLocationItems.mockReturnValue([
      {} as never,
      mockLocationItemsDispatch,
    ]);

    renderHook(() => useDownloadView());

    const lastCall = mockUseAction.mock.calls.at(-1)!;
    expect(lastCall[1]).toEqual(expect.objectContaining({ items: [] }));
  });

  it('surfaces OVER_LIMIT and blocks dispatch AND retry when the selection exceeds the file cap', async () => {
    setDataItems([folderItem]);
    mockExpandFolderToFiles.mockRejectedValueOnce(new FileLimitError());

    const { result, rerender } = renderHook(() => useDownloadView());
    await act(async () => {
      await Promise.resolve();
    });

    // OVER_LIMIT is a distinct terminal status (not PENDING, not ERROR); the
    // over-limit folder was never cached, so the selection is not ready either.
    expect(result.current.enumerationStatus).toBe('OVER_LIMIT');

    // Start must neither dispatch (a truncated zip would be data loss) nor
    // re-trigger enumeration (retry cannot succeed for the same selection).
    mockExpandFolderToFiles.mockClear();
    await act(async () => {
      result.current.onActionStart();
      await Promise.resolve();
    });
    expect(mockHandleDownload).not.toHaveBeenCalled();
    expect(mockExpandFolderToFiles).not.toHaveBeenCalled();

    // A selection change clears the over-limit flag.
    act(() => {
      setDataItems([fileItemA]);
      rerender();
    });
    expect(result.current.enumerationStatus).toBe('SUCCEEDED');
  });

  it('applies a removal that lands while enumeration is in flight (removal is never dropped)', async () => {
    setDataItems([folderItem]);
    // Controllable expansion so the removal can land mid-enumeration.
    let resolveExpansion!: (v: unknown) => void;
    mockExpandFolderToFiles.mockImplementation(
      () =>
        new Promise((res) => {
          resolveExpansion = res;
        }) as never
    );

    const { result } = renderHook(() => useDownloadView());
    expect(result.current.enumerationStatus).toBe('PENDING');

    // Removal lands while enumeration is still in flight (the expanded row
    // does not exist in resolvedItems yet).
    act(() => {
      result.current.onTaskRemove?.({
        data: { id: 'expanded-1' },
      } as Task<FileDataItem>);
    });

    // Enumeration completes AFTER the removal: the completion filter reads the
    // latest removals through removedItemIdsRef, so the removed id must be
    // absent from the resolved set.
    await act(async () => {
      resolveExpansion([
        {
          key: 'test-prefix/my-folder/nested.txt',
          id: 'expanded-1',
          fileKey: 'nested.txt',
          relativePath: 'my-folder/nested.txt',
          type: 'FILE',
          size: 5,
          lastModified: new Date(),
        },
        {
          key: 'test-prefix/my-folder/other.txt',
          id: 'expanded-2',
          fileKey: 'other.txt',
          relativePath: 'my-folder/other.txt',
          type: 'FILE',
          size: 7,
          lastModified: new Date(),
        },
      ]);
      await Promise.resolve();
    });

    expect(result.current.enumerationStatus).toBe('SUCCEEDED');
    expect(mockUseAction.mock.calls.at(-1)![1]).toEqual(
      expect.objectContaining({
        items: [expect.objectContaining({ id: 'expanded-2' })],
      })
    );
  });

  it('hasSelection is false on a bare mount with an empty selection', () => {
    setDataItems([]);

    const { result } = renderHook(() => useDownloadView());

    expect(result.current.hasSelection).toBe(false);
    expect(result.current.hasFilesToDownload).toBe(false);
    // vacuously ready: nothing to enumerate
    expect(result.current.enumerationStatus).toBe('SUCCEEDED');
  });

  it('hasSelection stays true after the user removes every row (selection was non-empty)', () => {
    const { result, rerender } = renderHook(() => useDownloadView());
    expect(result.current.hasSelection).toBe(true);

    act(() => {
      result.current.onTaskRemove?.({
        data: { id: 'id-1' },
      } as Task<FileDataItem>);
      result.current.onTaskRemove?.({
        data: { id: 'id-2' },
      } as Task<FileDataItem>);
    });
    // The reducer prunes loose items from the selection; simulate it emptying.
    act(() => {
      setDataItems([]);
      rerender();
    });

    expect(result.current.hasSelection).toBe(true);
    expect(result.current.hasFilesToDownload).toBe(false);
  });

  it('names the archive after the selected folder for a single-folder selection', async () => {
    setDataItems([
      { key: 'test-prefix/photos/', id: 'folder-photos', type: 'FOLDER' },
    ]);
    // Every expanded file lives in a DEEPER subfolder; the archive must still
    // be named after the folder the download was initiated from.
    mockExpandFolderToFiles.mockResolvedValue([
      {
        key: 'test-prefix/photos/vacation/1.jpg',
        id: 'expanded-1',
        fileKey: '1.jpg',
        relativePath: 'photos/vacation/1.jpg',
        type: 'FILE',
        size: 1,
        lastModified: new Date(),
      },
    ] as never);

    renderHook(() => useDownloadView());
    await act(async () => {
      await Promise.resolve();
    });

    expect(mockUseAction.mock.calls.at(-1)![1]).toEqual(
      expect.objectContaining({
        items: [expect.objectContaining({ archiveName: 'photos' })],
      })
    );
  });
});
