import { StorageBrowserElements } from '../../context/elements';

import { CancelControl } from './Cancel';
import { DownloadControl } from './Download';
import { EmptyMessageControl } from './EmptyMessage';
import { ExitControl } from './Exit';
import { LoadingControl } from './Loading';
import { MessageControl } from './Message';
import { NavigateControl } from './Navigate';
import { PaginateControl } from './Paginate';
import { PrimaryControl } from './Primary';
import { RefreshControl } from './Refresh';
import { SearchControl } from './Search';
import { SummaryControl } from './Summary';
import { TableControl } from './Table';
import { TargetControl } from './Target';
import { TitleControl } from './Title';

export interface Controls<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  Cancel: typeof CancelControl;
  Download: typeof DownloadControl;
  EmptyMessage: typeof EmptyMessageControl;
  Exit: typeof ExitControl;
  Loading: LoadingControl<T>;
  Message: typeof MessageControl;
  Paginate: PaginateControl<T>;
  Primary: typeof PrimaryControl;
  Navigate: NavigateControl<T>;
  Refresh: typeof RefreshControl;
  Search: typeof SearchControl;
  Summary: SummaryControl<T>;
  Table: TableControl<T>;
  Target: TargetControl<T>;
  Title: TitleControl<T>;
}

export const Controls: Controls = {
  Cancel: CancelControl,
  Download: DownloadControl,
  EmptyMessage: EmptyMessageControl,
  Exit: ExitControl,
  Loading: LoadingControl,
  Message: MessageControl,
  Paginate: PaginateControl,
  Primary: PrimaryControl,
  Navigate: NavigateControl,
  Refresh: RefreshControl,
  Search: SearchControl,
  Summary: SummaryControl,
  Table: TableControl,
  Target: TargetControl,
  Title: TitleControl,
};
