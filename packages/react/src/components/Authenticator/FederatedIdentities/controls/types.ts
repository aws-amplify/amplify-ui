import { FederatedProvider } from '@aws-amplify/ui';
import { FederatedIdentitiesElements } from '../context/elements';
import React from 'react';
import { DataState } from '@aws-amplify/ui-react-core/dist/types/hooks';

interface HandleSignInWithRedirectInput<T extends string = string> {
  providerName: T;
  customState?: string;
}

interface HandleSignInWithRedirect {
  (input: HandleSignInWithRedirectInput): Promise<void>;
}

export interface UseHandleSignInWithRedirect<K extends string = string> {
  (): [
    state: DataState<void | undefined>,
    handleAction: (...input: HandleSignInWithRedirectInput<K>[]) => void,
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
  elements?: T;
  providers: ProviderType<K>[];
  handleSignInWithRedirect?: HandleSignInWithRedirect;
}

export interface ProviderData<T extends string = string> {
  displayName: string;
  icon?: FederatedProvider | React.ReactNode;
  providerName: T;
}

export type ProviderType<K extends string = string> =
  | ProviderData<K>
  | FederatedProvider;
