import type { DeleteHandlerData, LocationData } from '../../../actions';
import type { Task } from '../../../tasks';
import type {
  ActionViewType,
  ActionViewProps,
  ActionViewState,
} from '../types';

export interface DeleteViewState extends ActionViewState<DeleteHandlerData> {
  hasNextPage: boolean;
  highestPageVisited: number;
  onPaginate: (page: number) => void;
  page: number;
  pageTasks: Task<DeleteHandlerData>[];
}

export interface DeleteViewProps extends ActionViewProps {
  /**
   * @description Number of items to display per page in task listings
   * @default 100
   * @minimum 1
   */
  pageSize?: number;
}

export interface DeleteViewProviderProps extends DeleteViewState {
  children?: React.ReactNode;
}

export interface DeleteViewType
  extends ActionViewType<DeleteHandlerData, DeleteViewProps> {
  Provider: (props: DeleteViewProviderProps) => React.JSX.Element;
  Cancel: () => React.JSX.Element | null;
  Exit: () => React.JSX.Element | null;
  Message: () => React.JSX.Element | null;
  Pagination: () => React.JSX.Element | null;
  Start: () => React.JSX.Element | null;
  Statuses: () => React.JSX.Element | null;
  TasksTable: () => React.JSX.Element | null;
  Title: () => React.JSX.Element | null;
}

export interface UseDeleteViewOptions {
  onExit?: (location?: LocationData) => void;
  pageSize?: number;
}
