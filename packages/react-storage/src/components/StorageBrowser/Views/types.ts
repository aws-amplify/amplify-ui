import { StorageBrowserElements } from '../context/elements';
import { Controls } from './Controls';

export type CommonControl = 'Message' | 'Navigate' | 'Title' | 'Divider';

export interface ViewComponent<T extends StorageBrowserElements, C> {
  (): React.JSX.Element;
  Controls: C;
  Table: Controls<T>['Table'];
}
