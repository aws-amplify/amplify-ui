import { IdentityControl } from './IdentityControl';
import { RenderButton } from '../types';
import { ForwardRefExoticComponent } from 'react';

interface ChildrenProps {
  children?: React.ReactNode;
  RenderButton?: never;
}

interface RenderButtonProps<T extends string = string> {
  children?: never;
  renderButton: RenderButton<T>;
}

type FederatedIdentitiesProps<T extends string = string> = (
  | ChildrenProps
  | RenderButtonProps<T>
) &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface FederatedIdentities<T extends string = string>
  extends ForwardRefExoticComponent<FederatedIdentitiesProps<T>> {
  Identity: IdentityControl<T>;
}
