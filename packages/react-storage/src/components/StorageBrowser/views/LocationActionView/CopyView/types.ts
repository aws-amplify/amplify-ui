import { FolderData, CopyHandlerData, LocationData } from '../../../actions';
import {
  ActionViewComponent,
  ActionViewProps,
  ActionViewState,
} from '../types';

export interface CopyViewState extends ActionViewState<CopyHandlerData> {
  folders: FoldersState;
  destinationList: string[];
  onDestinationChange: (destination: string[]) => void;
}

export interface CopyViewProviderProps extends CopyViewState {
  children?: React.ReactNode;
}

export interface CopyViewProps extends ActionViewProps {}

export interface CopyViewComponent
  extends ActionViewComponent<CopyHandlerData, CopyViewProps> {}

export interface UseCopyViewOptions {
  onExit?: (location?: LocationData) => void;
}

export interface FoldersState {
  hasError: boolean;
  hasInitialized: boolean;
  hasNextPage: boolean;
  highestPageVisited: number;
  isLoading: boolean;
  message: string | undefined;
  page: number;
  onInitialize: () => void;
  pageItems: FolderData[];
  query: string;
  onSelect: (name: string) => void;
  onPaginate: (page: number) => void;
  onQuery: (value: string) => void;
  onSearch: () => void;
  onSearchClear: () => void;
}
