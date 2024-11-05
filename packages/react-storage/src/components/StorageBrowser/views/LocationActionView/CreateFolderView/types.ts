import { CopyHandlerData } from '../../../actions';
import {
  ActionViewComponent,
  ActionViewState,
  ActionViewProps,
} from '../types';

export interface CreateFolderViewState
  extends ActionViewState<CopyHandlerData> {
  onDestinationChange: (destination: string) => void;
}

export interface CreateFolderViewProps
  extends ActionViewProps,
    Partial<CreateFolderViewState> {}

export interface CreateFolderViewComponent
  extends ActionViewComponent<CopyHandlerData, CreateFolderViewProps> {}
