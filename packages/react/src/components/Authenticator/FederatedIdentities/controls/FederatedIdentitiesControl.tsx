import React, { forwardRef, ForwardRefExoticComponent } from 'react';
import { IdentityControl } from './IdentityControl';
import {
  CreateFederatedIdentitiesInput,
  RenderButton,
  CreateProviderInput,
  UseHandleSignInWithRedirectOutput,
} from './types';
import {
  FederatedIdentitiesElements,
  useHandleSignInWithRedirect,
} from '../context';
import createProvider from './createProvider';
import { toProviderData } from './utils';

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

export function createFederatedIdentities<
  T extends Partial<FederatedIdentitiesElements>,
  K extends string = string,
>({
  providers,
  ...input
}: CreateFederatedIdentitiesInput<T, K>): {
  FederatedIdentities: FederatedIdentities;
  useHandleSignInWithRedirect: () => UseHandleSignInWithRedirectOutput;
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

  return {
    //@ts-ignore
    FederatedIdentities: IdentitiesControl,
    useHandleSignInWithRedirect: useHandleSignInWithRedirect,
  };
}
