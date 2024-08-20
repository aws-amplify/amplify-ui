import { FederatedProvider } from '@aws-amplify/ui';
import { FederatedIdentitiesElements } from '../context';
import { DataState } from '@aws-amplify/ui-react-core';
import { signInWithRedirect, SignInWithRedirectInput } from 'aws-amplify/auth';
import React from 'react';

export type UseHandleSignInWithRedirectOutput = [
  state: DataState<void | undefined>,
  handleAction: SignInWithRedirectAction,
];

export type SignInWithRedirectAction = (
  ...input: SignInWithRedirectInput[]
) => void;

export interface SignInWithRedirectProviderInput {
  handleSignInWithRedirect?: typeof signInWithRedirect;
  children: React.ReactNode;
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
  handleSignInWithRedirect?: SignInWithRedirectAction;
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
