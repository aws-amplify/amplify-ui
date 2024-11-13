import { EmptyMessageControl } from './EmptyMessage';
import { LoadingControl } from './Loading';
import { MessageControl } from './Message';
import { OverwriteControl } from './Overwrite';

export interface Controls {
  EmptyMessage: typeof EmptyMessageControl;
  Loading: typeof LoadingControl;
  Message: typeof MessageControl;
  Overwrite: typeof OverwriteControl;
}

export const Controls: Controls = {
  EmptyMessage: EmptyMessageControl,
  Loading: LoadingControl,
  Message: MessageControl,
  Overwrite: OverwriteControl,
};
