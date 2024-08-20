import {
  ProviderData,
  ProviderType,
  DefaultFederatedProviderList,
  SignInWithRedirectAction,
  AuthProvider,
} from './types';
import { capitalize, FederatedProvider } from '@aws-amplify/ui';

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

export const handleClick = <T extends string = string>(
  providerName: T,
  handleSignInWithRedirect: SignInWithRedirectAction
): ((event: React.MouseEvent<HTMLButtonElement>) => void) => {
  const _handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    if (
      DefaultFederatedProviderList.includes(providerName as FederatedProvider)
    ) {
      handleSignInWithRedirect({
        provider: capitalize(providerName) as AuthProvider,
      });
    } else {
      handleSignInWithRedirect({ provider: { custom: providerName } });
    }
  };

  return _handleClick;
};
