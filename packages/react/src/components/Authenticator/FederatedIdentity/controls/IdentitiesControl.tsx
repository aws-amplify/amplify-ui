import { FederatedIdentityElements } from '../context/elements';
import { ProviderData } from '../types';
import { IdentityControl } from './IdentityControl';

export interface IdentitiesControl<
  T extends Partial<FederatedIdentityElements>,
  // Button, Icon are ControlElemnts
> {
  (props: {
    renderListItem?: { (data: ProviderData): React.JSX.Element };
  }): JSX.Element;
  Identity: IdentityControl<T>;
  List: T['List'];
}
