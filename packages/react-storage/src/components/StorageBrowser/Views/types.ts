import { StorageBrowserElements } from '../context/elements';
import { Controls } from './Controls';

export type CommonControl = 'Message' | 'Navigate' | 'Title';

interface ListLocationsViewControls<T extends StorageBrowserElements>
  extends Pick<Controls<T>, CommonControl | 'Paginate' | 'Refresh'> {
  (): React.JSX.Element;
  Search: Omit<Controls<T>['Search'], 'Toggle'>;
}

interface LocationDetailViewControls<T extends StorageBrowserElements>
  extends Pick<
    Controls<T>,
    CommonControl | 'ActionSelect' | 'Paginate' | 'Refresh' | 'Search'
  > {
  (): React.JSX.Element;
}

interface ActionViewControls<T extends StorageBrowserElements>
  extends Pick<Controls<T>, CommonControl | 'Summary'> {
  (): React.JSX.Element;
}

interface ViewComponent<T extends StorageBrowserElements, C> {
  (): React.JSX.Element;
  Controls: C;
  Table: Controls<T>['Table'];
}

export interface LocationsListView<T extends StorageBrowserElements>
  extends ViewComponent<T, ListLocationsViewControls<T>> {}

export interface LocationDetailView<T extends StorageBrowserElements>
  extends ViewComponent<T, LocationDetailViewControls<T>> {}

export interface ActionView<T extends StorageBrowserElements>
  extends ViewComponent<T, ActionViewControls<T>> {
  (): React.JSX.Element;
}
