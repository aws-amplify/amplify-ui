import {
  ActionViewComponent,
  ActionViewProps,
  ActionViewState,
} from '../types';

export interface CopyViewState extends ActionViewState<any> {
  onOverwriteChange: (enabled: boolean) => void;
}

export interface CopyViewProps
  extends ActionViewProps,
    Partial<CopyViewState> {}

export interface CopyViewComponent extends ActionViewComponent<CopyViewProps> {}
