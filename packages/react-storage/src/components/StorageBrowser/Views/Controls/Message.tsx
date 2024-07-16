import { StorageBrowserElements } from '../../context/elements';

export interface MessageControl<T extends StorageBrowserElements>
  extends Pick<T, 'Icon' | 'Text' | 'Button'> {
  (props: {}): React.JSX.Element;
}
