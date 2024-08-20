import React from 'react';
import { CreateProviderInput } from './types';
import { ElementsProvider } from '@aws-amplify/ui-react-core/elements';
import {
  ProviderDataListProvider,
  RedirectFunctionProvider,
  DisplayTextProvider,
  FederatedIdentitiesElements,
  RedirectHookContext,
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
    const redirectHook = React.useContext(RedirectHookContext);

    if (redirectHook != null) {
      handleSignInWithRedirect = redirectHook[1];
    }

    return (
      <ElementsProvider elements={elements}>
        <ProviderDataListProvider providerDataList={providers}>
          <RedirectFunctionProvider customRedirect={handleSignInWithRedirect}>
            <DisplayTextProvider customDisplayText={displayText}>
              {children}
            </DisplayTextProvider>
          </RedirectFunctionProvider>
        </ProviderDataListProvider>
      </ElementsProvider>
    );
  };
}
