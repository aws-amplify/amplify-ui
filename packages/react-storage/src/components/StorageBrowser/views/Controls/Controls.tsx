import { DownloadControl } from './Download';
import { EmptyMessageControl } from './EmptyMessage';
import { ExitControl } from './Exit';
import { LoadingControl } from './Loading';
import { MessageControl } from './Message';
import { NavigateControl } from './Navigate';
import { OverwriteControl } from './Overwrite';
import { PaginateControl } from './Paginate';
import { SearchControl } from './Search';
import { TableControl } from './Table';
import { TitleControl } from './Title';

export interface Controls {
  Download: typeof DownloadControl;
  EmptyMessage: typeof EmptyMessageControl;
  Exit: typeof ExitControl;
  Loading: typeof LoadingControl;
  Message: typeof MessageControl;
  Overwrite: typeof OverwriteControl;
  Paginate: typeof PaginateControl;
  Navigate: typeof NavigateControl;
  Search: typeof SearchControl;
  Table: typeof TableControl;
  Title: typeof TitleControl;
}

export const Controls: Controls = {
  Download: DownloadControl,
  EmptyMessage: EmptyMessageControl,
  Exit: ExitControl,
  Loading: LoadingControl,
  Message: MessageControl,
  Overwrite: OverwriteControl,
  Paginate: PaginateControl,
  Navigate: NavigateControl,
  Search: SearchControl,
  Table: TableControl,
  Title: TitleControl,
};
