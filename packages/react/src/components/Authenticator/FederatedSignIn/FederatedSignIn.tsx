import { get, includes } from 'lodash';

import { I18n } from 'aws-amplify';
import { FederatedIdentityProviders } from '@aws-amplify/ui';

import { useAmplify, useAuth } from '../../../hooks';
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
      text={I18n.get('Sign In with Facebook')}
      provider={FederatedIdentityProviders.Facebook}
    />
  ) : null;
  const googleButton = includes(loginMechanisms, 'google') ? (
    <FederatedSignInButton
      text={I18n.get('Sign In with Google')}
      provider={FederatedIdentityProviders.Google}
    />
  ) : null;
  const amazonButton = includes(loginMechanisms, 'amazon') ? (
    <FederatedSignInButton
      text={I18n.get('Sign In with Amazon')}
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
