import { EmptyMessageControl } from './EmptyMessage';
import { LoadingControl } from './Loading';
import { MessageControl } from './Message';

export interface Controls {
  EmptyMessage: typeof EmptyMessageControl;
  Loading: typeof LoadingControl;
  Message: typeof MessageControl;
}

export const Controls: Controls = {
  EmptyMessage: EmptyMessageControl,
  Loading: LoadingControl,
  Message: MessageControl,
};
