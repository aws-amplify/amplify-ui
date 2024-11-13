import { EmptyMessageControl } from './EmptyMessage';
import { MessageControl } from './Message';
import { OverwriteControl } from './Overwrite';

export interface Controls {
  EmptyMessage: typeof EmptyMessageControl;
  Message: typeof MessageControl;
  Overwrite: typeof OverwriteControl;
}

export const Controls: Controls = {
  EmptyMessage: EmptyMessageControl,
  Message: MessageControl,
  Overwrite: OverwriteControl,
};
