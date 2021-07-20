import { useAmplify, useAuth } from '@aws-amplify/ui-react';

import { FederatedIdentityProviders } from '../../types';

export interface FederatedSignInButtonProps {
  provider: FederatedIdentityProviders;
  text: string;
}

export const FederatedSignInButton = (
  props: FederatedSignInButtonProps
): JSX.Element => {
  const { provider, text } = props;
  const [state, send] = useAuth();

  const amplifyNamespace = `Authenticator.FederatedSignIn.${provider}`;
  const {
    components: { Button },
  } = useAmplify(amplifyNamespace);

  const handleClick = (event): void => {
    event.preventDefault();

    send({
      type: 'FEDERATED_SIGN_IN',
      data: {
        provider,
      },
    });
  };

  return <Button onClick={handleClick}>{text}</Button>;
};
