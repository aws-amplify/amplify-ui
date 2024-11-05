import { CopyHandlerData } from '../../../actions';
import {
  ActionViewComponent,
  ActionViewProps,
  ActionViewState,
} from '../types';

export interface CopyViewState
  extends ActionViewState<{
    destinationPrefix: string;
  }> {
  destinationList: string[];
  onSetDestinationList: (destination: string[]) => void;
  disableCancel: boolean;
  disableClose: boolean;
  disablePrimary: boolean;
}

export interface CopyViewProps
  extends ActionViewProps,
    Partial<CopyViewState> {}

export interface CopyViewComponent
  extends ActionViewComponent<CopyHandlerData, CopyViewProps> {}
