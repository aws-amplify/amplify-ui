import { FederatedIdentityProviders, translate } from '@aws-amplify/ui';
import { get, includes } from 'lodash';

import { useAuthenticator } from '..';
import { Divider, Flex } from '../../..';
import { FederatedSignInButton } from './FederatedSignInButtons';

export const FederatedSignIn = (): JSX.Element => {
  const { _state } = useAuthenticator();
  const loginMechanisms = get(_state, 'context.config.login_mechanisms');

  const facebookButton = includes(loginMechanisms, 'facebook') ? (
    <FederatedSignInButton
      icon="facebook"
      text={translate('Sign In with Facebook')}
      provider={FederatedIdentityProviders.Facebook}
    />
  ) : null;
  const googleButton = includes(loginMechanisms, 'google') ? (
    <FederatedSignInButton
      icon="google"
      text={translate('Sign In with Google')}
      provider={FederatedIdentityProviders.Google}
    />
  ) : null;
  const amazonButton = includes(loginMechanisms, 'amazon') ? (
    <FederatedSignInButton
      icon="amazon"
      text={translate('Sign In with Amazon')}
      provider={FederatedIdentityProviders.Amazon}
    />
  ) : null;

  const shouldShowFederatedSignIn =
    facebookButton || googleButton || amazonButton;

  const component = shouldShowFederatedSignIn ? (
    <Flex direction="column" className="federated-sign-in-container">
      <Divider size="small" />

      {googleButton}
      {facebookButton}
      {amazonButton}
    </Flex>
  ) : null;

  return component;
};
