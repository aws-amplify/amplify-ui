import React from 'react';
import { forwardRef } from 'react';
import { IdentityControl } from './IdentityControl';
import {
  CreateFederatedIdentitiesInput,
  RenderButton,
  UseHandleSignInWithRedirect,
  ProviderType,
  ProviderData,
  DefaultFederatedProviderList,
  CreateProviderInput,
} from './types';
import { ForwardRefExoticComponent } from 'react';
import { FederatedIdentitiesElements } from '../context/elements';
import createProvider from './createProvider';
import { FederatedProvider } from '@aws-amplify/ui';
import { capitalize } from '@aws-amplify/ui';

interface ChildrenProps {
  children?: React.ReactNode;
  renderButton?: never;
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

function getSupportedProviderData<T extends string = string>(
  providerName: T
): ProviderData<T> {
  return {
    displayName: capitalize<T>(providerName),
    icon: providerName,
    providerName: providerName,
  };
}

function validateProviderTypes(providers: ProviderType[]): void {
  const providerNames = new Set<string>();

  providers.forEach((provider) => {
    const providerName =
      typeof provider === 'string' ? provider : provider.providerName;

    if (providerNames.has(providerName)) {
      throw new Error(`Duplicate provider name found: ${providerName}`);
    }

    providerNames.add(providerName);
  });
}

export function toProviderData<T extends string = string>(
  providers: ProviderType<T>[]
): ProviderData<T>[] {
  validateProviderTypes(providers);
  return providers.map((provider) => {
    if (DefaultFederatedProviderList.includes(provider as FederatedProvider)) {
      return getSupportedProviderData<T>(provider as T);
    } else {
      return provider as ProviderData<T>;
    }
  });
}

export function createFederatedIdentities<
  T extends Partial<FederatedIdentitiesElements>,
  K extends string = string,
>({
  providers,
  ...input
}: CreateFederatedIdentitiesInput<T, K>): {
  FederatedIdentities: FederatedIdentities;
  useHandleSignInWithRedirect?: UseHandleSignInWithRedirect;
} {
  const providerDataList = toProviderData<K>(providers);
  const createProviderInput: CreateProviderInput<T, K> = {
    providers: providerDataList,
    ...input,
  };

  const Provider = createProvider(createProviderInput);

  const forwardedRef = forwardRef<HTMLDivElement, FederatedIdentitiesProps>(
    function Identities(
      { children: _children, renderButton: _renderButton },
      _ref
    ) {
      return <Provider>{/* TODO: allocate group control element */}</Provider>;
    }
  );

  //TODO: expand IdentitiesControl
  const IdentitiesControl = {
    ...forwardedRef,
  };

  //@ts-ignore
  return { FederatedIdentities: IdentitiesControl };
}
