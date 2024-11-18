import { MessageControl } from './Message';

export interface Controls {
  Message: typeof MessageControl;
}

export const Controls: Controls = {
  Message: MessageControl,
};
