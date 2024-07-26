import { IdentityControl } from './IdentityControl';
import { ProviderData } from '../types';

export interface IdentitiesControl<T extends string = string> {
  (props: {
    renderListItem?: { (data: ProviderData): React.JSX.Element };
    children?: React.ReactNode;
  }): JSX.Element;
  Identity: IdentityControl<T>;
}
