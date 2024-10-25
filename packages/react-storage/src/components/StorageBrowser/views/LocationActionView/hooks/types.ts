import { ControlsContext } from '../../../controls/types';

export interface UseActionView {
  controlsContextValue: ControlsContext;
  disableCancel: boolean;
  disableClose: boolean;
  disablePrimary: boolean;
  onCancel: () => void;
  onClose: () => void;
  onStart: () => void;
}
