import { DeleteHandlerData, LocationData } from '../../../actions';
import {
  ActionViewComponent,
  ActionViewProps,
  ActionViewState,
} from '../types';

export interface DeleteViewState extends ActionViewState<DeleteHandlerData> {}

export interface DeleteViewProps
  extends ActionViewProps,
    Partial<DeleteViewState> {}

export interface DeleteViewComponent
  extends ActionViewComponent<DeleteHandlerData, DeleteViewProps> {}

export interface UseDeleteViewOptions {
  onExit?: (location?: LocationData) => void;
}
