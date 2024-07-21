import { StorageBrowserElements } from '../../context/elements';
import { ActionSelectControl } from './ActionSelect';
import { DividerControl } from './Divider';
import { MessageControl } from './Message';
import { NavigateControl } from './Navigate';
import { PaginateControl } from './Paginate';
import { RefreshControl } from './Refresh';
import { SearchControl } from './Search';
import { SummaryControl } from './Summary';
import { TableControl } from './Table';
import { TitleControl } from './Title';

export interface Controls<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  ActionSelect: ActionSelectControl<T>;
  Divider: DividerControl<T>;
  Message: MessageControl<T>;
  Refresh: RefreshControl<T>;
  Search: SearchControl<T>;
  Paginate: PaginateControl<T>;
  Navigate: NavigateControl<T>;
  Summary: SummaryControl<T>;
  Table: TableControl<T>;
  Title: TitleControl<T>;
}

export const Controls: Controls = {
  ActionSelect: ActionSelectControl,
  Divider: DividerControl,
  Message: MessageControl,
  Refresh: RefreshControl,
  Search: SearchControl,
  Paginate: PaginateControl,
  Navigate: NavigateControl,
  Summary: SummaryControl,
  Table: TableControl,
  Title: TitleControl,
};
