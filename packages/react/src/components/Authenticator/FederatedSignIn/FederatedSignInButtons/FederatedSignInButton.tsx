import { useAmplify, useAuth } from '../../../../hooks';
import { FederatedIdentityProviders } from '@aws-amplify/ui';

import { IconFacebook } from '../../../../primitives';

export interface FederatedSignInButtonProps {
  icon?: 'facebook' | 'google' | 'amazon';
  provider: FederatedIdentityProviders;
  text: string;
}

export const FederatedSignInButton = (
  props: FederatedSignInButtonProps
): JSX.Element => {
  const { icon, provider, text } = props;
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

  // TODO - get Google and Amazon icons
  let iconComponent;
  if (icon === 'facebook') {
    iconComponent = <IconFacebook />;
  }

  return (
    <Button
      onClick={handleClick}
      className="federated-sign-in-button"
      fontWeight="normal"
    >
      {iconComponent}
      {text}
    </Button>
  );
};
