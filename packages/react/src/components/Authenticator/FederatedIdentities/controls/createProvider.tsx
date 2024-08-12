import React from 'react';
import { FederatedIdentitiesElements } from '../context/elements';
import { CreateProviderInput } from './types';
import { ElementsProvider } from '@aws-amplify/ui-react-core/elements';
import {
  ProviderDataListProvider,
  HandleSignInWithRedirectProvider,
  DisplayTextProvider,
} from '../context';

export default function createProvider<
  T extends Partial<FederatedIdentitiesElements>,
>({
  elements,
  providers,
  handleSignInWithRedirect,
  displayText,
}: CreateProviderInput<T>) {
  return function Provider({
    children,
  }: {
    children?: React.ReactNode;
  }): React.JSX.Element {
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
