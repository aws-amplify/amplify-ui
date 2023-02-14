import React from 'react';
import {
  authenticatorTextUtil,
  FederatedIdentityProviders,
} from '@aws-amplify/ui';

import { Divider } from '../../../primitives/Divider';
import { Flex } from '../../../primitives/Flex';
import { useAuthenticator } from '@aws-amplify/ui-react-core';
import { FederatedSignInButton } from './FederatedSignInButtons';

const { getSignInWithFederationText, getOrText } = authenticatorTextUtil;

export function FederatedSignIn(): JSX.Element {
  const { route, socialProviders } = useAuthenticator(
    ({ route, socialProviders }) => [route, socialProviders]
  );

  if (socialProviders.length === 0) {
    return null;
  }

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
                text={getSignInWithFederationText(route, provider)}
              />
            );
          case 'apple':
            return (
              <FederatedSignInButton
                icon="apple"
                key={provider}
                provider={FederatedIdentityProviders.Apple}
                text={getSignInWithFederationText(route, provider)}
              />
            );
          case 'facebook':
            return (
              <FederatedSignInButton
                icon="facebook"
                key={provider}
                provider={FederatedIdentityProviders.Facebook}
                text={getSignInWithFederationText(route, provider)}
              />
            );
          case 'google':
            return (
              <FederatedSignInButton
                icon="google"
                key={provider}
                provider={FederatedIdentityProviders.Google}
                text={getSignInWithFederationText(route, provider)}
              />
            );
          default:
            // eslint-disable-next-line no-console
            console.error(
              `Authenticator does not support ${provider}. Please open an issue: https://github.com/aws-amplify/amplify-ui/issues/choose`
            );
        }
      })}

      <Divider size="small" label={getOrText()} />
    </Flex>
  );
}
