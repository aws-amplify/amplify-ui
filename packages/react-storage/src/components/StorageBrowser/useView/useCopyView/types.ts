import { FolderData, CopyHandlerData, LocationData } from '../../actions';
import { LocationState } from '../../providers/store/location';
import { ActionViewState } from '../types';

export interface CopyViewState extends ActionViewState<CopyHandlerData> {
  folders: FoldersState;
  destination: LocationState;
  onSelectDestination: (location: LocationData, path?: string) => void;
}
