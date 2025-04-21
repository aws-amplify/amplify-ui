import { DownloadHandlerData, LocationData } from '../../../actions';
import { ActionViewProps, ActionViewState, ActionViewType } from '../types';

export interface DownloadMultipleViewState
  extends ActionViewState<DownloadHandlerData> {}
export interface DownloadMultipleViewProps extends ActionViewProps {}
export interface UseDownloadMultipleViewOptions {
  onExit?: (location?: LocationData) => void;
}

export interface DownloadMultipleViewProviderProps
  extends DownloadMultipleViewState {
  children?: React.ReactNode;
}

export interface DownloadMultipleViewType
  extends ActionViewType<DownloadHandlerData, DownloadMultipleViewProps> {
  Provider: (props: DownloadMultipleViewProviderProps) => React.JSX.Element;
  Cancel: () => React.JSX.Element | null;
  Exit: () => React.JSX.Element | null;
  Message: () => React.JSX.Element | null;
  Start: () => React.JSX.Element | null;
  Statuses: () => React.JSX.Element | null;
  TasksTable: () => React.JSX.Element | null;
  Title: () => React.JSX.Element | null;
}
