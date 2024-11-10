import { CopyHandlerData, CreateFolderHandlerData } from '../../../actions';

import {
  ActionViewComponent,
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

export interface CreateFolderViewComponent
  extends ActionViewComponent<CopyHandlerData, CreateFolderViewProps> {}
