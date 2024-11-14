import { CopyHandlerData, LocationData } from '../../../actions';
import {
  ActionViewComponent,
  ActionViewProps,
  ActionViewState,
} from '../types';

export interface CopyViewState extends ActionViewState<CopyHandlerData> {
  destinationList: string[];
  onDestinationChange: (destination: string[]) => void;
}

export interface CopyViewProviderProps extends CopyViewState {
  children?: React.ReactNode;
}

export interface CopyViewProps extends ActionViewProps {}

export interface CopyViewComponent
  extends ActionViewComponent<CopyHandlerData, CopyViewProps> {}

export interface UseCopyViewOptions {
  onExit?: (location?: LocationData) => void;
}
