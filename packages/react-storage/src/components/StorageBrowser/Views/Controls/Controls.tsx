import { StorageBrowserElements } from '../../context/elements';

import { ActionSelectControl } from './ActionSelect';
import { CancelControl } from './Cancel';
import { DownloadControl } from './Download';
import { EmptyMessageControl } from './EmptyMessage';
import { ExitControl } from './Exit';
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
  EmptyMessage: EmptyMessageControl<T>;
  Exit: ExitControl<T>;
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
  ActionSelect: ActionSelectControl,
  Cancel: CancelControl,
  Download: DownloadControl,
  EmptyMessage: EmptyMessageControl,
  Exit: ExitControl,
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
