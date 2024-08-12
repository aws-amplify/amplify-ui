import { FederatedProvider } from '@aws-amplify/ui';
import { FederatedIdentitiesElements } from '../context/elements';
import React from 'react';
import { DataState } from '@aws-amplify/ui-react-core/dist/types/hooks';
import { signInWithRedirect, SignInWithRedirectInput } from 'aws-amplify/auth';

export interface UseHandleSignInWithRedirect {
  (): [
    state: DataState<void | undefined>,
    handleAction: (...input: SignInWithRedirectInput[]) => void,
  ];
}

export const DefaultFederatedProviderList: FederatedProvider[] = [
  'amazon',
  'facebook',
  'apple',
  'google',
];

export interface RenderButton<T extends string = string> {
  (data: ProviderData<T>): React.JSX.Element;
}

export interface CreateFederatedIdentitiesInput<
  T extends Partial<FederatedIdentitiesElements> = FederatedIdentitiesElements,
  K extends string = string,
> {
  providers: ProviderType<K>[];
  elements?: T;
  handleSignInWithRedirect?: typeof signInWithRedirect;
  displayText?: (displayName: string) => string;
}

export interface CreateProviderInput<
  T extends Partial<FederatedIdentitiesElements>,
  K extends string = string,
> {
  providers: ProviderData<K>[];
  elements?: T;
  handleSignInWithRedirect?: typeof signInWithRedirect;
  displayText?: (displayName: string) => string;
}

export interface ProviderData<T extends string = string> {
  displayName: string;
  icon?: FederatedProvider | React.ReactNode;
  providerName: T;
}

export type ProviderType<K extends string = string> =
  | ProviderData<K>
  | FederatedProvider;
