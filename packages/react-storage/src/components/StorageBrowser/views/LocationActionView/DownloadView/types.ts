import type { DownloadHandlerData, LocationData } from '../../../actions';
import type {
  ActionViewProps,
  ActionViewState,
  ActionViewType,
} from '../types';

export interface DownloadViewState
  extends ActionViewState<DownloadHandlerData> {
  /**
   * `true` while folder selections are being expanded into their files (the
   * pre-dispatch enumeration phase). During this phase the Start control is
   * disabled and a "listing files" message is shown.
   */
  isEnumerating: boolean;
  /**
   * `true` when enumeration completed but produced zero downloadable files
   * (e.g. only empty folders were selected). No zip is started in this case.
   */
  hasNoFilesToDownload: boolean;
  /**
   * `true` when the effective (post-removal) download set is non-empty. Start is
   * disabled in a ready/idle state when this is `false` (e.g. every row was
   * removed via `onTaskRemove`). Distinct from `hasNoFilesToDownload`, which
   * flags empty folders detected during enumeration.
   */
  hasFilesToDownload: boolean;
  /**
   * `true` when the pre-dispatch folder enumeration failed for a non-abort
   * reason (e.g. a `list()` error). Surfaced so the view can indicate failure
   * rather than silently re-enabling the Start control.
   */
  isEnumerationError: boolean;
  /**
   * `true` when every selected folder has been expanded into its files (the
   * download-readiness gate). Files are always ready; folders become ready only
   * once enumeration has cached their contents. Start must not dispatch a
   * partial set while this is false — the guard lives in `onActionStart`.
   */
  allFoldersReady: boolean;
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
