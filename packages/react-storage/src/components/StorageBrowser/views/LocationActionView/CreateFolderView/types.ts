import { CopyHandlerData, CreateFolderHandlerData } from '../../../actions';
import { Task } from '../../../tasks';
import {
  ActionViewComponent,
  ActionViewState,
  ActionViewProps,
} from '../types';

export interface CreateFolderViewState
  extends Omit<
    ActionViewState<CreateFolderHandlerData>,
    'onActionCancel' | 'tasks'
  > {
  folderName: string;
  onFolderNameChange: (folderName: string) => void;
  task: Task<CreateFolderHandlerData> | undefined;
}

export interface CreateFolderViewProps
  extends ActionViewProps,
    Partial<CreateFolderViewState> {}

export interface CreateFolderViewComponent
  extends ActionViewComponent<CopyHandlerData, CreateFolderViewProps> {}
