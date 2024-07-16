import React from 'react';
import { StorageBrowserElements } from '../../context/elements';

interface PaginateItem<T extends StorageBrowserElements>
  extends Pick<T, 'ListItem' | 'Button'> {
  (): React.JSX.Element;
}

export interface PaginateControl<T extends StorageBrowserElements> {
  (): React.JSX.Element;
  List: T['OrderedList'];
  Current: PaginateItem<T>;
  Next: PaginateItem<T>;
  Previous: PaginateItem<T>;
}
