import { EmptyMessageControl } from './EmptyMessage';
import { MessageControl } from './Message';

export interface Controls {
  EmptyMessage: typeof EmptyMessageControl;
  Message: typeof MessageControl;
}

export const Controls: Controls = {
  EmptyMessage: EmptyMessageControl,
  Message: MessageControl,
};
