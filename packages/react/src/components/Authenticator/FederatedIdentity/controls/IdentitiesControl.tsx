import { IdentityControl } from './IdentityControl';
import { FederatedIdentityElements } from '../context/elements';
import { ProviderData } from '../types';

export interface IdentitiesControl<
  T extends Partial<FederatedIdentityElements>,
> {
  (props: {
    renderListItem?: { (data: ProviderData): React.JSX.Element };
  }): JSX.Element;
  Identity: IdentityControl<T>;
  List: T['List'];
}
