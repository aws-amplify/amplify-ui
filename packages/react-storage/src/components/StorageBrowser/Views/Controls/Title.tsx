import { StorageBrowserElements } from '../../context/elements';

export interface TitleControl<T extends StorageBrowserElements> {
  (): React.JSX.Element;
  Heading: T['Heading'];
}
