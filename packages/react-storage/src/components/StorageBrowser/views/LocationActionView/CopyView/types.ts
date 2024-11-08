import { CopyHandlerData } from '../../../actions';
import {
  ActionViewComponent,
  ActionViewProps,
  ActionViewState,
} from '../types';

export interface CopyViewState extends ActionViewState<CopyHandlerData> {
  destinationList: string[];
  onDestinationChange: (destination: string[]) => void;
}

export interface CopyViewProps
  extends ActionViewProps,
    Partial<CopyViewState> {}

export interface CopyViewComponent
  extends ActionViewComponent<CopyHandlerData, CopyViewProps> {}
