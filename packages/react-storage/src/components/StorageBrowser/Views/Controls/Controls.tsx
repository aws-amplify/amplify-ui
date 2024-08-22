import { StorageBrowserElements } from '../../context/elements';

import { ActionSelectControl } from './ActionSelect';
import { CancelControl } from './Cancel';
import { DownloadControl } from './Download';
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
  ActionSelect: ActionSelectControl<T>;
  Cancel: CancelControl<T>;
  Download: DownloadControl<T>;
  Exit: ExitControl<T>;
  Loading: LoadingControl<T>;
  Message: MessageControl<T>;
  Paginate: PaginateControl<T>;
  Primary: PrimaryControl<T>;
  Navigate: NavigateControl<T>;
  Refresh: RefreshControl<T>;
  Search: SearchControl<T>;
  Summary: SummaryControl<T>;
  Table: TableControl<T>;
  Target: TargetControl<T>;
  Title: TitleControl<T>;
}

export const Controls: Controls = {
  Exit: ExitControl,
  ActionSelect: ActionSelectControl,
  Cancel: CancelControl,
  Download: DownloadControl,
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
