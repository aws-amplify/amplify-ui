import {
  ActionViewComponent,
  ActionViewState,
  ActionViewProps,
} from '../types';

export interface CreateFolderViewState extends ActionViewState<string> {
  onDestinationChange: (destination: string) => void;
}

export interface CreateFolderViewProps
  extends ActionViewProps,
    Partial<CreateFolderViewState> {}

export interface CreateFolderViewComponent
  extends ActionViewComponent<CreateFolderViewProps> {}
