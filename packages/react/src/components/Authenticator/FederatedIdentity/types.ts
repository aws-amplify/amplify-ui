import { FederatedProvider } from '@aws-amplify/ui';

import { FederatedIdentityElements } from './context/elements';
import { IdentitiesControl } from './controls';

import React from 'react';

interface HandleSignInWithRedirectInput<T extends string = string> {
  providerName: T;
  customState?: string;
}

interface HandleSignInWithRedirect {
  (input: HandleSignInWithRedirectInput): Promise<void>;
}

interface UseHandleSigninWithRedirectInput<K extends string = string> {
  providerName: K;
  customState?: string;
}

interface ActionState<T> {
  data: T;
  isLoading: boolean;
  message: string | undefined;
}

export interface UseHandleSignInWithRedirect<K extends string = string> {
  (): [
    state: ActionState<void | undefined>,
    handleAction: (...input: UseHandleSigninWithRedirectInput<K>[]) => void,
  ];
}

export interface CreateFederatedIdentityInput<
  T extends Partial<FederatedIdentityElements> = FederatedIdentityElements,
  K extends string = string,
> {
  elements?: T;
  providers: ProviderType<K>[];
  handleSignInWithRedirect?: HandleSignInWithRedirect;
}

export interface FederatedIdentity<
  T extends Partial<FederatedIdentityElements> = FederatedIdentityElements,
> {
  (props: { children?: React.ReactNode }): JSX.Element;
  Identities: IdentitiesControl<T>;
}

export interface ProviderData<T extends string = string> {
  displayName: string;
  icon: React.ReactNode;
  providerName: T;
}

export type ProviderType<K extends string = string> =
  | ProviderData<K>
  | FederatedProvider;
