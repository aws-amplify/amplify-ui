import { IdentityControl } from './IdentityControl';
import {
  CreateFederatedIdentitiesInput,
  RenderButton,
  UseHandleSignInWithRedirect,
} from './types';
import { ForwardRefExoticComponent } from 'react';
import { FederatedIdentitiesElements } from '../context/elements';

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

export function createFederatedIdentities<
  T extends Partial<FederatedIdentitiesElements>,
  K extends string = string,
>(
  input: CreateFederatedIdentitiesInput<T, K>
): {
  FederatedIdentities: FederatedIdentities;
  useHandleSignInWithRedirect?: UseHandleSignInWithRedirect<K>;
};
