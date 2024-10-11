import { CancelControl } from './Cancel';
import { DownloadControl } from './Download';
import { EmptyMessageControl } from './EmptyMessage';
import { ExitControl } from './Exit';
import { LoadingControl } from './Loading';
import { MessageControl } from './Message';
import { NavigateControl } from './Navigate';
import { OverwriteControl } from './Overwrite';
import { PaginateControl } from './Paginate';
import { PrimaryControl } from './Primary';
import { RefreshControl } from './Refresh';
import { SearchControl } from './Search';
import { TableControl } from './Table';
import { TitleControl } from './Title';

export interface Controls {
  Cancel: typeof CancelControl;
  Download: typeof DownloadControl;
  EmptyMessage: typeof EmptyMessageControl;
  Exit: typeof ExitControl;
  Loading: typeof LoadingControl;
  Message: typeof MessageControl;
  Overwrite: typeof OverwriteControl;
  Paginate: typeof PaginateControl;
  Primary: typeof PrimaryControl;
  Navigate: typeof NavigateControl;
  Refresh: typeof RefreshControl;
  Search: typeof SearchControl;
  Table: typeof TableControl;
  Title: typeof TitleControl;
}

export const Controls: Controls = {
  Cancel: CancelControl,
  Download: DownloadControl,
  EmptyMessage: EmptyMessageControl,
  Exit: ExitControl,
  Loading: LoadingControl,
  Message: MessageControl,
  Overwrite: OverwriteControl,
  Paginate: PaginateControl,
  Primary: PrimaryControl,
  Navigate: NavigateControl,
  Refresh: RefreshControl,
  Search: SearchControl,
  Table: TableControl,
  Title: TitleControl,
};
