import React from 'react';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import { Button } from '../../../primitives/Button';
import { Flex } from '../../../primitives/Flex';
import { View } from '../../../primitives/View';
import { VisuallyHidden } from '../../../primitives/VisuallyHidden';
import { FederatedSignIn } from '../FederatedSignIn';
import { useAuthenticator } from '@aws-amplify/ui-react-core';
import { useCustomComponents } from '../hooks/useCustomComponents';
import { useFormHandlers } from '../hooks/useFormHandlers';
import { RemoteErrorMessage } from '../shared/RemoteErrorMessage';
import { FormFields } from '../shared/FormFields';

const { getSignInText, getSigningInText, getForgotPasswordText } =
  authenticatorTextUtil;

export function SignIn(): JSX.Element {
  const { isPending } = useAuthenticator((context) => [context.isPending]);
  const { handleChange, handleSubmit } = useFormHandlers();

  const {
    components: {
      // @ts-ignore
      SignIn: { Header = SignIn.Header, Footer = SignIn.Footer },
    },
  } = useCustomComponents();

  return (
    <View>
      <Header />

      <form
        data-amplify-form=""
        data-amplify-authenticator-signin=""
        method="post"
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <FederatedSignIn />
        <Flex direction="column">
          <Flex as="fieldset" direction="column" isDisabled={isPending}>
            <VisuallyHidden>
              <legend>{getSignInText()}</legend>
            </VisuallyHidden>
            <FormFields />
          </Flex>

          <RemoteErrorMessage />

          <Button
            isDisabled={isPending}
            type="submit"
            variation="primary"
            isLoading={isPending}
            loadingText={getSigningInText()}
          >
            {getSignInText()}
          </Button>
          <Footer />
        </Flex>
      </form>
    </View>
  );
}

const DefaultFooter = () => {
  const { toForgotPassword } = useAuthenticator((context) => [
    context.toForgotPassword,
  ]);

  return (
    <View data-amplify-footer="">
      <Button onClick={toForgotPassword} size="small" variation="link">
        {getForgotPasswordText()}
      </Button>
    </View>
  );
};

SignIn.Footer = DefaultFooter;
SignIn.Header = function Header(): JSX.Element {
  // @ts-ignore
  return null;
};
