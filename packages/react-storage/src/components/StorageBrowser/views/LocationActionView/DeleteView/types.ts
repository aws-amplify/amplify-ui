import {
  ActionViewComponent,
  ActionViewProps,
  ActionViewState,
} from '../types';

export interface DeleteViewState extends ActionViewState<string> {
  disableCancel: boolean;
  disableClose: boolean;
  disableStart: boolean;
}

export interface DeleteViewProps
  extends ActionViewProps,
    Partial<DeleteViewState> {}

export interface DeleteViewComponent
  extends ActionViewComponent<DeleteViewProps> {}
