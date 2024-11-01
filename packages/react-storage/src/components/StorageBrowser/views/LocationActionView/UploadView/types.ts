import {
  ActionViewComponent,
  ActionViewProps,
  ActionViewState,
} from '../types';

export interface UploadViewState extends ActionViewState<File> {
  onOverwriteChange: (enabled: boolean) => void;
}

export interface UploadViewProps
  extends ActionViewProps,
    Partial<UploadViewState> {}

export interface UploadViewComponent
  extends ActionViewComponent<UploadViewProps> {}
