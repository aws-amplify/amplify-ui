import { get, includes } from 'lodash';

import { useAmplify, useAuth } from '../../../hooks';
import { FederatedIdentityProviders } from '@aws-amplify/ui-core';

import { FederatedSignInButton } from './FederatedSignInButtons';

export const FederatedSignIn = (): JSX.Element => {
  const [{ context }] = useAuth();
  const loginMechanisms = get(context, 'config.login_mechanisms');

  const amplifyNamespace = 'Authenticator.FederatedSignIn';
  const {
    components: { Flex },
  } = useAmplify(amplifyNamespace);

  const facebookButton = includes(loginMechanisms, 'facebook') ? (
    <FederatedSignInButton
      text="Sign in with Facebook"
      provider={FederatedIdentityProviders.Facebook}
    />
  ) : null;
  const googleButton = includes(loginMechanisms, 'google') ? (
    <FederatedSignInButton
      text="Sign in with Google"
      provider={FederatedIdentityProviders.Google}
    />
  ) : null;
  const amazonButton = includes(loginMechanisms, 'amazon') ? (
    <FederatedSignInButton
      text="Sign in with Amazon"
      provider={FederatedIdentityProviders.Amazon}
    />
  ) : null;

  const shouldShowFederatedSignIn =
    facebookButton || googleButton || amazonButton;

  const component = shouldShowFederatedSignIn ? (
    <Flex direction="column">
      {googleButton}
      {facebookButton}
      {amazonButton}
    </Flex>
  ) : null;

  return component;
};
