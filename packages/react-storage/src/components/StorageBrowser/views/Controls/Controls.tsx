import { DownloadControl } from './Download';
import { EmptyMessageControl } from './EmptyMessage';
import { ExitControl } from './Exit';
import { LoadingControl } from './Loading';
import { MessageControl } from './Message';
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
  Search: SearchControl,
  Table: TableControl,
  Title: TitleControl,
};
