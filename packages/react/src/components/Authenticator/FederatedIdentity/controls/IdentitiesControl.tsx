import { IdentityControl } from './IdentityControl';
import { ProviderData } from '../types';

export interface IdentitiesControl<T extends string = string> {
  (props: ChildrenProps | RenderItemProps): JSX.Element;
  Identity: IdentityControl<T>;
}

interface ChildrenProps {
  children?: React.ReactNode;
  renderItem?: never;
}

interface RenderItemProps {
  children?: never;
  renderItem?: { (providerData: ProviderData): JSX.Element };
}
