import { FederatedIdentityElements } from '../context/elements';

export interface IdentityControl<
  T extends Partial<FederatedIdentityElements> = FederatedIdentityElements,
  K extends string = string,
> {
  (props: { providerName?: K; children?: React.ReactNode }): JSX.Element;
  Button: T['Button'];
  Icon: T['Icon'];
}
