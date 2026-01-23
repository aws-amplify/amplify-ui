import type {
  FolderData,
  CopyHandlerData,
  LocationData,
} from '../../../actions';
import type { LocationState } from '../../../store';
import type { Task } from '../../../tasks';
import type {
  ActionViewType,
  ActionViewProps,
  ActionViewState,
} from '../types';

export interface CopyViewState extends ActionViewState<CopyHandlerData> {
  folders: FoldersState;
  destination: LocationState;
  hasNextPage: boolean;
  highestPageVisited: number;
  onPaginate: (page: number) => void;
  page: number;
  pageTasks: Task<CopyHandlerData>[];
  onSelectDestination: (location: LocationData, path?: string) => void;
}

export interface CopyViewProviderProps extends CopyViewState {
  children?: React.ReactNode;
}

export interface CopyViewProps extends ActionViewProps {
  /**
   * @description Number of items to display per page in folder listings
   * @default 100
   * @minimum 1
   */
  pageSize?: number;
}

export interface CopyViewType
  extends ActionViewType<CopyHandlerData, CopyViewProps> {
  Provider: (props: CopyViewProviderProps) => React.JSX.Element;
  Cancel: () => React.JSX.Element | null;
  Destination: () => React.JSX.Element | null;
  Exit: () => React.JSX.Element | null;
  FoldersLoadingIndicator: () => React.JSX.Element | null;
  FoldersMessage: () => React.JSX.Element | null;
  FoldersPagination: () => React.JSX.Element | null;
  FoldersSearch: () => React.JSX.Element | null;
  FoldersTable: () => React.JSX.Element | null;
  Message: () => React.JSX.Element | null;
  Start: () => React.JSX.Element | null;
  Statuses: () => React.JSX.Element | null;
  TasksTable: () => React.JSX.Element | null;
  Title: () => React.JSX.Element | null;
}

export interface UseCopyViewOptions {
  onExit?: (location?: LocationData) => void;
  pageSize?: number;
}

export interface FoldersState {
  hasError: boolean;
  hasNextPage: boolean;
  highestPageVisited: number;
  isLoading: boolean;
  message: string | undefined;
  page: number;
  pageItems: FolderData[];
  query: string;
  hasExhaustedSearch: boolean;
  onInitialize: () => void;
  onPaginate: (page: number) => void;
  onQuery: (value: string) => void;
  onSearch: () => void;
  onSearchClear: () => void;
  onSelectFolder: (id: string, folderLocationPath: string) => void;
}

export interface CopyViewState extends ActionViewState<CopyHandlerData> {
  folders: FoldersState;
  destination: LocationState;
  onSelectDestination: (location: LocationData, path?: string) => void;
}
