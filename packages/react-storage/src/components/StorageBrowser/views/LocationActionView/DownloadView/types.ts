import type { DownloadHandlerData, LocationData } from '../../../actions';
import type { Task } from '../../../tasks';
import type {
  ActionViewProps,
  ActionViewState,
  ActionViewType,
} from '../types';

export interface DownloadViewState
  extends ActionViewState<DownloadHandlerData> {
  hasNextPage: boolean;
  highestPageVisited: number;
  onPaginate: (page: number) => void;
  page: number;
  pageTasks: Task<DownloadHandlerData>[];
}
export interface DownloadViewProps extends ActionViewProps {
  /**
   * @description Number of items to display per page in task listings
   * @default 100
   * @minimum 1
   */
  pageSize?: number;
}
export interface UseDownloadViewOptions {
  onExit?: (location?: LocationData) => void;
  pageSize?: number;
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
  Pagination: () => React.JSX.Element | null;
  Start: () => React.JSX.Element | null;
  Statuses: () => React.JSX.Element | null;
  TasksTable: () => React.JSX.Element | null;
  Title: () => React.JSX.Element | null;
}
