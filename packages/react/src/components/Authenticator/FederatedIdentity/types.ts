import { FederatedIdentityElements } from './context/elements';
import React from 'react';
import { IdentitiesControl } from './controls/IdentitiesControl';

export type socialProvidersUnion = 'amazon' | 'apple' | 'facebook' | 'google';
export type AuthProvider = 'Amazon' | 'Apple' | 'Facebook' | 'Google';

export const socialProviderList = ['amazon', 'facebook', 'apple', 'google'];

interface handleSignInWithRedirectInput<T extends string = string> {
  provider: T;
  customState?: string;
}

interface handleSignInWithRedirect {
  (input: handleSignInWithRedirectInput): Promise<void>;
}

interface useHandleSigninWithRedirectInput<K extends string = string> {
  provider: K;
  customState?: string;
}

interface ActionState<T> {
  data: T;
  isLoading: boolean;
  message: string | undefined;
}

export interface useHandleSignInWithRedirect<K extends string = string> {
  (): [
    state: ActionState<void | undefined>,
    handleAction: (...input: useHandleSigninWithRedirectInput<K>[]) => void,
  ];
}

export interface FederatedIdentityInput<
  T extends Partial<FederatedIdentityElements>,
  K extends string = string,
> {
  elements?: T;
  providers: ProviderType<K>[];
  handleSignInWithRedirect?: handleSignInWithRedirect;
}

export interface FederatedIdentity<
  T extends Partial<FederatedIdentityElements>,
> {
  (): JSX.Element;
  Provider: (props: { children?: React.ReactNode }) => React.JSX.Element;
  Identities: IdentitiesControl<T>;
}

export interface ProviderData<T extends string = string> {
  displayName: string;
  icon: React.ReactNode;
  providerName: T;
}

export type ProviderType<K extends string = string> =
  | ProviderData<K>
  | socialProvidersUnion;

export interface createProviderProps<
  T extends
    Partial<FederatedIdentityElements> = Partial<FederatedIdentityElements>,
  K extends string = string,
> {
  providers: ProviderType<K>[];
  handleSignInWithRedirect?: handleSignInWithRedirect;
  elements?: T;
}
