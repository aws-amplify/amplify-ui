import { StorageBrowserElements } from '../../context/elements';

interface Details<T extends StorageBrowserElements> {
  (): React.JSX.Element;
  Container: T['Span'];
  Destination: T['Text'];
  Completed: T['Text'];
  Failed: T['Text'];
  Canceled: T['Text'];
  NotStarted: T['Text'];
}

export interface SummaryControl<T extends StorageBrowserElements> {
  (): React.JSX.Element;
  Start: T['Button'];
  Cancel: T['Button'];
  Details: Details<T>;
}
