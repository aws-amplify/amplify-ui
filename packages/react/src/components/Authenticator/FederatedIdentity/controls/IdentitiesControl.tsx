import { IdentityControl } from './IdentityControl';
import { ProviderData } from '../types';

export interface IdentitiesControl<T extends string = string> {
  (props: ChildrenProps | RenderIdentityProps): JSX.Element;
  Identity: IdentityControl<T>;
}

interface ChildrenProps {
  children?: React.ReactNode;
  renderIdentity?: never;
}

interface RenderIdentityProps {
  children?: never;
  renderIdentity?: { (providerData: ProviderData): JSX.Element };
}
