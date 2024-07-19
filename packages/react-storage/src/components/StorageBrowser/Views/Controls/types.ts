import React from 'react';
import { StorageBrowserElements } from '../../context/elements';
import { ActionSelectControl } from './ActionSelect';
import { DividerControl } from './Divider';
import { NavigateControl } from './Navigate';
import { MessageControl } from './Message';
import { PaginateControl } from './Paginate';
import { RefreshControl } from './Refresh';
import { SearchControl } from './Search';
import { SummaryControl } from './Summary';
import { TableControl } from './Table';
import { TitleControl } from './Title';

export interface Controls<T extends StorageBrowserElements> {
  (): React.JSX.Element;
  ActionSelect: ActionSelectControl<T>;
  Divider: DividerControl<T>;
  Message: MessageControl<T>;
  Refresh: RefreshControl<T>;
  Search: SearchControl<T>;
  Navigate: NavigateControl<T>;
  Paginate: PaginateControl<T>;
  Summary: SummaryControl<T>;
  Table: TableControl<T>;
  Title: TitleControl<T>;
}
