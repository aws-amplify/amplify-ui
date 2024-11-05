import { CopyHandlerData } from '../../../actions';
import {
  ActionViewComponent,
  ActionViewProps,
  ActionViewState,
} from '../types';

export interface CopyViewState extends ActionViewState<CopyHandlerData> {
  onOverwriteChange: (enabled: boolean) => void;
}

export interface CopyViewProps
  extends ActionViewProps,
    Partial<CopyViewState> {}

export interface CopyViewComponent
  extends ActionViewComponent<CopyHandlerData, CopyViewProps> {}
