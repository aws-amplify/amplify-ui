import { StorageBrowserElements } from '../../context/elements';

export interface TableControl<T extends StorageBrowserElements>
  extends Pick<
    T,
    | 'Table'
    | 'TableBody'
    | 'TableData'
    | 'TableHead'
    | 'TableHeader'
    | 'TableRow'
  > {
  (): React.JSX.Element;
}
