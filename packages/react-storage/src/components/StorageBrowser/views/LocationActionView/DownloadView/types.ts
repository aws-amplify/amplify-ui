import type { DownloadHandlerData, LocationData } from '../../../actions';
import type {
  ActionViewProps,
  ActionViewState,
  ActionViewType,
} from '../types';

export interface DownloadViewState
  extends ActionViewState<DownloadHandlerData> {}
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
