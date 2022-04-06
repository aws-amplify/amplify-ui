import { FederatedIdentityProviders, translate } from '@aws-amplify/ui';

import { useAuthenticator } from '..';
import { Divider, Flex } from '../../..';
import { FederatedSignInButton } from './FederatedSignInButtons';

export function FederatedSignIn() {
  // TODO: expose `socialProviders`
  const { _state, route } = useAuthenticator((context) => [context.route]);
  const { socialProviders = [] } = _state.context.config;

  if (socialProviders.length === 0) {
    return null;
  }

  const federatedText = route === 'signUp' ? 'Up' : 'In';

  return (
    <Flex
      direction="column"
      padding={`0 0 1rem 0`}
      className="federated-sign-in-container"
    >
      {socialProviders.map((provider) => {
        switch (provider) {
          case 'amazon':
            return (
              <FederatedSignInButton
                icon="amazon"
                key={provider}
                provider={FederatedIdentityProviders.Amazon}
                text={translate<string>(`Sign ${federatedText} with Amazon`)}
              />
            );
          case 'apple':
            return (
              <FederatedSignInButton
                icon="apple"
                key={provider}
                provider={FederatedIdentityProviders.Apple}
                text={translate<string>(`Sign ${federatedText} with Apple`)}
              />
            );
          case 'facebook':
            return (
              <FederatedSignInButton
                icon="facebook"
                key={provider}
                provider={FederatedIdentityProviders.Facebook}
                text={translate<string>(`Sign ${federatedText} with Facebook`)}
              />
            );
          case 'google':
            return (
              <FederatedSignInButton
                icon="google"
                key={provider}
                provider={FederatedIdentityProviders.Google}
                text={translate<string>(`Sign ${federatedText} with Google`)}
              />
            );
          default:
            console.error(
              `Authenicator does not support ${provider}. Please open an issue: https://github.com/aws-amplify/amplify-ui/issues/choose`
            );
        }
      })}

      <Divider size="small" label="or" />
    </Flex>
  );
}
