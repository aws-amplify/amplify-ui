import { get, includes } from 'lodash';

import { I18n } from '@aws-amplify/core';
import { FederatedIdentityProviders } from '@aws-amplify/ui-core';

import { useAmplify, useAuth } from '../../../hooks';
import { FederatedSignInButton } from './FederatedSignInButtons';

export const FederatedSignIn = (): JSX.Element => {
  const [{ context }] = useAuth();
  const loginMechanisms = get(context, 'config.login_mechanisms');

  const translations = {
    facebook: I18n.get('Sign In with Facebook'),
    google: I18n.get('Sign In with Google'),
    amazon: I18n.get('Sign In with Amazon'),
  };

  const amplifyNamespace = 'Authenticator.FederatedSignIn';
  const {
    components: { Flex },
  } = useAmplify(amplifyNamespace);

  const facebookButton = includes(loginMechanisms, 'facebook') ? (
    <FederatedSignInButton
      text={translations.facebook}
      provider={FederatedIdentityProviders.Facebook}
    />
  ) : null;
  const googleButton = includes(loginMechanisms, 'google') ? (
    <FederatedSignInButton
      text={translations.google}
      provider={FederatedIdentityProviders.Google}
    />
  ) : null;
  const amazonButton = includes(loginMechanisms, 'amazon') ? (
    <FederatedSignInButton
      text={translations.amazon}
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
