import { EmptyMessageControl } from './EmptyMessage';
import { ExitControl } from './Exit';
import { LoadingControl } from './Loading';
import { MessageControl } from './Message';
import { OverwriteControl } from './Overwrite';
import { PaginateControl } from './Paginate';
import { SearchControl } from './Search';
import { TitleControl } from './Title';

export interface Controls {
  EmptyMessage: typeof EmptyMessageControl;
  Exit: typeof ExitControl;
  Loading: typeof LoadingControl;
  Message: typeof MessageControl;
  Overwrite: typeof OverwriteControl;
  Paginate: typeof PaginateControl;
  Search: typeof SearchControl;
  Title: typeof TitleControl;
}

export const Controls: Controls = {
  EmptyMessage: EmptyMessageControl,
  Exit: ExitControl,
  Loading: LoadingControl,
  Message: MessageControl,
  Overwrite: OverwriteControl,
  Paginate: PaginateControl,
  Search: SearchControl,
  Title: TitleControl,
};
