import { EmptyMessageControl } from './EmptyMessage';
import { ExitControl } from './Exit';
import { LoadingControl } from './Loading';
import { MessageControl } from './Message';
import { OverwriteControl } from './Overwrite';
import { TitleControl } from './Title';

export interface Controls {
  EmptyMessage: typeof EmptyMessageControl;
  Exit: typeof ExitControl;
  Loading: typeof LoadingControl;
  Message: typeof MessageControl;
  Overwrite: typeof OverwriteControl;
  Title: typeof TitleControl;
}

export const Controls: Controls = {
  EmptyMessage: EmptyMessageControl,
  Exit: ExitControl,
  Loading: LoadingControl,
  Message: MessageControl,
  Overwrite: OverwriteControl,
  Title: TitleControl,
};
