import { FederatedProvider } from '@aws-amplify/ui';
import { FederatedIdentitiesElements } from './context/elements';
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

export interface RenderButton<T extends string = string> {
  (data: ProviderData<T>): React.JSX.Element;
}

export interface CreateFederatedIdentitiesInput<
  T extends Partial<FederatedIdentitiesElements> = FederatedIdentitiesElements,
  K extends string = string,
> {
  elements?: T;
  providers: ProviderType<K>[];
  handleSignInWithRedirect?: HandleSignInWithRedirect;
}

export interface ProviderData<T extends string = string> {
  displayName: string;
  icon: React.ReactNode;
  providerName: T;
}

export type ProviderType<K extends string = string> =
  | ProviderData<K>
  | FederatedProvider;
