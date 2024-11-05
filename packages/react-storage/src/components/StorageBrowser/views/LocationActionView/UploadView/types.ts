import { UploadHandlerData } from '../../../actions';
import {
  ActionViewComponent,
  ActionViewProps,
  ActionViewState,
} from '../types';

export interface UploadViewState extends ActionViewState<UploadHandlerData> {
  onOverwriteChange: (enabled: boolean) => void;
}

export interface UploadViewProps
  extends ActionViewProps,
    Partial<UploadViewState> {}

export interface UploadViewComponent
  extends ActionViewComponent<UploadHandlerData, UploadViewProps> {}
