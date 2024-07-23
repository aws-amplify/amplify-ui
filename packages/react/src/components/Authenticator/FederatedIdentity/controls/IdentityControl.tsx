import { FederatedIdentityElements } from '../context/elements';

export interface IdentityControl<
  T extends Partial<FederatedIdentityElements> = FederatedIdentityElements,
  K extends string = string,
> {
  (props: { provider?: K; children?: React.ReactNode }): JSX.Element;
  ListItem: T['ListItem'];
  Button: T['Button'];
  Icon: T['Icon'];
  Provider: (props: {
    value?: K;
    children?: React.ReactNode;
  }) => React.JSX.Element;
}
