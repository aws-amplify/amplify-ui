import { FederatedIdentityProviders, translate } from '@aws-amplify/ui';
import { get, includes } from 'lodash';

import { useAuthenticator } from '..';
import { Divider, Flex } from '../../..';
import { FederatedSignInButton } from './FederatedSignInButtons';

export function FederatedSignIn() {
  const { _state } = useAuthenticator();
  const { socialProviders = [] } = _state.context.config;

  if (socialProviders.length === 0) {
    return null;
  }

  return (
    <Flex direction="column" className="federated-sign-in-container">
      <Divider size="small" />

      {socialProviders.map((provider) => {
        switch (provider) {
          case 'amazon':
            return (
              <FederatedSignInButton
                icon="amazon"
                key={provider}
                provider={FederatedIdentityProviders.Amazon}
                text={translate('Sign In with Amazon')}
              />
            );
          case 'apple':
            return (
              <FederatedSignInButton
                icon="apple"
                key={provider}
                provider={FederatedIdentityProviders.Apple}
                text={translate('Sign In with Apple')}
              />
            );
          case 'facebook':
            return (
              <FederatedSignInButton
                icon="facebook"
                key={provider}
                provider={FederatedIdentityProviders.Facebook}
                text={translate('Sign In with Facebook')}
              />
            );
          case 'google':
            return (
              <FederatedSignInButton
                icon="google"
                key={provider}
                provider={FederatedIdentityProviders.Google}
                text={translate('Sign In with Google')}
              />
            );
          default:
            console.error(
              `Authenicator does not support ${provider}. Please open an issue: https://github.com/aws-amplify/amplify-ui/issues/choose`
            );
        }
      })}
    </Flex>
  );
}
