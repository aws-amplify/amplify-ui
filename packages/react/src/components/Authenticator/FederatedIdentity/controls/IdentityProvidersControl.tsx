import { ProviderControl } from './ProviderControl';
import { ProviderData } from '../types';

export interface IdentityProvidersControl<T extends string = string> {
  (props: ChildrenProps | RenderProviderProps): JSX.Element;
  Identity: ProviderControl<T>;
}

interface ChildrenProps {
  children?: React.ReactNode;
  renderProvider?: never;
}

interface RenderProviderProps {
  children?: never;
  renderProvider?: { (providerData: ProviderData): JSX.Element };
}
