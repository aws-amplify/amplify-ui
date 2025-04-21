import type { CreateFolderHandlerData, LocationData } from '../../../actions';

import type {
  ActionViewType,
  ActionViewState,
  ActionViewProps,
} from '../types';

export interface CreateFolderViewState
  extends Omit<ActionViewState<CreateFolderHandlerData>, 'onActionCancel'> {
  folderName: string;
  folderNameId: string;
  onFolderNameChange: (folderName: string) => void;
}

export interface CreateFolderViewProps
  extends ActionViewProps,
    Partial<CreateFolderViewState> {}

export interface CreateFolderViewProviderProps extends CreateFolderViewState {
  children?: React.ReactNode;
}

export interface CreateFolderViewType
  extends ActionViewType<CreateFolderHandlerData, CreateFolderViewProps> {
  Provider: (props: CreateFolderViewProviderProps) => React.JSX.Element;
  Exit: () => React.JSX.Element | null;
  NameField: () => React.JSX.Element | null;
  Message: () => React.JSX.Element | null;
  Start: () => React.JSX.Element | null;
  Title: () => React.JSX.Element | null;
}

export interface UseCreateFolderViewOptions {
  onExit?: (location?: LocationData) => void;
}
