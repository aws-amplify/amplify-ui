import type { DownloadHandlerData, LocationData } from '../../../actions';
import type {
  ActionViewProps,
  ActionViewState,
  ActionViewType,
} from '../types';

/**
 * Status of the pre-dispatch folder enumeration phase (expanding selected
 * folders into their files before a zip download can start):
 *
 * - `'NOT_STARTED'`: some selected folders are not yet expanded and no
 *   enumeration is running (initial pre-effect state, and the state after the
 *   user cancels an in-flight enumeration). Start acts as a RETRY trigger.
 * - `'PENDING'`: enumeration is in flight. Start is disabled and a "listing
 *   files" message is shown; Cancel aborts back to `'NOT_STARTED'`.
 * - `'SUCCEEDED'`: every selected folder has been expanded into its files, or
 *   the selection contains no folders (files are always ready). This is the
 *   ONLY status in which Start may dispatch the download — the
 *   no-partial-dispatch guard lives in `onActionStart`.
 * - `'ERROR'`: enumeration failed for a non-abort reason (e.g. a `list()`
 *   error). An error message is shown and Start acts as a RETRY trigger.
 * - `'OVER_LIMIT'`: the combined expanded file count of the selection exceeds
 *   the per-download maximum (`LARGE_DOWNLOAD_FILE_COUNT`). Dispatch AND retry
 *   are blocked (a truncated zip would be silent data loss, and re-enumerating
 *   the same selection would hit the cap again); the user must download
 *   folders in smaller batches instead.
 */
export type DownloadEnumerationStatus =
  | 'NOT_STARTED'
  | 'PENDING'
  | 'SUCCEEDED'
  | 'ERROR'
  | 'OVER_LIMIT';

export interface DownloadViewState
  extends ActionViewState<DownloadHandlerData> {
  /**
   * status of the pre-dispatch folder enumeration phase, see
   * {@link DownloadEnumerationStatus}
   */
  enumerationStatus: DownloadEnumerationStatus;
  /**
   * `true` when the effective (post-removal) download set is non-empty. Start
   * is disabled in the `'SUCCEEDED'` state when this is `false` (e.g. only
   * empty folders were selected, or every row was removed via `onTaskRemove`).
   */
  hasFilesToDownload: boolean;
  /**
   * `true` once the selection has been non-empty at any point in this mount.
   * Used to scope the "no files" message so it never shows on a bare mount
   * with an empty selection, while still showing after the user manually
   * removes every row.
   */
  hasSelection: boolean;
}
export interface DownloadViewProps extends ActionViewProps {}
export interface UseDownloadViewOptions {
  onExit?: (location?: LocationData) => void;
}

export interface DownloadViewProviderProps extends DownloadViewState {
  children?: React.ReactNode;
}

export interface DownloadViewType
  extends ActionViewType<DownloadHandlerData, DownloadViewProps> {
  Provider: (props: DownloadViewProviderProps) => React.JSX.Element;
  Cancel: () => React.JSX.Element | null;
  Exit: () => React.JSX.Element | null;
  Message: () => React.JSX.Element | null;
  Start: () => React.JSX.Element | null;
  Statuses: () => React.JSX.Element | null;
  TasksTable: () => React.JSX.Element | null;
  Title: () => React.JSX.Element | null;
}
