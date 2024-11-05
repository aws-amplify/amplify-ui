import { DeleteHandlerData } from '../../../actions';
import {
  ActionViewComponent,
  ActionViewProps,
  ActionViewState,
} from '../types';

export interface DeleteViewState extends ActionViewState<DeleteHandlerData> {
  disableCancel: boolean;
  disableClose: boolean;
  disablePrimary: boolean;
}

export interface DeleteViewProps
  extends ActionViewProps,
    Partial<DeleteViewState> {}

export interface DeleteViewComponent
  extends ActionViewComponent<DeleteHandlerData, DeleteViewProps> {}
