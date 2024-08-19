import React from 'react';
import { CreateProviderInput } from './types';
import { ElementsProvider } from '@aws-amplify/ui-react-core/elements';
import {
  ProviderDataListProvider,
  HandleSignInWithRedirectProvider,
  DisplayTextProvider,
  FederatedIdentitiesElements,
  UseHandleSignInWithRedirectContext,
} from '../context';
import { signInWithRedirect } from 'aws-amplify/auth';

export default function createProvider<
  T extends Partial<FederatedIdentitiesElements>,
>({
  elements,
  providers,
  handleSignInWithRedirect = signInWithRedirect,
  displayText,
}: CreateProviderInput<T>) {
  return function Provider({
    children,
  }: {
    children?: React.ReactNode;
  }): React.JSX.Element {
    const context = React.useContext(UseHandleSignInWithRedirectContext);

    if (context != null) {
      handleSignInWithRedirect = context[1];
    }

    return (
      <ElementsProvider elements={elements}>
        <ProviderDataListProvider providerDataList={providers}>
          <HandleSignInWithRedirectProvider
            customRedirect={handleSignInWithRedirect}
          >
            <DisplayTextProvider customDisplayText={displayText}>
              {children}
            </DisplayTextProvider>
          </HandleSignInWithRedirectProvider>
        </ProviderDataListProvider>
      </ElementsProvider>
    );
  };
}
