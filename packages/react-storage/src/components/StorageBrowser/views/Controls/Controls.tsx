import { EmptyMessageControl } from './EmptyMessage';
import { LoadingControl } from './Loading';
import { MessageControl } from './Message';
import { OverwriteControl } from './Overwrite';
import { PaginateControl } from './Paginate';

export interface Controls {
  EmptyMessage: typeof EmptyMessageControl;
  Loading: typeof LoadingControl;
  Message: typeof MessageControl;
  Overwrite: typeof OverwriteControl;
  Paginate: typeof PaginateControl;
}

export const Controls: Controls = {
  EmptyMessage: EmptyMessageControl,
  Loading: LoadingControl,
  Message: MessageControl,
  Overwrite: OverwriteControl,
  Paginate: PaginateControl,
};
